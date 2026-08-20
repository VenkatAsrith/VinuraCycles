import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useId,
} from "react";
import type { FC, PointerEvent } from "react";

interface LinearLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  interactive?: boolean;
}

export const LinearLoop: FC<LinearLoopProps> = ({
  marqueeText = "",
  speed = 1.5,
  className,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0\u00A0\u00A0"
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const tspansRef = useRef<SVGTSpanElement[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);

  const [pathLength, setPathLength] = useState(0);
  const [spacing, setSpacing] = useState(0);

  const uid = useId();
  const pathId = `linear-path-${uid}`;
  const pathD = "M-200,90 L1640,90";

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (!spacing) return;

    let frame: number;
    const step = () => {
      tspansRef.current.forEach((t) => {
        if (!t) return;
        let x = parseFloat(t.getAttribute("x") || "0");

        if (!dragRef.current) {
          const delta =
            dirRef.current === "right" ? Math.abs(speed) : -Math.abs(speed);
          x += delta;
        }

        const totalWidth = tspansRef.current.length * spacing;
        if (x < -spacing) {
          x = x + totalWidth;
        }
        if (x > totalWidth - spacing) {
          x = x - totalWidth;
        }

        t.setAttribute("x", x.toString());
      });
      frame = requestAnimationFrame(step);
    };

    step();

    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  const repeats =
    pathLength && spacing ? Math.ceil(pathLength / spacing) + 2 : 0;
  const ready = pathLength > 0 && spacing > 0;

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    tspansRef.current.forEach((t) => {
      if (!t) return;
      let x = parseFloat(t.getAttribute("x") || "0");
      x += dx;

      const totalWidth = tspansRef.current.length * spacing;
      if (x < -spacing) {
        x = x + totalWidth;
      }
      if (x > totalWidth - spacing) {
        x = x - totalWidth;
      }

      t.setAttribute("x", x.toString());
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (Math.abs(velRef.current) > 1) {
      dirRef.current = velRef.current > 0 ? "right" : "left";
    }
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="w-full select-none"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="w-full overflow-visible block text-[6.5rem] font-black uppercase leading-none font-display opacity-[0.035] select-none pointer-events-auto"
        viewBox="0 0 1440 160"
        style={{
          stroke: '#ffffff',
          strokeWidth: '1.2px',
          fill: 'transparent'
        }}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={className}>
            <textPath href={`#${pathId}`} xmlSpace="preserve">
              {Array.from({ length: repeats }).map((_, i) => (
                <tspan
                  key={i}
                  x={i * spacing}
                  ref={(el) => {
                    if (el) tspansRef.current[i] = el;
                  }}
                >
                  {text}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

interface MarqueeTextProps {
  text: string;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({ text }) => {
  return (
    <div className="w-full overflow-hidden select-none pointer-events-none">
      <LinearLoop
        marqueeText={text}
        speed={0.8}
        direction="left"
        interactive={true}
      />
    </div>
  );
};

export default MarqueeText;
