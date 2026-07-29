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

const isVideo = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
const isVimeo = (src: string) => /^https?:\/\/(www\.)?vimeo\.com\/\d+/i.test(src);
const isExternalUrl = (src: string) => /^https?:\/\//i.test(src);

const getVimeoEmbedUrl = (src: string) => {
  const match = src.match(/vimeo\.com\/(\d+)/);
  return match
    ? `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=0`
    : src;
};

/* ── Shared text styles ── */

const font = (size: number, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: "'Switzer', sans-serif",
  fontSize: `${size}px`,
  color: "black",
  letterSpacing: "-0.04px",
  ...extra,
});

/* ── Markdown-lite rendering: **bold** and \n → <br> ── */

function renderLine(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <span key={i} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</span>
      : <span key={i}>{part}</span>
  );
}

function renderParagraph(para: string) {
  const lines = para.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {renderLine(line)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

/* ── Layout row: equal-height media with aspect-ratio preservation ── */

function LayoutRow({ row, photoMap, projectName, gap }: {
  row: string[];
  photoMap: Record<string, string>;
  projectName: string;
  gap: number;
}) {
  const n = row.length;
  const [ratios, setRatios] = useState<number[] | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;

    function getAR(index: number, src: string): Promise<number> {
      if (isVimeo(src)) return Promise.resolve(16 / 9);

      if (isVideo(src)) {
        const el = videoRefs.current[index];
        if (!el) return Promise.resolve(16 / 9);
        if (el.videoWidth > 0) return Promise.resolve(el.videoWidth / el.videoHeight);
        return new Promise(resolve => {
          el.addEventListener("loadedmetadata", () =>
            resolve(el.videoHeight > 0 ? el.videoWidth / el.videoHeight : 16 / 9),
            { once: true },
          );
        });
      }

      const el = imgRefs.current[index];
      if (!el) return Promise.resolve(1);
      if (el.complete && el.naturalWidth > 0) return Promise.resolve(el.naturalWidth / el.naturalHeight);
      return new Promise(resolve => {
        const done = () => resolve(el.naturalHeight > 0 ? el.naturalWidth / el.naturalHeight : 1);
        el.addEventListener("load", done, { once: true });
        el.addEventListener("error", done, { once: true });
      });
    }

    Promise.all(
      row.map((filename, i) => {
        const src = isExternalUrl(filename) ? filename : photoMap[filename];
        return src ? getAR(i, src) : Promise.resolve(1);
      }),
    ).then(result => { if (!cancelled) setRatios(result); });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    videoRefs.current.forEach(v => { if (v?.paused) v.play().catch(() => {}); });
  }, [ratios]);

  const totalGapPx = gap * (n - 1);
  const totalRatio = ratios ? ratios.reduce((a, b) => a + b, 0) : n;

  return (
    <div style={{ display: "flex", gap: `${gap}px`, alignItems: "flex-start" }}>
      {row.map((filename, i) => {
        const src = isExternalUrl(filename) ? filename : photoMap[filename];
        if (!src) return null;
        const share = ratios ? ratios[i] / totalRatio : 1 / n;
        const width = `calc(${(share * 100).toFixed(6)}% - ${(totalGapPx * share).toFixed(6)}px)`;

        return (
          <div key={i} style={{ width, flex: "none", overflow: "hidden", backgroundColor: "#d9d9d9", borderRadius: "2px" }}>
            {isVimeo(src) ? (
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={getVimeoEmbedUrl(src)}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : isVideo(src) ? (
              <video
                ref={el => { videoRefs.current[i] = el; }}
                src={src}
                autoPlay loop muted playsInline preload="auto"
                onCanPlay={e => { (e.target as HTMLVideoElement).play().catch(() => {}); }}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <img
                ref={el => { imgRefs.current[i] = el; }}
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

/* ── MetaField ── */

function MetaField({ label, value, multiline }: { label: string; value?: string; multiline?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <div style={font(12, { color: "#888", fontWeight: 400, marginBottom: "4px", letterSpacing: "-0.03px" })}>
        {label}
      </div>
      {multiline
        ? value.split("\n").map((line, i) => <div key={i} style={font(14, { lineHeight: "22px" })}>{line}</div>)
        : <div style={font(14, { lineHeight: "22px" })}>{value}</div>
      }
    </div>
  );
}

/* ── Overview content (shared between desktop panel & mobile overlay) ── */

function OverviewContent({ project, paragraphs, showKorean, hasKorean, onToggleLang, compact, onClose }: {
  project: Project;
  paragraphs: string[];
  showKorean: boolean;
  hasKorean: boolean;
  onToggleLang: () => void;
  compact: boolean;
  onClose?: () => void;
}) {
  const titleSize = compact ? 14 : 16;
  const textSize = compact ? 14 : 16;
  const lineH = compact ? "22px" : "24px";
  const paraGap = compact ? 14 : 18;

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={font(titleSize, { fontWeight: 600 })}>Project Overview</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {hasKorean && (
              <button
                onClick={onToggleLang}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  ...font(compact ? 12 : 13, { fontWeight: 500, color: "#888", letterSpacing: "-0.03px", transition: "color 0.2s ease" }),
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "black"; e.currentTarget.style.fontWeight = "600"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.fontWeight = "500"; }}
              >
                {showKorean ? "EN" : "KR"}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  lineHeight: 1, color: "black", fontSize: "18px", fontWeight: 300,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.fontWeight = "500")}
                onMouseLeave={e => (e.currentTarget.style.fontWeight = "300")}
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div style={{ height: "1.3px", backgroundColor: "black", marginTop: compact ? "4px" : "1px" }} />
      </div>

      {/* Paragraphs */}
      {paragraphs.length > 0 ? (
        <div style={{ marginBottom: "28px" }}>
          {paragraphs.map((para, i) => {
            if (para.trim().length === 0) return <div key={i} style={{ height: `${paraGap}px` }} />;
            return (
              <p key={i} style={font(textSize, {
                lineHeight: lineH, fontWeight: 400, margin: 0,
                marginBottom: i < paragraphs.length - 1 ? `${paraGap}px` : 0,
              })}>
                {renderParagraph(para)}
              </p>
            );
          })}
        </div>
      ) : (
        <p style={font(textSize, { lineHeight: "1.5", color: "#888", marginBottom: "32px" })}>
          No overview available.
        </p>
      )}

      {/* Metadata */}
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          <MetaField label="Client" value={project.type} />
          <MetaField label="Year" value={project.year} />
          {project.scope && <MetaField label="Scope of work" value={project.scope} />}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
          <MetaField label="Team" value={project.team?.length ? project.team.join(", ") : undefined} />
          {project.collaborators?.length && (
            <MetaField label="Collaborators" value={project.collaborators.join("\n")} multiline />
          )}
          {project.awards?.length && (
            <MetaField label="Award" value={project.awards.join("\n")} multiline />
          )}
          {project.links?.length && (
            <div>
              <div style={font(12, { color: "#888", fontWeight: 400, marginBottom: "4px", letterSpacing: "-0.03px" })}>
                Links
              </div>
              {project.links.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={font(14, { lineHeight: "22px", textDecoration: "underline", display: "block" })}
                >
                  {(() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return url; } })()}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Main component ── */

export function ProjectDetailPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [dividerHovered, setDividerHovered] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const isMobile = useIsMobile();

  const allImages: string[] = [];
  const seen = new Set<string>();
  const addImage = (url: string) => { if (url && !seen.has(url)) { seen.add(url); allImages.push(url); } };
  addImage(project.image);
  (project.photos ?? []).forEach(addImage);

  const [overviewEn, overviewKo] = (() => {
    if (project.overview_en || project.overview_kr) return [project.overview_en ?? "", project.overview_kr ?? ""];
    if (!project.overview) return ["", ""];
    const parts = project.overview.split("\n\n\n\n");
    return [parts[0] ?? "", (parts[1] ?? "").trim()];
  })();

  const hasKorean = overviewKo.length > 0;
  const activeOverview = showKorean ? overviewKo : overviewEn;
  const overviewParagraphs = activeOverview ? activeOverview.split("\n\n") : [];
  const toggleLang = () => setShowKorean(v => !v);
  const closePanel = () => { setOverviewOpen(false); setDividerHovered(false); };

  const buttonLabel = overviewOpen ? "→ Project Overview ×" : "← Project Overview +";

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%", width: "100%", fontFamily: "'Switzer', sans-serif", overflow: "hidden" }}>

      {/* ── Desktop left panel ── */}
      <div
        style={{
          width: (!isMobile && overviewOpen) ? "calc(50% - 6px)" : "0%",
          minWidth: (!isMobile && overviewOpen) ? "calc(50% - 6px)" : "0%",
          overflow: "hidden", transition: "width 0.4s ease, min-width 0.4s ease",
          backgroundColor: "white", display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ width: "100%", padding: "12px 20px 40px 20px", overflowY: "auto", height: "100%", boxSizing: "border-box" }}>
          <OverviewContent
            project={project}
            paragraphs={overviewParagraphs}
            showKorean={showKorean}
            hasKorean={hasKorean}
            onToggleLang={toggleLang}
            onClose={closePanel}
            compact={false}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      {!isMobile && overviewOpen && (
        <div
          style={{ width: "12px", flexShrink: 0, position: "relative", cursor: "pointer", zIndex: 10 }}
          onMouseEnter={() => setDividerHovered(true)}
          onMouseLeave={() => setDividerHovered(false)}
          onClick={closePanel}
        >
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: "1.3px",
            backgroundColor: dividerHovered ? "black" : "#bababa", transition: "background-color 0.2s ease",
          }} />
        </div>
      )}

      {/* ── Right panel (images) ── */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ padding: "0 20px", paddingBottom: "40px" }}>
          <div style={{ height: "12px" }} />

          {!project.hidden && (
            <h1 style={{
              ...font(isMobile ? 32 : 52, { fontWeight: 500, letterSpacing: "-0.13px", color: "#111", lineHeight: "1.05", wordBreak: "break-word" }),
              margin: 0, marginBottom: isMobile ? "20px" : "0",
            }}>
              {project.projectName}
            </h1>
          )}

          {!project.hidden && !isMobile && (
            <button
              onClick={() => setOverviewOpen(o => !o)}
              style={{
                ...font(16, { fontWeight: 400, transition: "color 0.2s ease" }),
                background: "none", border: "none", cursor: "pointer",
                padding: "0 0 16px 0", marginTop: "60px",
              }}
              onMouseEnter={e => (e.currentTarget.style.fontWeight = "500")}
              onMouseLeave={e => (e.currentTarget.style.fontWeight = "400")}
            >
              {buttonLabel}
            </button>
          )}

          {/* Images / layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
            {project.layout?.length ? (
              project.layout.map((row, i) => (
                <LayoutRow key={i} row={row} photoMap={project.photoMap} projectName={project.projectName} gap={8} />
              ))
            ) : allImages.length > 0 ? (
              allImages.map((src, i) => (
                <div key={i} style={{ width: "100%", backgroundColor: "#d9d9d9", overflow: "hidden", borderRadius: "2px" }}>
                  <ImageWithFallback src={src} alt={`${project.projectName} — image ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              ))
            ) : (
              <div style={{ width: "100%", aspectRatio: "16 / 9", backgroundColor: "#d9d9d9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={font(14, { color: "#888" })}>No images available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile floating button + overlay ── */}
      {isMobile && !project.hidden && overviewParagraphs.length > 0 && (
        <>
          <button
            onClick={() => setOverviewOpen(o => !o)}
            style={{
              position: "fixed", bottom: "20px", right: "42px", zIndex: 100,
              ...font(14, { fontWeight: 500, color: "#333" }),
              backgroundColor: overviewOpen ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.4)",
              backdropFilter: "blur(20px) saturate(1.2)",
              WebkitBackdropFilter: "blur(20px) saturate(1.2)",
              border: "none", borderRadius: "2px", padding: "8px 14px", cursor: "pointer",
              letterSpacing: "-0.02px", boxShadow: "none",
            }}
          >
            {overviewOpen ? "Project Overview  ×" : "Project Overview  +"}
          </button>

          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99,
            backgroundColor: "white", overflowY: "auto",
            transform: overviewOpen ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s ease",
            padding: "20px 20px 80px 20px", boxSizing: "border-box",
          }}>
            <OverviewContent
              project={project}
              paragraphs={overviewParagraphs}
              showKorean={showKorean}
              hasKorean={hasKorean}
              onToggleLang={toggleLang}
              compact
            />
          </div>
        </>
      )}
    </div>
  );
}
