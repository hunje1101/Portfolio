import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";

interface SplashProps {
  onComplete: () => void;
}

const TOOTH_STEP = 46.22;
const TOOTH_DIAG_FRAC = 14.95 / 46.22;
const TOOTH_H = 5.21;
const GAP = 24.89;
const WIDEN_AMOUNT = 120;
const INTRO_TEXT =
  "Eunje Heo is a designer based in London, specialising in brand experience and investigating the relationship between people and sense of place.";

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: "'Switzer', sans-serif",
  fontSize: "13px",
  fontWeight: 400,
  color: "black",
  letterSpacing: "-0.02px",
  whiteSpace: "nowrap",
};

function buildZigzagPath(width: number, direction: "down" | "up"): string {
  const steps = Math.max(1, Math.round(width / TOOTH_STEP));
  const step = width / steps;
  const diag = step * TOOTH_DIAG_FRAC;
  const h = TOOTH_H;
  const pts: string[] = [];

  if (direction === "down") {
    pts.push(`M0,0`);
    for (let i = 0; i < steps; i++) {
      const x = i * step;
      pts.push(`L${x + diag},${h} H${x + step}`);
      if (i < steps - 1) pts.push(`V0`);
    }
    pts.push(`V0 Z`);
  } else {
    pts.push(`M0,${h}`);
    for (let i = 0; i < steps; i++) {
      const x = i * step;
      pts.push(`L${x + diag},0 H${x + step}`);
      if (i < steps - 1) pts.push(`V${h}`);
    }
    pts.push(`V${h} Z`);
  }
  return pts.join(" ");
}

function buildStripOutline(width: number): string {
  const steps = Math.max(1, Math.round(width / TOOTH_STEP));
  const step = width / steps;
  const diag = step * TOOTH_DIAG_FRAC;
  const h = TOOTH_H;
  const pts: string[] = [];

  pts.push(`M0,${h}`);
  for (let i = 0; i < steps; i++) {
    const x = i * step;
    pts.push(`L${x + diag},0 H${x + step}`);
    if (i < steps - 1) pts.push(`V${h}`);
  }
  pts.push(`V${GAP}`);
  for (let i = steps - 1; i >= 0; i--) {
    const x = i * step;
    pts.push(`H${x + diag} L${x},${GAP - h}`);
    if (i > 0) pts.push(`V${GAP}`);
  }
  pts.push(`Z`);
  return pts.join(" ");
}

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function RipOffIntro({ onComplete }: SplashProps) {
  const [visible, setVisible] = useState(true);
  const [winW, setWinW] = useState(window.innerWidth);
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const perfRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const introSpanRef = useRef<HTMLSpanElement>(null);
  const fallbackSpanRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const box = textBoxRef.current;
    const intro = introSpanRef.current;
    const tap = box?.firstElementChild as HTMLElement;
    if (!box || !intro || !tap) return;
    const fallback = fallbackSpanRef.current;
    intro.style.display = "";
    if (fallback) fallback.style.display = "none";
    if (tap.offsetWidth + intro.offsetWidth + 40 > box.clientWidth) {
      intro.style.display = "none";
      if (fallback) fallback.style.display = "";
    }
  }, [winW]);

  const handleStart = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const container = containerRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const cover = coverRef.current;
    const perf = perfRef.current;
    const shadow = shadowRef.current;
    if (!container || !top || !bottom || !cover) return;

    const w = window.innerWidth;
    const halfGap = GAP / 2 - 1;
    const wideHalfGap = halfGap + WIDEN_AMOUNT / 2;
    const h = (g: number) => `calc(50% - ${g}px)`;

    container.style.cursor = "default";
    if (perf) perf.style.display = "none";
    cover.style.zIndex = "3";

    if (shadow) {
      shadow.style.top = h(halfGap);
      shadow.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, fill: "forwards" });
    }
    top.style.height = h(halfGap);
    bottom.style.height = h(halfGap);

    // Phase 1: tear — cover slides right
    const tearAnim = cover.animate(
      [{ transform: "translateX(0)" }, { transform: `translateX(${w}px)` }],
      { duration: 1200, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", fill: "forwards" },
    );

    tearAnim.onfinish = () => {
      cover.style.display = "none";

      // Phase 2: widen gap
      const widenKf = [{ height: h(halfGap) }, { height: h(wideHalfGap) }];
      const widenOpts: KeyframeAnimationOptions = { duration: 800, easing: EASE, fill: "forwards" };
      const widenAnim = top.animate(widenKf, widenOpts);
      bottom.animate(widenKf, widenOpts);
      if (shadow) {
        shadow.animate(
          [{ top: h(halfGap) }, { top: h(wideHalfGap) }],
          widenOpts,
        );
      }

      widenAnim.onfinish = () => {
        // Phase 3: slide halves away
        setTimeout(() => {
          const slideOpts: KeyframeAnimationOptions = { duration: 850, easing: EASE, fill: "forwards" };
          const slideAnim = top.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
            slideOpts,
          );
          bottom.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
            slideOpts,
          );
          if (shadow) {
            shadow.animate(
              [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-100vh)", opacity: 0 }],
              slideOpts,
            );
          }
          slideAnim.onfinish = () => {
            setVisible(false);
            onComplete();
          };
        }, 400);
      };
    };
  }, [onComplete]);

  if (!visible) return null;

  const topEdge = buildZigzagPath(winW, "down");
  const bottomEdge = buildZigzagPath(winW, "up");
  const perfOutline = buildStripOutline(winW);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, zIndex: 9999, cursor: "pointer", overflow: "hidden" }}
      onClick={handleStart}
    >
      {/* Shadow gradient */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute", top: "50%", left: 0, width: "100%", height: "5px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
          zIndex: 1, opacity: 0, pointerEvents: "none",
        }}
      />

      {/* Top half */}
      <div ref={topRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", zIndex: 2 }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#fafafa" }} />
        <svg
          style={{ position: "absolute", bottom: -TOOTH_H + 1, left: 0, width: "100%", height: TOOTH_H, overflow: "visible" }}
          viewBox={`0 0 ${winW} ${TOOTH_H}`}
          preserveAspectRatio="none"
        >
          <path d={topEdge} fill="#fafafa" />
        </svg>
      </div>

      {/* Bottom half */}
      <div ref={bottomRef} style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "50%", zIndex: 2 }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#fafafa" }} />
        <svg
          style={{ position: "absolute", top: -TOOTH_H + 1, left: 0, width: "100%", height: TOOTH_H, overflow: "visible" }}
          viewBox={`0 0 ${winW} ${TOOTH_H}`}
          preserveAspectRatio="none"
        >
          <path d={bottomEdge} fill="#fafafa" />
        </svg>
      </div>

      {/* Cover strip */}
      <div
        ref={coverRef}
        style={{
          position: "absolute", top: `calc(50% - ${GAP / 2 + TOOTH_H}px)`, left: 0,
          width: "100%", height: GAP + TOOTH_H * 2, backgroundColor: "#fafafa", zIndex: 1,
        }}
      />

      {/* Perforation + text */}
      <div
        ref={perfRef}
        style={{ position: "absolute", top: "50%", left: 0, right: 0, height: GAP, transform: "translateY(-50%)", zIndex: 4 }}
      >
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          viewBox={`0 0 ${winW} ${GAP}`}
          preserveAspectRatio="none"
        >
          <path d={perfOutline} fill="none" stroke="#DFDFDF" strokeWidth="0.8" strokeDasharray="10 10" />
        </svg>
        <div
          ref={textBoxRef}
          style={{
            position: "absolute", left: "clamp(20px, 4vw, 56px)", right: "clamp(20px, 4vw, 56px)",
            top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span style={TEXT_STYLE}>Tap &amp; take a peek!</span>
          <span ref={introSpanRef} style={TEXT_STYLE}>{INTRO_TEXT}</span>
          <span ref={fallbackSpanRef} style={{ ...TEXT_STYLE, display: "none" }}>EUNJE HEO</span>
        </div>
      </div>
    </div>
  );
}
