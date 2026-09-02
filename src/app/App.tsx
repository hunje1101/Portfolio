import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { ProjectCard } from "./components/ProjectCard";
import { AboutPage } from "./components/AboutPage";
import { ProjectDetailPage } from "./components/ProjectDetailPage";
import { RipOffIntro } from "./components/splash";
import { projects, Project } from "../content/projects";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

type RowDef = { indices: number[]; widths: number[] };

function buildRowWidths(indices: number[], projectList: Project[], rowSeed: number): number[] {
  const hws = indices.map(i => projectList[i]?.home?.[1]);
  if (indices.length === 1) return [1];
  if (indices.length === 2) {
    let split: number;
    if (hws[0] != null) split = hws[0];
    else if (hws[1] != null) split = 1 - hws[1];
    else {
      const hasAward0 = projectList[indices[0]]?.award;
      const hasAward1 = projectList[indices[1]]?.award;
      if (hasAward0 && !hasAward1) split = 0.55 + seededRandom(rowSeed + 77) * 0.05;
      else if (!hasAward0 && hasAward1) split = 0.4 + seededRandom(rowSeed + 77) * 0.05;
      else split = 0.4 + seededRandom(rowSeed + 77) * 0.2;
    }
    return [split, 1 - split];
  }
  if (hws.some(w => w != null)) {
    const total = hws.reduce((s, w) => s + (w ?? 1 / indices.length), 0);
    return hws.map(w => (w ?? 1 / indices.length) / total);
  }
  const awardPos = indices.findIndex(idx => projectList[idx]?.award);
  const a = 0.25 + seededRandom(rowSeed + 88) * 0.2;
  const b = 0.25 + seededRandom(rowSeed + 99) * 0.2;
  const c = 1 - a - b;
  const w = [a, b, c];
  if (awardPos >= 0) {
    const maxI = w.indexOf(Math.max(...w));
    if (maxI !== awardPos) [w[maxI], w[awardPos]] = [w[awardPos], w[maxI]];
  }
  return w;
}

function buildHomeRows(projectList: Project[]): RowDef[] {
  const hasExplicitRows = projectList.some(p => p.home != null);

  if (hasExplicitRows) {
    const groups = new Map<number, number[]>();
    let autoKey = 10000;
    projectList.forEach((p, i) => {
      const key = p.home?.[0] ?? autoKey++;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(i);
    });
    return [...groups.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([key, indices]) => ({ indices, widths: buildRowWidths(indices, projectList, key) }));
  }

  const rows: RowDef[] = [];
  let i = 0;
  let rowSeed = 0;
  while (i < projectList.length) {
    const remaining = projectList.length - i;
    const r = seededRandom(rowSeed + 42);
    const cardsInRow = remaining === 1 ? 1 : remaining === 2 ? 2 : r < 0.5 ? 2 : 3;
    const indices: number[] = [];
    for (let j = 0; j < cardsInRow && i < projectList.length; j++, i++) indices.push(i);
    rows.push({ indices, widths: buildRowWidths(indices, projectList, rowSeed) });
    rowSeed++;
  }
  return rows;
}

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
  { label: "★", matchTags: ["★"] },
];

const StarIconDesktop = ({ height = 16 }: { height?: number }) => (
  <svg width={height * 48 / 28} height={height} viewBox="0 0 48 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1407 3.00855C22.483 -1.40327 27.5388 -0.714564 27.7042 3.64917C29.8441 1.16428 33.548 1.94557 33.6124 5.22241C33.6692 8.06668 31.322 10.3041 28.9278 11.7039C30.9018 10.9481 33.085 10.4912 34.9503 11.0583C39.3631 12.3986 38.6584 17.4996 34.2891 17.6794C36.7701 19.8299 35.977 23.5665 32.6964 23.6414C29.8429 23.7075 27.6063 21.338 26.213 18.9226C26.969 20.9066 27.4298 23.1096 26.8565 24.9919C25.5142 29.4037 20.4575 28.715 20.2921 24.3513C18.1521 26.8357 14.4493 26.0547 14.3848 22.7781C14.3277 19.9188 16.6992 17.6714 19.1065 16.2732C17.1235 17.0369 14.926 17.5038 13.0499 16.9333C8.63711 15.5931 9.34184 10.4922 13.711 10.3123C11.2299 8.16178 12.0231 4.42422 15.3038 4.34937C18.1452 4.28355 20.374 6.63406 21.7686 9.03882C21.0215 7.06504 20.5712 4.87854 21.1407 3.00855ZM23.0098 11.7488C23.0655 11.9132 23.1162 12.0719 23.1602 12.2244C23.2312 12.4745 23.6199 13.7585 23.5762 13.9099C23.5389 14.0429 22.8976 14.4097 22.6036 14.5789C22.3303 14.736 22.0363 14.898 21.7266 15.0632C21.8962 15.0047 22.06 14.9521 22.2169 14.906C22.4649 14.8344 23.6242 14.4025 23.7755 14.4451C23.9072 14.4817 24.383 15.1615 24.5499 15.4548C24.6966 15.7128 24.848 15.9893 25.002 16.28C24.9413 16.1025 24.8873 15.9311 24.8399 15.7673C24.769 15.5174 24.3399 14.3499 24.3829 14.197C24.4199 14.0641 25.1024 13.582 25.3966 13.4128C25.658 13.2625 25.9376 13.1059 26.2325 12.948C26.0762 13.0014 25.9256 13.0518 25.7803 13.0945C25.5321 13.1661 24.3708 13.5986 24.2208 13.5554C24.0885 13.5176 23.6142 12.8388 23.4473 12.5457C23.3053 12.2961 23.1588 12.0291 23.0098 11.7488Z" />
  </svg>
);

const StarIconMobile = ({ height = 14 }: { height?: number }) => (
  <svg width={height * 30 / 28} height={height} viewBox="0 0 30 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.1407 3.0083C13.483 -1.40351 18.5388 -0.714806 18.7042 3.64893C20.8441 1.16404 24.548 1.94533 24.6124 5.22217C24.6692 8.06643 22.322 10.3039 19.9278 11.7036C21.9018 10.9478 24.085 10.491 25.9503 11.0581C30.3631 12.3983 29.6584 17.4993 25.2891 17.6792C27.7701 19.8297 26.977 23.5663 23.6964 23.6411C20.8429 23.7072 18.6063 21.3377 17.213 18.9224C17.969 20.9063 18.4298 23.1093 17.8565 24.9917C16.5142 29.4035 11.4575 28.7148 11.2921 24.3511C9.15208 26.8354 5.44931 26.0544 5.38483 22.7778C5.32767 19.9185 7.69919 17.6712 10.1065 16.273C8.12347 17.0367 5.92605 17.5035 4.04987 16.9331C-0.362893 15.5929 0.341838 10.4919 4.711 10.312C2.2299 8.16153 3.02313 4.42397 6.30378 4.34912C9.1452 4.28331 11.374 6.63382 12.7686 9.03858C12.0215 7.0648 11.5712 4.8783 12.1407 3.0083ZM14.0098 11.7485C14.0655 11.9129 14.1162 12.0717 14.1602 12.2241C14.2312 12.4742 14.6199 13.7582 14.5762 13.9097C14.5389 14.0427 13.8976 14.4095 13.6036 14.5786C13.3303 14.7358 13.0363 14.8978 12.7266 15.063C12.8962 15.0044 13.06 14.9519 13.2169 14.9058C13.4649 14.8342 14.6242 14.4023 14.7755 14.4448C14.9072 14.4814 15.383 15.1612 15.5499 15.4546C15.6966 15.7126 15.848 15.9891 16.002 16.2798C15.9413 16.1023 15.8873 15.9309 15.8399 15.7671C15.769 15.5172 15.3399 14.3496 15.3829 14.1968C15.4199 14.0638 16.1024 13.5818 16.3966 13.4126C16.658 13.2622 16.9376 13.1057 17.2325 12.9478C17.0762 13.0012 16.9256 13.0515 16.7803 13.0942C16.5321 13.1659 15.3708 13.5984 15.2208 13.5552C15.0885 13.5173 14.6142 12.8386 14.4473 12.5454C14.3053 12.2958 14.1588 12.0289 14.0098 11.7485Z" />
  </svg>
);

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
  const [introComplete, setIntroComplete] = useState(false);
  const isPoppingRef = useRef(false);

  const navigateTo = useCallback((page: string, project: Project | null = null) => {
    history.pushState({ page, projectKey: project?._key ?? null }, "", "");
    setCurrentPage(page);
    setCurrentProject(project);
  }, []);

  useEffect(() => {
    history.replaceState({ page: "Home", projectKey: null }, "", "");

    const onPopState = (e: PopStateEvent) => {
      const s = e.state as { page: string; projectKey: string | null } | null;
      isPoppingRef.current = true;
      if (!s) {
        setCurrentPage("Home");
        setCurrentProject(null);
      } else {
        setCurrentPage(s.page);
        setCurrentProject(
          s.projectKey ? (projects.find(p => p._key === s.projectKey) ?? null) : null
        );
      }
      requestAnimationFrame(() => { isPoppingRef.current = false; });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
    if (currentPage === "All Projects") {
      setHeroCollapsed(true);
      const t1 = setTimeout(() => setShowFilters(true), isMobile ? 200 : 350);
      const t2 = setTimeout(() => setAllFlipped(true), isMobile ? 600 : 500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setAllFlipped(false);
      setShowFilters(false);
      setHeroCollapsed(false);
      setActiveFilter("All");
      if (!isPoppingRef.current) setCurrentProject(null);
    }
  }, [currentPage]);

  // Filter projects based on active filter
  // On "Projects" page: show all including hidden. On "Home": hide hidden ones.
  const filteredProjects = useMemo(() => {
    const pool = currentPage === "All Projects"
      ? projects
      : activeFilter === "★"
        ? projects
        : projects.filter((p) => !p.hidden);
    if (activeFilter === "All") return pool.filter((p) => !p.tags.includes("★"));
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
    <>
    {!introComplete && <RipOffIntro onComplete={() => setIntroComplete(true)} />}
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
              navigateTo(currentPage, null);
            }
          } else {
            navigateTo(page);
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
          <ProjectDetailPage project={currentProject} />
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
                  {`Eunje Heo is a designer based in London, originally from Seoul, specialising in brand experience. With a multidisciplinary approach spanning identity, interface, packaging, and space, she shapes cohesive brand experiences across every touchpoint.`}
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
                  {activeFilter === "★" ? <StarIconMobile /> : activeFilter}
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
                          color: isActive ? "black" : "#888",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px 0",
                          textAlign: "left",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {cat.label === "★" ? <StarIconMobile /> : cat.label}
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
                        fontWeight: isActive ? 500 : 400,
                        color: "black",
                        background: "none",
                        cursor: "pointer",
                        padding: "4px 0",
                        border: "none",
                        transition: "color 0.25s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.label === "★" ? "☺" : cat.label}
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
                  wip={project.wip}
                  forceFlipped={allFlipped}
                  flipDelay={index * 50}
                  activeFilter={activeFilter}
                  isMobile={true}
                  onProjectClick={(project.wip || project.hidden || project.tags.includes("★")) ? undefined : () => navigateTo(currentPage, project)}
                  keyColor={project.keyColor}
                />
              ))}
            </div>
          ) : (
            /* Desktop: row-based random sizes on Home, 2-column grid on Projects */
            (() => {
              const isHome = currentPage === "Home";
              const gap = 8;
              const rows = buildHomeRows(filteredProjects);
              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: `${gap}px`,
                    marginTop: "12px",
                    paddingBottom: "40px",
                  }}
                >
                  {filteredProjects.map((project, index) => {
                    const row = rows.find((r) => r.indices.includes(index));
                    const posInRow = row ? row.indices.indexOf(index) : 0;
                    const homeWidthFrac = row ? row.widths[posInRow] : 0.5;
                    const cardsInRow = row ? row.indices.length : 2;
                    const homeWidth = `calc(${homeWidthFrac * 100}% - ${gap * (cardsInRow - 1) / cardsInRow}px)`;
                    const gridWidth = `calc(50% - ${gap / 2}px)`;
                    return (
                      <div
                        key={project._key}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: isHome ? homeWidth : gridWidth,
                          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
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
                          flipDelay={index * 120}
                          activeFilter={activeFilter}
                          isMobile={false}
                          onProjectClick={(project.wip || project.hidden || project.tags.includes("★")) ? undefined : () => navigateTo(currentPage, project)}
                          keyColor={project.keyColor}
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
              );
            })()
          )}
        </div>
        )}
      </main>
    </div>
    </>
  );
}

