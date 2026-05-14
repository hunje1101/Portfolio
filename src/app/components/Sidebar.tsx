import { useState, useEffect } from "react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navLinks = ["Home", "Projects", "About", "Something Fun"];
  const [pressedLink, setPressedLink] = useState<string | null>(null);
  const [hoveredFun, setHoveredFun] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on page change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  /* ═══ Mobile layout ═══ */
  if (isMobile) {
    return (
      <>
        {/* Top bar — hamburger + name */}
        <div
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white"
          style={{
            height: "48px",
            padding: "0 14px",
          }}
        >
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              fontFamily: "'Switzer', sans-serif",
              fontSize: "20px",
              lineHeight: "48px",
              color: "black",
            }}
          >
            ☰
          </button>
          <span
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "48px",
              letterSpacing: "-0.076px",
              color: "black",
            }}
          >
            Eunje Heo
          </span>
        </div>

        {/* Overlay backdrop */}
        <div
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: "rgba(0,0,0,0.08)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-out menu — same as desktop but 192px wide (182+10) with X */}
        <aside
          className="fixed top-0 left-0 bottom-0 z-50 bg-white flex flex-col justify-between"
          style={{
            width: "210px",
            minWidth: "210px",
            padding: "14px",
            transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="absolute top-0 bottom-0 right-0 w-[1.3px] bg-black" />
          <div className="flex flex-col gap-[30px]">
            {/* Nav (155px, same as desktop) + X beside it */}
            <div className="relative">
              <nav className="flex flex-col" style={{ width: "155px" }}>
                {navLinks.map((label) => {
                  const isActive = currentPage === label;
                  const isDisabled = label === "Something Fun";
                  return (
                    <div key={label} className="relative">
                      <a
                        href="#"
                        className="block no-underline transition-colors"
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: "16px",
                          lineHeight: "20.8px",
                          letterSpacing: "-0.076px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          color: isDisabled
                            ? "#888"
                            : pressedLink === label || isActive
                              ? "#00F77B"
                              : "black",
                          cursor: isDisabled ? "default" : "pointer",
                        }}
                        onMouseDown={() => !isDisabled && setPressedLink(label)}
                        onMouseUp={() => setPressedLink(null)}
                        onMouseLeave={() => { setPressedLink(null); setHoveredFun(false); }}
                        onMouseEnter={() => isDisabled && setHoveredFun(true)}
                        onClick={(e) => {
                          e.preventDefault();
                          if (isDisabled) return;
                          onNavigate(label);
                          setMenuOpen(false);
                        }}
                      >
                        {label}
                      </a>
                      {isDisabled && hoveredFun && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "calc(100% + 8px)",
                            transform: "translateY(-50%)",
                            backgroundColor: "#e0e0e0",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            fontFamily: "'Switzer', sans-serif",
                            fontSize: "10px",
                            color: "#666",
                            whiteSpace: "nowrap",
                          }}
                        >
                          In progress...
                        </div>
                      )}
                      <div style={{ width: "155px" }} className="h-px bg-black" />
                    </div>
                  );
                })}
              </nav>
              {/* X button — sits to the right of the 155px nav */}
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "170px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "18px",
                  lineHeight: "22px",
                  color: "black",
                  padding: "0",
                }}
              >
                ✕
              </button>
            </div>

            {/* Contact — identical to desktop */}
            <div className="flex flex-col" style={{ width: "155px" }}>
              <span
                className="text-black"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "12px",
                  lineHeight: "20.8px",
                  letterSpacing: "-0.076px",
                }}
              >
                Contact for inquiry
              </span>
              <div className="flex items-center mt-[-4px]">
                <a
                  href="mailto:heo0eunje@gmail.com"
                  className="flex items-center no-underline"
                >
                  <span
                    className="text-black mr-1"
                    style={{
                      fontFamily: "'Switzer', 'Noto Sans', sans-serif",
                      fontSize: "13px",
                      letterSpacing: "-0.076px",
                    }}
                  >
                    →
                  </span>
                  <span
                    className="text-black hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "-0.076px",
                    }}
                  >
                    heo0eunje@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="flex gap-[16px]" style={{ paddingBottom: "4px" }}>
            <a
              href="https://www.behance.net/eunje_heo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                lineHeight: "16.5px",
                letterSpacing: "0.065px",
              }}
            >
              Behance
            </a>
            <a
              href="https://www.linkedin.com/in/eunje-heo-966364377/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                lineHeight: "16.5px",
                letterSpacing: "0.065px",
              }}
            >
              Linkedin
            </a>
          </div>
        </aside>
      </>
    );
  }

  /* ═══ Desktop layout (unchanged) ═══ */
  return (
    <aside
      className="relative flex flex-col justify-between h-full px-[14px] py-[14px]"
      style={{ width: "182px", minWidth: "182px" }}
    >
      <div className="absolute top-0 bottom-0 right-0 w-[1.3px] bg-black" />
      {/* Top section */}
      <div className="flex flex-col gap-[30px]">
        {/* Navigation */}
        <nav className="flex flex-col" style={{ width: "155px" }}>
          {navLinks.map((label) => {
            const isActive =
              currentPage === label ||
              (label === "Home" && currentPage === "Home");
            const isDisabled = label === "Something Fun";
            return (
              <div key={label} className="relative">
                <a
                  href="#"
                  className="block no-underline transition-colors"
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "16px",
                    lineHeight: "20.8px",
                    letterSpacing: "-0.076px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    color: isDisabled
                      ? "#888"
                      : pressedLink === label || isActive ? "#00F77B" : "black",
                    cursor: isDisabled ? "default" : "pointer",
                  }}
                  onMouseDown={() => !isDisabled && setPressedLink(label)}
                  onMouseUp={() => setPressedLink(null)}
                  onMouseLeave={() => { setPressedLink(null); setHoveredFun(false); }}
                  onMouseEnter={() => isDisabled && setHoveredFun(true)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isDisabled) return;
                    onNavigate(label);
                    if (label === "Home") {
                      document
                        .querySelector("main")
                        ?.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  {label}
                </a>
                {isDisabled && hoveredFun && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "calc(100% + 8px)",
                      transform: "translateY(-50%)",
                      backgroundColor: "#e0e0e0",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: "10px",
                      color: "#666",
                      whiteSpace: "nowrap",
                    }}
                  >
                    In progress...
                  </div>
                )}
                <div className="w-full h-px bg-black" />
              </div>
            );
          })}
        </nav>

        {/* Contact */}
        <div className="flex flex-col" style={{ width: "155px" }}>
          <span
            className="text-black"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "12px",
              lineHeight: "20.8px",
              letterSpacing: "-0.076px",
            }}
          >
            Contact for inquiry
          </span>
          <div className="flex items-center mt-[-4px]">
            <a
              href="mailto:heo0eunje@gmail.com"
              className="flex items-center no-underline"
            >
              <span
                className="text-black mr-1"
                style={{
                  fontFamily: "'Switzer', 'Noto Sans', sans-serif",
                  fontSize: "13px",
                  letterSpacing: "-0.076px",
                }}
              >
                →
              </span>
              <span
                className="text-black hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "-0.076px",
                }}
              >
                heo0eunje@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom links */}
      <div className="flex gap-[16px]">
        <a
          href="https://www.behance.net/eunje_heo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            lineHeight: "16.5px",
            letterSpacing: "0.065px",
          }}
        >
          Behance
        </a>
        <a
          href="https://www.linkedin.com/in/eunje-heo-966364377/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            lineHeight: "16.5px",
            letterSpacing: "0.065px",
          }}
        >
          Linkedin
        </a>
      </div>
    </aside>
  );
}
