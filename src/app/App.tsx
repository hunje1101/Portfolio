import { useEffect, useState, useMemo } from "react";
import { Sidebar } from "./components/Sidebar";
import { ProjectCard } from "./components/ProjectCard";
import { AboutPage } from "./components/AboutPage";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { projects, Project } from "../content/projects";

/* ── Filter categories mapped to project tags ── */
const filterCategories = [
  { label: "All", matchTags: [] },
  { label: "Brand Identity", matchTags: ["Brand Identity"] },
  { label: "Editorial", matchTags: ["Editorial"] },
  { label: "Graphic", matchTags: ["Graphic", "Content Creation"] },
  { label: "Interface", matchTags: ["UI Design", "Interface"] },
  { label: "Motion", matchTags: ["Motion"] },
  { label: "Package", matchTags: ["Package", "Package Design"] },
  { label: "Space", matchTags: ["Space", "Space Design"] },
  { label: "Web", matchTags: ["Web Design", "Web"] },
];

const fontBase: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  letterSpacing: "-0.076px",
};

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const [allFlipped, setAllFlipped] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle page transitions
  useEffect(() => {
    if (currentPage === "Projects") {
      setHeroCollapsed(true);
      const t1 = setTimeout(() => setShowFilters(true), isMobile ? 200 : 350);
      const t2 = setTimeout(() => setAllFlipped(true), isMobile ? 600 : 500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setAllFlipped(false);
      setShowFilters(false);
      setHeroCollapsed(false);
      setActiveFilter("All");
      setCurrentProject(null);
    }
  }, [currentPage]);

  // Filter projects based on active filter
  // On "Projects" page: show all including hidden. On "Home": hide hidden ones.
  const filteredProjects = useMemo(() => {
    const pool = currentPage === "Projects"
      ? projects
      : projects.filter((p) => !p.hidden);
    if (activeFilter === "All") return pool;
    const category = filterCategories.find((c) => c.label === activeFilter);
    if (!category) return pool;
    return pool.filter((p) =>
      p.tags.some((tag) =>
        category.matchTags.some(
          (mt) => tag.toLowerCase().includes(mt.toLowerCase())
        )
      )
    );
  }, [activeFilter, currentPage]);

  return (
    <div
      className="size-full flex bg-white transition-opacity duration-[1500ms] ease-out"
      style={{
        opacity: loaded ? 1 : 0,
        flexDirection: isMobile ? "column" : "row",
      }}
      onContextMenu={(e) => {
        // 이미지 우클릭 저장 방지 (다른 요소 우클릭은 허용)
        if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
      }}
    >
      {/* Sidebar (handles its own mobile/desktop rendering) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page === currentPage) {
            if (currentProject) {
              setCurrentProject(null);
            }
          } else {
            setCurrentPage(page);
          }
        }}
      />

      {/* Main Content */}
      <main
        className="flex-1 overflow-auto"
        style={{
          /* Account for fixed mobile header */
          paddingTop: isMobile ? "48px" : "0",
        }}
      >
        {currentPage === "About" ? (
          <AboutPage />
        ) : currentProject !== null ? (
          <ProjectDetailPage
            project={currentProject}
            onBack={() => setCurrentProject(null)}
          />
        ) : (
        <div style={{ padding: isMobile ? "0 16px" : "0 20px" }}>
          {/* Top spacer */}
          <div style={{ height: isMobile ? "8px" : "12px" }} />

          {/* Hero text — collapses via maxHeight */}
          <div
            className="overflow-hidden"
            style={{
              maxHeight: heroCollapsed ? "0px" : isMobile ? "none" : "600px",
              opacity: heroCollapsed ? 0 : 1,
              transition: "max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease",
            }}
          >
            <div className="pb-[10px]">
              <div
                className="text-black"
                style={isMobile ? {
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: "26px",
                  letterSpacing: "-0.053px",
                } : {
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "32px",
                  lineHeight: "37px",
                  letterSpacing: "-0.076px",
                  maxWidth: "1107px",
                }}
              >
                <p className="mb-0">
                  {`Eunje Heo is a designer based in Seoul & London, specialising in brand experience and user experience. Through her background of visual and technology, she creates distinctive experience for the project.`}
                </p>
                <p style={{ marginTop: isMobile ? "20px" : "28px" }}>
                  If our sensibilities align, I'd love to be connected.
                </p>
              </div>
            </div>
          </div>

          {/* ── Filter tag bar ── */}
          {isMobile ? (
            /* ── Mobile: dropdown filter ── */
            <div
              className="overflow-hidden"
              style={{
                maxHeight: showFilters ? "400px" : "0px",
                opacity: showFilters ? 1 : 0,
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
              }}
            >
              {/* Trigger row */}
              <div
                className="flex items-center gap-[6px] pb-[8px] cursor-pointer select-none"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              >
                <span
                  style={{
                    ...fontBase,
                    fontSize: "16px",
                    lineHeight: "20.8px",
                    fontWeight: 400,
                    color: "black",
                  }}
                >
                  {activeFilter}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    color: "black",
                    transition: "transform 0.25s ease",
                    transform: filterDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  ▼
                </span>
              </div>

              {/* Dropdown list */}
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: filterDropdownOpen ? "300px" : "0px",
                  opacity: filterDropdownOpen ? 1 : 0,
                  transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                }}
              >
                <div className="flex flex-col gap-[0px] pb-[8px]">
                  {filterCategories.map((cat) => {
                    const isActive = activeFilter === cat.label;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => {
                          setActiveFilter(cat.label);
                          setFilterDropdownOpen(false);
                        }}
                        style={{
                          ...fontBase,
                          fontSize: "14px",
                          lineHeight: "20px",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#00F77B" : "#888",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px 0",
                          textAlign: "left",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* ── Desktop: horizontal filter bar ── */
            <div
              className="overflow-hidden"
              style={{
                maxHeight: showFilters ? "60px" : "0px",
                opacity: showFilters ? 1 : 0,
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
              }}
            >
              <div className="flex items-center gap-[12px] pb-[10px]">
                {filterCategories.map((cat) => {
                  const isActive = activeFilter === cat.label;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setActiveFilter(cat.label)}
                      style={{
                        ...fontBase,
                        fontSize: "16px",
                        lineHeight: "20.8px",
                        fontWeight: 400,
                        color: isActive ? "#00F77B" : "black",
                        background: "none",
                        cursor: "pointer",
                        padding: "4px 0",
                        border: "none",
                        transition: "color 0.25s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 1.3px border line */}
          <div className="relative w-full h-[1.5px]">
            <div className="absolute inset-0 bg-black" />
          </div>

          {/* Project Cards */}
          {isMobile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "16px",
                paddingBottom: "24px",
              }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._key}
                  year={project.year}
                  projectName={project.projectName}
                  type={project.type}
                  tags={project.tags}
                  image={project.image}
                  award={project.award}
                  forceFlipped={allFlipped}
                  flipDelay={index * 50}
                  activeFilter={activeFilter}
                  isMobile={true}
                  onProjectClick={(project.wip || project.hidden) ? undefined : () => setCurrentProject(project)}
                />
              ))}
            </div>
          ) : (
            /* Desktop: two independent flex columns — each card keeps its natural height */
            <>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px",
                paddingBottom: "40px",
                alignItems: "flex-start",
              }}
            >
              {/* Left column — indexes 0, 2, 4 … */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                {filteredProjects.filter((_, i) => i % 2 === 0).map((project, i) => {
                  const globalIndex = i * 2;
                  return (
                    <div key={project._key} style={{ display: "flex", flexDirection: "column" }}>
                      <ProjectCard
                        year={project.year}
                        projectName={project.projectName}
                        type={project.type}
                        tags={project.tags}
                        image={project.image}
                        award={project.award}
                        wip={project.wip}
                        variant="grid"
                        forceFlipped={allFlipped}
                        flipDelay={globalIndex * 120}
                        activeFilter={activeFilter}
                        isMobile={false}
                        onProjectClick={(project.wip || project.hidden) ? undefined : () => setCurrentProject(project)}
                      />
                      <div style={{ paddingTop: "10px", paddingBottom: "12px" }}>
                        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "14px", lineHeight: "18px", fontWeight: 400, color: "#888", letterSpacing: "-0.04px", marginBottom: "3px" }}>
                          {project.type}
                        </div>
                        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "24px", fontWeight: 500, color: "#111", letterSpacing: "-0.05px" }}>
                          {project.projectName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right column — indexes 1, 3, 5 … */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                {filteredProjects.filter((_, i) => i % 2 === 1).map((project, i) => {
                  const globalIndex = i * 2 + 1;
                  return (
                    <div key={project._key} style={{ display: "flex", flexDirection: "column" }}>
                      <ProjectCard
                        year={project.year}
                        projectName={project.projectName}
                        type={project.type}
                        tags={project.tags}
                        image={project.image}
                        award={project.award}
                        wip={project.wip}
                        variant="grid"
                        forceFlipped={allFlipped}
                        flipDelay={globalIndex * 120}
                        activeFilter={activeFilter}
                        isMobile={false}
                        onProjectClick={(project.wip || project.hidden) ? undefined : () => setCurrentProject(project)}
                      />
                      <div style={{ paddingTop: "10px", paddingBottom: "12px" }}>
                        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "14px", lineHeight: "18px", fontWeight: 400, color: "#888", letterSpacing: "-0.04px", marginBottom: "3px" }}>
                          {project.type}
                        </div>
                        <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "24px", fontWeight: 500, color: "#111", letterSpacing: "-0.05px" }}>
                          {project.projectName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            </>
          )}
        </div>
        )}
      </main>
    </div>
  );
}

