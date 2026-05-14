import React, { useState, useEffect } from "react";

const experiences = [
  { year: "2025.08-12.", name: "2025 Hongik University Visual Communication Degree Show, Space Design", type: "Hongik Univ." },
  { year: "2025.03-08.", name: "LG Crew 5th - Laundry CX Research Team", type: "LG Electronics" },
  { year: "2024.07-08.", name: "Graphic Design Intern", type: "Studio Roam" },
  { year: "2023, 2025", name: "Print Shop Assistant", type: "Hongik Univ." },
];

const awards = [
  { year: "2025", name: "2025 IDEA Award", type: "OFFit, Student Featured Finalist" },
  { year: "2025", name: "2025 Graphis Award", type: "Défora, Student Silver" },
];

const education = [
  { year: "2026~", name: "Royal College of Art, London (2026 Expected Enrollment)", type: "MA Visual Communication" },
  { year: "2026–2021", name: "Hongik University, Seoul", type: "BFA Visual Communication Design" },
];

const fontBase: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  letterSpacing: "-0.076px",
};

const sectionTitleStyle: React.CSSProperties = {
  ...fontBase,
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: 600,
  color: "black",
};

const headerStyle: React.CSSProperties = {
  ...fontBase,
  fontSize: "12px",
  lineHeight: "20.8px",
  color: "#bababa",
};

function TableSection({ title, rows }: { title: string; rows: { year: string; name: string; type: string }[] }) {
  return (
    <div className="mb-[28px]">
      <div className="pb-[1px] mb-[4px]" style={{ borderBottom: "1.8px solid #000000" }}>
        <span style={sectionTitleStyle}>{title}</span>
      </div>
      {rows.map((exp, i) => (
        <div
          key={i}
          className="grid items-baseline py-[4px] cursor-pointer"
          style={{
            gridTemplateColumns: "80px 1.4fr 1fr",
            columnGap: "4px",
            borderBottom: "1px solid #e0e0e0",
            transition: "background-color 0.15s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f5f5f5")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <span
            style={{
              ...fontBase,
              fontSize: "13px",
              lineHeight: "22px",
              color: "#888",
            }}
          >
            {exp.year}
          </span>
          <span
            style={{
              ...fontBase,
              fontSize: "14px",
              lineHeight: "22px",
              color: "black",
              wordBreak: "keep-all",
            }}
          >
            {exp.name}
          </span>
          <span
            className="text-right"
            style={{
              ...fontBase,
              fontSize: "13px",
              lineHeight: "22px",
              color: "#888",
              wordBreak: "keep-all",
            }}
          >
            {exp.type}
          </span>
        </div>
      ))}
    </div>
  );
}

export function AboutPage() {
  const [expanded, setExpanded] = useState(false);
  const [edgeHovered, setEdgeHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cvExpanded, setCvExpanded] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ═══ Mobile layout — single column, CV tables toggle below ═══ */
  if (isMobile) {
    return (
      <div className="h-full overflow-auto">
        <div className="px-[16px] pt-[19px] pb-[24px]">
          {/* Title */}
          <div
            className="pb-[1px]"
            style={{ borderBottom: "1.8px solid black" }}
          >
            <span style={sectionTitleStyle}>About</span>
          </div>

          {/* Bio */}
          <div className="mt-[20px] flex flex-col gap-[18px]">
            <p
              style={{
                ...fontBase,
                fontSize: "16px",
                lineHeight: "24px",
                color: "black",
                margin: 0,
              }}
            >
              Eunje Heo is a designer based in Seoul & London, 
              specialising in brand experience and user experience.
              Through her background in visual
              communication and interest in technology, she creates distinctive experience for the project.
            </p>

            <p
              style={{
                ...fontBase,
                fontSize: "16px",
                lineHeight: "24px",
                color: "black",
                margin: 0,
              }}
            >
              I believe that the most powerful design stems from a deep understanding of its context. 
              By extracting visual logic from lived experience, I delve into solutions that communicate value with precision. 
              My mission is to amplify these messages, allowing a wider audience to resonate with and immerse themselves in the stories.
            </p>

          

            {/* CV Download */}
            <div className="mt-[8px]">
              <a
                href="/cv.pdf"
                download
                className="no-underline transition-opacity hover:opacity-60"
                style={{
                  ...fontBase,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "black",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>↓</span>
                <span style={{ borderBottom: "1px solid black" }}>
                  CV download
                </span>
              </a>
            </div>
          </div>

          {/* ── Horizontal divider line (replaces the vertical 1.8px line) ── */}
          <div
            style={{
              height: "1.8px",
              backgroundColor: cvExpanded ? "#00F77B" : "black",
              marginTop: "24px",
              transition: "background-color 0.25s ease",
            }}
          />

          {/* ── CV toggle button ── */}
          <div
            className="cursor-pointer select-none"
            style={{
              marginTop: "12px",
              paddingBottom: "12px",
              borderBottom: cvExpanded ? "none" : "1.8px solid black",
              transition: "border-color 0.25s ease",
            }}
            onClick={() => setCvExpanded(!cvExpanded)}
          >
            <div className="flex items-center gap-[6px]">
              <span
                style={{
                  ...fontBase,
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: cvExpanded ? "#00F77B" : "black",
                  transition: "color 0.25s ease",
                }}
              >
                CV
              </span>
              <span
                style={{
                  ...fontBase,
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: cvExpanded ? "#00F77B" : "black",
                  transition: "color 0.25s ease",
                }}
              >
                (Tab here to {cvExpanded ? "close" : "open"})
              </span>
            </div>
          </div>

          {/* ── Expandable CV tables ── */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: cvExpanded ? "2000px" : "0px",
              opacity: cvExpanded ? 1 : 0,
              transition: "max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
            }}
          >
            <div
              style={{
                paddingTop: "20px",
                transform: cvExpanded ? "translateY(0)" : "translateY(-10px)",
                transition: "transform 0.4s ease 0.1s",
              }}
            >
              <TableSection title="Experience" rows={experiences} />
              <TableSection title="Awards" rows={awards} />
              <TableSection title="Education" rows={education} />
            </div>
            {/* Bottom line — appears at end of tables when expanded */}
            <div
              style={{
                height: "1.8px",
                backgroundColor: "#00F77B",
                marginBottom: "4px",
              }}
            />
          </div>

          {/* Contact note */}
          <p
            style={{
              ...fontBase,
              fontSize: "13px",
              lineHeight: "20px",
              color: "#888",
              margin: 0,
              marginTop: "20px",
            }}
          >
            For inquiries and collaborations, please reach out via{" "}
            <a
              href="mailto:heo0eunje@gmail.com"
              className="underline"
              style={{ color: "black" }}
            >
              heo0eunje@gmail.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  /* ═══ Desktop layout (unchanged) ═══ */
  return (
    <div className="relative flex h-full overflow-hidden">
      {/* ===== Left Column — Tables (slides in from left) ===== */}
      <div
        className="h-full overflow-auto shrink-0"
        style={{
          width: expanded ? "50%" : "0%",
          opacity: expanded ? 1 : 0,
          transition: "width 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
          minWidth: 0,
        }}
      >
        <div
          className="px-[16px] pt-[12px] pb-[40px]"
          style={{
            minWidth: "320px",
            opacity: expanded ? 1 : 0,
            transform: expanded ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
          }}
        >
          <TableSection title="Experience" rows={experiences} />
          <TableSection title="Awards" rows={awards} />
          <TableSection title="Education" rows={education} />
        </div>
      </div>

      {/* ===== Edge hover / click zone ===== */}
      <div
        className="relative shrink-0 z-10 flex items-center justify-center cursor-pointer select-none"
        style={{
          width: "16px",
          transition: "width 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => expanded ? setCloseHovered(true) : setEdgeHovered(true)}
        onMouseLeave={() => { setEdgeHovered(false); setCloseHovered(false); }}
        onClick={() => { setExpanded(!expanded); setEdgeHovered(false); setCloseHovered(false); }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center"
          style={{ width: "16px" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: "1.8px",
              backgroundColor: (edgeHovered || closeHovered) ? "#00F77B" : "#e0e0e0",
              transition: "background-color 0.2s ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "8px",
              opacity: (expanded ? closeHovered : edgeHovered) ? 1 : 0,
              transform: (expanded ? closeHovered : edgeHovered) ? "translateX(0)" : "translateX(-4px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              fontSize: "22px",
              fontWeight: 700,
              color: "#00F77B",
              fontFamily: "'Switzer', sans-serif",
            }}
          >
            {expanded ? "→" : "←"}
          </span>
        </div>
      </div>

      {/* ===== Right Column — About Bio ===== */}
      <div
        className="h-full overflow-auto flex-1"
        style={{
          minWidth: 0,
          transition: "flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="px-[0px] pr-[16px] pt-[12px] pb-[40px]">
          <div
            className="pb-[1px] flex items-center justify-between"
            style={{ borderBottom: "1.8px solid black" }}
          >
            <span style={sectionTitleStyle}>About</span>
          </div>

          <div className="mt-[20px] flex flex-col gap-[18px]" style={{ maxWidth: "920px" }}>
            <p
              style={{
                ...fontBase,
                fontSize: "16px",
                lineHeight: "24px",
                color: "black",
                margin: 0,
              }}
            >
              Eunje Heo is a designer based in Seoul &amp; London,
              specialising in brand experience and user experience.
              Through her background in visual
              communication and interest in technology, she creates distinctive experience for the project.
            </p>

            <p
              style={{
                ...fontBase,
                fontSize: "16px",
                lineHeight: "24px",
                color: "black",
                margin: 0,
              }}
            >
              I believe that the most powerful design stems from a deep understanding of its context.
              By extracting visual logic from lived experience, I delve into solutions that communicate value with precision.
              My mission is to amplify these messages, allowing a wider audience to resonate with and immerse themselves in the stories.
            </p>

            {/* CV Download */}
            <div className="mt-[8px]">
              <a
                href="/cv.pdf"
                download
                className="no-underline transition-opacity hover:opacity-60"
                style={{
                  ...fontBase,
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "black",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>←</span>
                <span style={{ borderBottom: "1px solid black" }}>
                  CV download
                </span>
              </a>
            </div>

            {/* Contact note */}
            <p
              className="mt-[12px]"
              style={{
                ...fontBase,
                fontSize: "13px",
                lineHeight: "20px",
                color: "#888",
                margin: 0,
                marginTop: "12px",
              }}
            >
              For inquiries and collaborations, please reach out via{" "}
              <a
                href="mailto:heo0eunje@gmail.com"
                className="underline"
                style={{ color: "black" }}
              >
                heo0eunje@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
