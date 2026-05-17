import { useState, useRef, useEffect } from "react";
import { Project } from "../../content/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// mp4 / webm / mov → video 태그로 렌더링
const isVideo = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

// Vimeo URL 감지 → iframe 임베드
const isVimeo = (src: string) => /^https?:\/\/(www\.)?vimeo\.com\/\d+/i.test(src);
const getVimeoEmbedUrl = (src: string) => {
  const match = src.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=0` : src;
};

// 외부 URL인지 확인
const isExternalUrl = (src: string) => /^https?:\/\//i.test(src);

/* ── 같은 행 미디어들의 높이를 동일하게, 비율 유지, 크롭 없이 렌더링 ──
   이미지: naturalWidth/naturalHeight
   영상: videoWidth/videoHeight (loadedmetadata 이벤트)            */
function LayoutRow({ row, photoMap, projectName, gap }: {
  row: string[];
  photoMap: Record<string, string>;
  projectName: string;
  gap: number;
}) {
  const n = row.length;
  const [ratios, setRatios] = useState<number[] | null>(null);
  const imgRefs   = useRef<(HTMLImageElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function getAR(index: number, src: string): Promise<number> {
      if (isVimeo(src)) return 16 / 9;
      if (isVideo(src)) {
        const el = videoRefs.current[index];
        if (!el) return 16 / 9;
        if (el.videoWidth > 0) return el.videoWidth / el.videoHeight;
        return new Promise<number>((resolve) => {
          el.addEventListener("loadedmetadata", () =>
            resolve(el.videoHeight > 0 ? el.videoWidth / el.videoHeight : 16 / 9)
          , { once: true });
        });
      } else {
        const el = imgRefs.current[index];
        if (!el) return 1;
        if (el.complete && el.naturalWidth > 0) return el.naturalWidth / el.naturalHeight;
        return new Promise<number>((resolve) => {
          const done = () => resolve(el.naturalHeight > 0 ? el.naturalWidth / el.naturalHeight : 1);
          el.addEventListener("load",  done, { once: true });
          el.addEventListener("error", done, { once: true });
        });
      }
    }

    Promise.all(
      row.map((filename, i) => {
        const src = isExternalUrl(filename) ? filename : photoMap[filename];
        return src ? getAR(i, src) : Promise.resolve(1);
      })
    ).then((result) => { if (!cancelled) setRatios(result); });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalGapPx = gap * (n - 1);
  const totalRatio = ratios ? ratios.reduce((a, b) => a + b, 0) : n;

  return (
    <div style={{ display: "flex", gap: `${gap}px`, alignItems: "flex-start" }}>
      {row.map((filename, i) => {
        // 외부 URL(Vimeo 등)은 photoMap 조회 없이 직접 사용
        const src = isExternalUrl(filename) ? filename : photoMap[filename];
        if (!src) return null;
        const share = ratios ? ratios[i] / totalRatio : 1 / n;
        const style: React.CSSProperties = {
          width: `calc(${(share * 100).toFixed(6)}% - ${(totalGapPx * share).toFixed(6)}px)`,
          flex: "none",
          overflow: "hidden",
          backgroundColor: "#d9d9d9",
          borderRadius: "2px",
        };
        return (
          <div key={i} style={style}>
            {isVimeo(src) ? (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={getVimeoEmbedUrl(src)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : isVideo(src) ? (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <img
                ref={(el) => { imgRefs.current[i] = el; }}
                src={src}
                alt={`${projectName} — ${filename}`}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// **텍스트** → semi-bold(600)
// 한 줄 안에서 \n → <br> (줄 바꿈, 간격 없음)
function renderLine(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <span key={i} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

// 문단 하나를 렌더링: 줄 바꿈(\n)은 <br>로
function renderParagraph(para: string) {
  const lines = para.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {renderLine(line)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [dividerHovered, setDividerHovered] = useState(false);
  const isMobile = useIsMobile();

  // Collect all images: thumb first, then detailImages (by name from project folder),
  // then auto-globbed photos. Deduplicate by URL.
  const allImages: string[] = [];
  const seen = new Set<string>();

  const addImage = (url: string) => {
    if (url && !seen.has(url)) {
      seen.add(url);
      allImages.push(url);
    }
  };

  addImage(project.image);
  // photos are already resolved URLs from the glob
  (project.photos ?? []).forEach(addImage);

  // \n\n → 문단 나누기 (18px 간격), \n\n\n\n → 두 번 띄기 (36px)
  // 빈 문단("")도 18px 스페이서로 유지 (필터링 안 함)
  const overviewParagraphs = project.overview
    ? project.overview.split("\n\n")
    : [];

  const buttonLabel = overviewOpen
    ? "→ Project Overview ×"
    : "← Project Overview +";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        fontFamily: "'Switzer', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Left panel (slides in) — desktop only ── */}
      <div
        style={{
          width: (!isMobile && overviewOpen) ? "calc(50% - 6px)" : "0%",
          minWidth: (!isMobile && overviewOpen) ? "calc(50% - 6px)" : "0%",
          overflow: "hidden",
          transition: "width 0.4s ease, min-width 0.4s ease",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Inner content */}
        <div
          style={{
            width: "100%",
            padding: "12px 20px 40px 20px",
            overflowY: "auto",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Left panel title bar */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "16px",
                  color: "black",
                  fontWeight: 600,
                  letterSpacing: "-0.04px",
                }}
              >
                Project Overview
              </span>
              <button
                onClick={() => { setOverviewOpen(false); setDividerHovered(false); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: 1,
                  color: "black",
                  fontSize: "18px",
                  fontWeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00F77B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
              >
                ×
              </button>
            </div>
            <div style={{ height: "1.3px", backgroundColor: "black", marginTop: "1px" }} />
          </div>

          {/* Overview paragraphs */}
          {overviewParagraphs.length > 0 ? (
            <div style={{ marginBottom: "28px" }}>
              {overviewParagraphs.map((para, i) => {
                const isLast = i === overviewParagraphs.length - 1;
                // 빈 문단 = \n\n\n\n 의 중간 → 18px 스페이서
                if (para.trim().length === 0) {
                  return <div key={i} style={{ height: "18px" }} />;
                }
                return (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                      fontWeight: 400,
                      color: "black",
                      margin: 0,
                      marginBottom: isLast ? 0 : "18px",
                    }}
                  >
                    {renderParagraph(para)}
                  </p>
                );
              })}
            </div>
          ) : (
            <p
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "16px",
                lineHeight: 1.5,
                color: "#888",
                marginBottom: "32px",
              }}
            >
              No overview available.
            </p>
          )}

          {/* Metadata — 두 열 독립 flex */}
          <div style={{ display: "flex", gap: "12px" }}>
            {/* 왼쪽 열: Client → Year → Scope */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              <MetaField label="Client" value={project.type} />
              <MetaField label="Year" value={project.year} />
              {project.scope && (
                <MetaField label="Scope of work" value={project.scope} />
              )}
            </div>
            {/* 오른쪽 열: Team → Collaborators */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
              <MetaField
                label="Team"
                value={
                  project.team && project.team.length > 0
                    ? project.team.join(", ")
                    : undefined
                }
              />
              {project.collaborators && project.collaborators.length > 0 && (
                <MetaField
                  label="Collaborators"
                  value={project.collaborators.join("\n")}
                  multiline
                />
              )}
              {project.awards && project.awards.length > 0 && (
                <MetaField
                  label="Award"
                  value={project.awards.join("\n")}
                  multiline
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider (only visible when panel is open, desktop only) ── */}
      {!isMobile && overviewOpen && (
        <div
          style={{
            width: "12px",
            flexShrink: 0,
            position: "relative",
            cursor: "pointer",
            zIndex: 10,
          }}
          onMouseEnter={() => setDividerHovered(true)}
          onMouseLeave={() => setDividerHovered(false)}
          onClick={() => { setOverviewOpen(false); setDividerHovered(false); }}
        >
          <div
            style={{
              position: "absolute",
              left: "0",
              top: 0,
              bottom: 0,
              width: "1.3px",
              backgroundColor: dividerHovered ? "#00F77B" : "#bababa",
              transition: "background-color 0.2s ease",
            }}
          />
        </div>
      )}

      {/* ── Right panel ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Padding wrapper */}
        <div style={{ padding: "0 20px", paddingBottom: "40px" }}>
          {/* Top spacer */}
          <div style={{ height: "12px" }} />

          {/* Project title — hide for hidden projects */}
          {!project.hidden && (
            <h1
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: isMobile ? "32px" : "52px",
                fontWeight: 500,
                letterSpacing: "-0.13px",
                color: "#111",
                margin: 0,
                marginBottom: isMobile ? "20px" : "0",
                lineHeight: 1.05,
                wordBreak: "break-word",
              }}
            >
              {project.projectName}
            </h1>
          )}

          {/* Overview toggle button — desktop only, hide for hidden projects */}
          {!project.hidden && (
            <button
              onClick={() => setOverviewOpen((o) => !o)}
              style={{
                display: isMobile ? "none" : undefined,
                fontFamily: "'Switzer', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 0 16px 0",
                marginTop: "60px",
                letterSpacing: "-0.04px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00F77B")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              {buttonLabel}
            </button>
          )}

          {/* Images — layout 있으면 row 기반, 없으면 1장씩 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {project.layout && project.layout.length > 0 ? (
              // layout 정의된 경우: 행마다 이미지 개수 제어 + 최단 높이 기준 정렬
              project.layout.map((row, rowIndex) => (
                <LayoutRow
                  key={rowIndex}
                  row={row}
                  photoMap={project.photoMap}
                  projectName={project.projectName}
                  gap={8}
                />
              ))
            ) : allImages.length > 0 ? (
              // layout 없는 경우: 1장씩 세로 나열
              allImages.map((src, i) => (
                <div
                  key={i}
                  style={{ width: "100%", backgroundColor: "#d9d9d9", overflow: "hidden", borderRadius: "2px" }}
                >
                  <ImageWithFallback
                    src={src}
                    alt={`${project.projectName} — image ${i + 1}`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ))
            ) : (
              /* 이미지 없을 때 placeholder */
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: "14px", color: "#888" }}>
                  No images available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper: single metadata field ── */
interface MetaFieldProps {
  label: string;
  value?: string;
  multiline?: boolean;
}

function MetaField({ label, value, multiline }: MetaFieldProps) {
  if (!value) return null;
  return (
    <div>
      <div
        style={{
          fontFamily: "'Switzer', sans-serif",
          fontSize: "12px",
          color: "#888",
          fontWeight: 400,
          marginBottom: "4px",
          letterSpacing: "-0.03px",
        }}
      >
        {label}
      </div>
      {multiline ? (
        value.split("\n").map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "14px",
              color: "black",
              lineHeight: "22px",
              letterSpacing: "-0.04px",
            }}
          >
            {line}
          </div>
        ))
      ) : (
        <div
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontSize: "14px",
            color: "black",
            lineHeight: "22px",
            letterSpacing: "-0.04px",
          }}
        >
          {value}
        </div>
      )}
    </div>
  );
}
