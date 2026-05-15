import { css } from "styled-system/css";
import { skeleton } from "styled-system/recipes";
import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { useIsInteractive } from "@/hooks/useIsInteractive";

const SIZE_PX: Record<string, string> = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "28px",
  "2xl": "32px",
  "3xl": "40px",
  "4xl": "48px",
};

function resolveSize(size?: unknown): string {
  if (!size || typeof size === "object") return "1em";
  const s = String(size);
  return SIZE_PX[s] ?? s;
}

function tokenToVar(token: string): string {
  return `var(--colors-${token.replace(/\./g, "-")})`;
}

export type DeferredIconProps = {
  icon: IconType;
  size?: string | number;
  color?: string;
  colorPalette?: string;
  boxSize?: number | string | { base?: number; md?: number; lg?: number };
  className?: string;
  flexShrink?: number;
  mt?: number;
};

const DeferredIcon: React.FC<DeferredIconProps> = ({
  icon: IconComponent,
  size,
  color,
  colorPalette,
  boxSize,
  className,
  flexShrink,
  mt,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (!isInteractive) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInteractive]);

  const resolvedBoxSize = boxSize && typeof boxSize === "object"
    ? (boxSize.md ?? boxSize.base ?? 5)
    : boxSize;
  const effectiveSize = resolvedBoxSize
    ? `${Number(resolvedBoxSize) * 4}px`
    : resolveSize(size);

  const colorStyle: React.CSSProperties = colorPalette
    ? { color: "var(--colors-color-palette-fg)" }
    : color
    ? { color: tokenToVar(color) }
    : {};

  const extraStyle: React.CSSProperties = {
    ...(flexShrink !== undefined ? { flexShrink } : {}),
    ...(mt !== undefined ? { marginTop: `${mt * 0.25}rem` } : {}),
  };

  if (!ready) {
    return (
      <span
        ref={ref}
        className={css({ display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 })}
        style={{ width: effectiveSize, height: effectiveSize }}
      >
        <span
          className={skeleton()}
          style={{ width: effectiveSize, height: effectiveSize }}
        />
      </span>
    );
  }

  return (
    <IconComponent
      style={{ width: effectiveSize, height: effectiveSize, flexShrink: 0, ...colorStyle, ...extraStyle }}
      className={className}
    />
  );
};

export default DeferredIcon;
