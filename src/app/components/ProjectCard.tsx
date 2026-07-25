import { useState, useRef, useCallback, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

/** 이미지 또는 영상을 상황에 맞게 렌더링 */
function ThumbMedia({ src, alt, className, style, onLoad }: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => void;
}) {
  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={style}
        onLoadedMetadata={onLoad as React.ReactEventHandler<HTMLVideoElement>}
      />
    );
  }
  return (
    <ImageWithFallback
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={onLoad as React.ReactEventHandler<HTMLImageElement>}
    />
  );
}

interface ProjectCardProps {
  year: string;
  projectName: string;
  type: string;
  tags: string[];
  image: string;
  award?: boolean;
  wip?: boolean;
  variant?: "row" | "grid";
  forceFlipped?: boolean;
  flipDelay?: number;
  activeFilter?: string;
  isMobile?: boolean;
  /** Called when the grid card is clicked (desktop only) */
  onProjectClick?: () => void;
  keyColor?: string;
}

/* Maps filter labels to the tag substrings they match */
const filterTagMap: Record<string, string[]> = {
  "Brand Identity": ["Brand Identity"],
  "Editorial": ["Editorial"],
  "Graphic": ["Graphic"],
  "Space": ["Space"],
  "Interface": ["Interface"],
  "Package": ["Package"],
  "Web": ["Web"],
};

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

export function ProjectCard({ year, projectName, type, tags, image, award = false, wip = false, variant = "row", forceFlipped = false, flipDelay = 0, activeFilter = "All", isMobile = false, onProjectClick, keyColor }: ProjectCardProps) {
  const [isHoverFlipped, setIsHoverFlipped] = useState(false);
  const [delayedForceFlip, setDelayedForceFlip] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [mobileFlipState, setMobileFlipState] = useState<"idle" | "black" | "flipped">(forceFlipped ? "black" : "idle");
  const [mobileTransition, setMobileTransition] = useState(false);
  const [imgRatio, setImgRatio] = useState("16/9");
  const [wipHovered, setWipHovered] = useState(false);
  const [wipTapped, setWipTapped] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    const el = e.currentTarget;
    if (el instanceof HTMLVideoElement) {
      if (el.videoWidth && el.videoHeight) {
        setImgRatio(`${el.videoWidth}/${el.videoHeight}`);
      }
    } else {
      if (el.naturalWidth && el.naturalHeight) {
        setImgRatio(`${el.naturalWidth}/${el.naturalHeight}`);
      }
    }
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const isFlipped = delayedForceFlip || isHoverFlipped;

  const isTagHighlighted = (tag: string) => {
    if (activeFilter === "All") return false;
    const matchTags = filterTagMap[activeFilter];
    if (!matchTags) return false;
    return matchTags.some((mt) => tag.toLowerCase().includes(mt.toLowerCase()));
  };

  // Handle forceFlipped with staggered delay
  useEffect(() => {
    if (forceFlipped) {
      const t = setTimeout(() => {
        if (keyColor) {
          setSpinCount(c => c + 1);
        } else {
          setDelayedForceFlip(true);
          setShowImage(true);
          const t1 = setTimeout(() => setShowTags(true), 200 + flipDelay * 0.3);
          const t2 = setTimeout(() => setShowInfo(true), 350 + flipDelay * 0.3);
          timeoutsRef.current.push(t1, t2);
        }
      }, flipDelay);
      timeoutsRef.current.push(t);
    } else {
      if (!keyColor) {
        setDelayedForceFlip(false);
        setShowInfo(false);
        setShowTags(false);
        setShowImage(false);
      }
    }
  }, [forceFlipped, flipDelay, keyColor]);

  const generateParticles = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const newParticles: Particle[] = [];

    for (let i = 0; i < 30; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, vx = 0, vy = 0;
      switch (edge) {
        case 0: x = Math.random() * rect.width; y = 0; vx = (Math.random() - 0.5) * 2; vy = -(Math.random() * 1.5 + 0.5); break;
        case 1: x = rect.width; y = Math.random() * rect.height; vx = Math.random() * 1.5 + 0.5; vy = (Math.random() - 0.5) * 2; break;
        case 2: x = Math.random() * rect.width; y = rect.height; vx = (Math.random() - 0.5) * 2; vy = Math.random() * 1.5 + 0.5; break;
        case 3: x = 0; y = Math.random() * rect.height; vx = -(Math.random() * 1.5 + 0.5); vy = (Math.random() - 0.5) * 2; break;
      }
      newParticles.push({ id: particleIdRef.current++, x, y, vx, vy, opacity: 0.4 + Math.random() * 0.3, size: 1 + Math.random() * 3 });
    }
    setParticles(newParticles);
    let frame = 0;
    const animate = () => {
      frame++;
      setParticles(prev => prev.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, opacity: p.opacity - 0.008 })).filter(p => p.opacity > 0));
      if (frame < 60) animFrameRef.current = requestAnimationFrame(animate);
      else setParticles([]);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const handleActivate = () => {
    if (isMobile || isFlipped) return;
    setIsHoverFlipped(true);
    generateParticles();
    const t1 = setTimeout(() => setShowTags(true), 200);
    const t2 = setTimeout(() => setShowInfo(true), 350);
    setShowImage(true);
    timeoutsRef.current = [t1, t2];
  };

  const handleDeactivate = () => {
    if (isMobile || forceFlipped || delayedForceFlip) return;
    setIsHoverFlipped(false);
    setShowInfo(false);
    setShowTags(false);
    setShowImage(false);
    setImageOffset({ x: 0, y: 0 });
    setCursorPos(null);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setParticles([]);
    timeoutsRef.current.forEach(clearTimeout);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Track cursor position relative to the card for the award badge
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (!isFlipped) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setImageOffset({
      x: -((e.clientX - centerX) / rect.width) * 12,
      y: -((e.clientY - centerY) / rect.height) * 12,
    });
  };

  // Mobile: manage flip animation states
  useEffect(() => {
    if (!isMobile) return;

    if (forceFlipped) {
      // Step 1: Instantly show black (no transition)
      setMobileTransition(false);
      setMobileFlipState("black");

      // Step 2: After a brief moment, enable transition and flip to reveal image
      const t = setTimeout(() => {
        setMobileTransition(true);
        setMobileFlipState("flipped");
      }, flipDelay + 100); // small extra delay so black is visible

      return () => clearTimeout(t);
    } else {
      // Going back to Home — show content directly, no animation
      setMobileTransition(false);
      setMobileFlipState("idle");
    }
  }, [isMobile, forceFlipped, flipDelay]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  /* ═══ Mobile card layout — flip from black on Projects, direct show on Home ═══ */
  if (isMobile) {
    // "idle" = Home page, show image directly (no 3D flip)
    // "black" = just entered Projects, showing black front
    // "flipped" = animating to reveal image
    const isIdle = mobileFlipState === "idle";
    const isFlippedOrIdle = mobileFlipState === "flipped" || isIdle;

    return (
      <div className="w-full" style={{ perspective: "1200px" }}>
        {/* Flip container */}
        <div
          className="w-full relative"
          style={{ aspectRatio: imgRatio, borderRadius: "2px", overflow: "hidden", cursor: onProjectClick ? "pointer" : "default" }}
          onClick={wip ? undefined : onProjectClick}
        >
          {isIdle ? (
            /* Home page — show image directly, no 3D flip */
            <div className="w-full h-full relative overflow-hidden bg-[#d9d9d9]">
              <ThumbMedia
                src={image}
                alt={projectName}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.9 }}
                onLoad={handleImageLoad}
              />
            </div>
          ) : (
            /* Projects page — 3D flip */
            <div
              className="w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: keyColor
                  ? `rotateX(${-360 * spinCount}deg)`
                  : (mobileFlipState === "flipped" ? "rotateX(-180deg)" : "rotateX(0deg)"),
                transition: mobileTransition || (keyColor && spinCount > 0) ? `transform ${keyColor ? "0.8s" : "1.2s"} ease-out` : "none",
              }}
            >
              {/* Front — thumbnail image */}
              <div
                className="absolute inset-0 overflow-hidden bg-[#d9d9d9]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <ThumbMedia
                  src={image}
                  alt={projectName}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.9 }}
                  onLoad={handleImageLoad}
                />
              </div>
              {/* Back — key color or image */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                  backgroundColor: keyColor || "#d9d9d9",
                }}
              >
                {!keyColor && (
                  <ThumbMedia
                    src={image}
                    alt={projectName}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                    onLoad={handleImageLoad}
                  />
                )}
              </div>
            </div>
          )}

          {/* WIP overlay — dim + always show text, block clicks */}
          {wip && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 20 }}
            >
              <span
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                WORK IN PROGRESS
              </span>
            </div>
          )}
        </div>

        {/* Info below image — centered */}
        <div
          className="flex flex-col items-center py-[12px]"
          style={{
            gap: "2px",
            opacity: isFlippedOrIdle ? 1 : 0,
            transition: mobileTransition ? "opacity 0.3s ease 0.3s" : "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16.363px",
              letterSpacing: "-0.06px",
              color: "#888",
              textAlign: "center",
            }}
          >
            {type}
          </span>
          <span
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16.363px",
              letterSpacing: "-0.06px",
              color: "#262626",
              textAlign: "center",
            }}
          >
            {projectName}
          </span>
        </div>
      </div>
    );
  }

  /* ═══ Grid variant (2-column layout) ═══ */
  if (variant === "grid") {
    return (
      <div
        ref={cardRef}
        className="relative w-full overflow-hidden"
        style={{
          perspective: "1200px",
          aspectRatio: imgRatio,
          borderRadius: "2px",
          cursor: wip ? "default" : "pointer",
        }}
        onMouseEnter={wip ? () => { handleActivate(); setWipHovered(true); } : handleActivate}
        onMouseLeave={wip ? () => { handleDeactivate(); setWipHovered(false); } : handleDeactivate}
        onMouseMove={handleMouseMove}
        onClick={wip ? undefined : onProjectClick}
      >
        {/* Award badge following cursor */}
        {award && isHoverFlipped && cursorPos && (
          <div
            className="absolute pointer-events-none z-40"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: "translate(14px, 14px)",
              backgroundColor: "#00F77B",
              padding: "4px 10px",
              borderRadius: "999px",
              fontFamily: "'Switzer', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#000",
              whiteSpace: "nowrap",
            }}
          >
            Award
          </div>
        )}

        {/* 3D flip container (WIP도 동일하게 플립) */}
        <div
          className="w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: keyColor
              ? `rotateX(${-360 * spinCount}deg)`
              : (isFlipped ? "rotateX(-180deg)" : "rotateX(0deg)"),
            transition: `transform ${keyColor ? "0.8s" : "0.7s"} ease-out`,
          }}
        >
          {/* FRONT: thumbnail image */}
          <div
            className="absolute inset-0 overflow-hidden bg-[#d9d9d9]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <ThumbMedia
              src={image}
              alt={projectName}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={handleImageLoad}
            />
          </div>
          {/* BACK: key color or thumbnail */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)", backgroundColor: keyColor || "#d9d9d9" }}
          >
            {!keyColor && (
              <>
                <div className="absolute inset-0 bg-[#d9d9d9]" />
                <ThumbMedia
                  src={image}
                  alt={projectName}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: "scale(1)" }}
                  onLoad={handleImageLoad}
                />
              </>
            )}
            {wip && !keyColor && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: wipHovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
                  transition: "background-color 0.25s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "white",
                    opacity: wipHovered ? 1 : 0,
                    transition: "opacity 0.25s ease",
                  }}
                >
                  WORK IN PROGRESS
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ═══ Desktop card layout (original row layout) ═══ */
  return (
    <div
      ref={cardRef}
      className="relative w-full cursor-pointer overflow-visible"
      style={{ perspective: "1200px", height: "366px" }}
      onMouseEnter={handleActivate}
      onMouseLeave={handleDeactivate}
      onClick={handleActivate}
      onMouseMove={handleMouseMove}
    >
      {/* Award badge — follows cursor while hovering this card */}
      {award && isHoverFlipped && cursorPos && (
        <div
          className="absolute pointer-events-none z-40"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(14px, 14px)",
            backgroundColor: "#00F77B",
            padding: "4px 10px",
            borderRadius: "999px",
            fontFamily: "'Switzer', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: "#000",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s ease",
          }}
        >
          Award
        </div>
      )}

      {/* Chalk dust particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-30"
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size,
            backgroundColor: `rgba(255,255,255,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,${p.opacity * 0.5})`,
          }}
        />
      ))}

      {/* 3D flip container */}
      <div
        className="w-full h-full ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(-180deg)" : "rotateX(0deg)",
          transition: `transform 0.7s ease-out ${forceFlipped && delayedForceFlip ? "0ms" : "0ms"}`,
        }}
      >
        {/* ===== FRONT: Black card ===== */}
        <div
          className="absolute inset-0 bg-black"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1.3px] bg-black" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.3px] bg-black" />
          <div
            className="absolute w-[1.3px] bg-[rgba(255,255,255,0.3)]"
            style={{ left: "calc(100% - 651px)", top: 0, bottom: 0 }}
          />
          {/* removed extra border overlay */}

          <div className="absolute top-0 left-0 bottom-0" style={{ width: "calc(100% - 651px)" }}>
            <div
              className="absolute left-[16px] flex flex-col gap-[8px]"
              style={{ top: "16px" }}
            >
              <span
                className="text-[#bababa]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400 }}
              >
                {projectName}
              </span>
              <span
                className="text-[#bababa]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400, opacity: 0.7 }}
              >
                {year}
              </span>
              <span
                className="text-[#bababa]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400, opacity: 0.7 }}
              >
                {type}
              </span>
            </div>

            <div className="absolute left-[16px] right-[16px] bottom-[16px] flex flex-wrap gap-[8px] items-center">
              {tags.map((tag, i) => {
                const highlighted = isTagHighlighted(tag);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center px-[10px] py-[4px] rounded-full"
                    style={{
                      border: highlighted ? "1.3px solid white" : "1.3px solid #bababa",
                      backgroundColor: highlighted ? "rgba(255,255,255,0.12)" : "transparent",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      className="whitespace-nowrap"
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "16px",
                        lineHeight: "20.8px",
                        letterSpacing: "-0.076px",
                        color: highlighted ? "white" : "#bababa",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== BACK: White card with content ===== */}
        <div
          className="absolute inset-0 bg-white overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1.3px] bg-black z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-[1.3px] bg-black z-20" />
          <div className="absolute top-0 bottom-0 w-[1.3px] bg-black z-20" style={{ left: "calc(100% - 651px)" }} />

          <div className="absolute top-0 left-0 bottom-0" style={{ width: "calc(100% - 651px)" }}>
            <div
              className="absolute left-[16px] flex flex-col gap-[6px] transition-all duration-500"
              style={{
                top: "16px",
                opacity: showInfo ? 1 : 0,
                transform: showInfo ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <span
                className="text-[#262626]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400 }}
              >
                {projectName}
              </span>
              <span
                className="text-[#262626]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400, opacity: 0.7 }}
              >
                {year}
              </span>
              <span
                className="text-[#262626]"
                style={{ fontFamily: "'Switzer', sans-serif", fontSize: "20px", lineHeight: "21px", letterSpacing: "-0.076px", fontWeight: 400, opacity: 0.7 }}
              >
                {type}
              </span>
            </div>

            <div
              className="absolute left-[16px] right-[16px] bottom-[16px] flex flex-wrap gap-[8px] items-center transition-all duration-500"
              style={{
                opacity: showTags ? 1 : 0,
                transform: showTags ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {tags.map((tag, i) => {
                const highlighted = isTagHighlighted(tag);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center px-[10px] py-[4px] rounded-full"
                    style={{
                      border: highlighted ? "1.3px solid #d0d0d0" : "1.3px solid #d0d0d0",
                      backgroundColor: highlighted ? "#d0d0d0" : "transparent",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      className="whitespace-nowrap"
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "16px",
                        lineHeight: "20.8px",
                        letterSpacing: "-0.076px",
                        color: highlighted ? "#333" : "#262626",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 right-0 overflow-hidden"
            style={{ left: "calc(100% - 651px + 1.3px)" }}
          >
            <div className="absolute inset-0 bg-[#d9d9d9]" />
            <ThumbMedia
              src={image}
              alt={projectName}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-out"
              style={{
                transform: "scale(1)",
                opacity: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
