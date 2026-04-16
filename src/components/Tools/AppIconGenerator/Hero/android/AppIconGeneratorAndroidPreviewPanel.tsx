import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import type { AndroidIconConfig, BackgroundLayerConfig, ForegroundLayerConfig } from "./AppIconGeneratorAndroidTypes";

// ─── Constants ────────────────────────────────────────────────────────────────

// Android adaptive icon: 108dp total, 66dp safe zone
const SAFE_ZONE_RATIO = 66 / 108; // ≈ 0.611

const DENSITY_SCALE: Record<string, number> = {
  mdpi: 0.5,
  hdpi: 0.75,
  xhdpi: 1,
  xxhdpi: 1.5,
  xxxhdpi: 2,
};

// ─── Squircle clip path (objectBoundingBox, 0-1 coords) ───────────────────────
// Android adaptive icon squircle: superellipse approximation with cubic beziers
// Control points at 0.1 from each edge corner create curved sides characteristic
// of the Android squircle shape.
const SQUIRCLE_PATH =
  "M 0.5,0 C 0.1,0 0,0.1 0,0.5 C 0,0.9 0.1,1 0.5,1 C 0.9,1 1,0.9 1,0.5 C 1,0.1 0.9,0 0.5,0 Z";

// ─── Shape definitions ────────────────────────────────────────────────────────

type ShapeClip =
  | { kind: "borderRadius"; value: string }
  | { kind: "squircle" }
  | { kind: "clipPath"; value: string };

type PreviewShape = {
  key: string;
  label: string;
  baseSize: number;
  clip: ShapeClip;
  monochrome?: boolean;
};

const PREVIEW_SHAPES: PreviewShape[] = [
  { key: "circle",     label: "Circle",        baseSize: 72, clip: { kind: "borderRadius", value: "50%" } },
  { key: "squircle",   label: "Squircle",      baseSize: 72, clip: { kind: "squircle" } },
  { key: "rounded",    label: "Rounded Square", baseSize: 72, clip: { kind: "borderRadius", value: "16.67%" } },
  { key: "square",     label: "Square",        baseSize: 72, clip: { kind: "borderRadius", value: "0" } },
  { key: "full-bleed", label: "Full Bleed",    baseSize: 72, clip: { kind: "borderRadius", value: "5%" } },
  { key: "monochrome", label: "Monochrome",    baseSize: 72, clip: { kind: "borderRadius", value: "50%" }, monochrome: true },
  { key: "legacy",     label: "Legacy",        baseSize: 54, clip: { kind: "borderRadius", value: "20%" } },
  { key: "round",      label: "Round",         baseSize: 54, clip: { kind: "borderRadius", value: "50%" } },
  { key: "play-store", label: "Play Store",    baseSize: 80, clip: { kind: "borderRadius", value: "17.5%" } },
];

// ─── Text renderer (single-line, scales down to fit) ─────────────────────────

const TextPreviewLayer: React.FC<{
  asset: { text: string; font: string; color: string; fontStyle?: string };
  size: number;
}> = ({ asset, size }) => {
  const textRef = React.useRef<SVGTextElement>(null);
  const [scale, setScale] = React.useState(1);

  const font =
    asset.font === "System Default" || !asset.font
      ? "system-ui, sans-serif"
      : `"${asset.font}", sans-serif`;
  const fontWeight = asset.fontStyle === "bold" ? "bold" : "normal";
  const fontStyleCss = asset.fontStyle === "italic" ? "italic" : "normal";
  const fontSize = size * 0.45;
  const maxWidth = size * 0.88;

  React.useLayoutEffect(() => {
    if (!textRef.current) return;
    try {
      const w = textRef.current.getBBox().width;
      setScale(w > maxWidth ? maxWidth / w : 1);
    } catch {
      setScale(1);
    }
  }, [asset.text, asset.font, asset.fontStyle, fontSize, maxWidth]);

  return (
    <svg
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      width={size}
      height={size}
    >
      <text
        ref={textRef}
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={asset.color}
        style={{
          fontSize,
          fontFamily: font,
          fontWeight,
          fontStyle: fontStyleCss,
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: `scale(${scale})`,
        }}
      >
        {asset.text || "A"}
      </text>
    </svg>
  );
};

// ─── Foreground renderer ──────────────────────────────────────────────────────

const ForegroundLayer: React.FC<{
  config: ForegroundLayerConfig;
  size: number;
}> = ({ config, size }) => {
  const { asset, resize } = config;
  const fgContainerSize = size * SAFE_ZONE_RATIO * (resize / 100);
  const offset = (size - fgContainerSize) / 2;

  const style: React.CSSProperties = {
    position: "absolute",
    left: offset,
    top: offset,
    width: fgContainerSize,
    height: fgContainerSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  if (asset.type === "image") {
    if (!asset.previewUrl) return null;
    return (
      <Box style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset.previewUrl} alt="fg" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </Box>
    );
  }

  if (asset.type === "clipart") {
    if (!asset.svgString) return null;
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(asset.svgString)}`;
    return (
      <Box style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUrl} alt="clipart" style={{ width: "85%", height: "85%", objectFit: "contain" }} />
      </Box>
    );
  }

  if (asset.type === "text") {
    return (
      <Box style={{ ...style, overflow: "visible" }}>
        <TextPreviewLayer asset={asset} size={fgContainerSize} />
      </Box>
    );
  }

  return null;
};

// ─── Background renderer ──────────────────────────────────────────────────────

const BackgroundLayer: React.FC<{
  config: BackgroundLayerConfig;
  size: number;
}> = ({ config, size }) => {
  const { asset } = config;
  const style: React.CSSProperties = { position: "absolute", inset: 0, width: size, height: size };

  if (asset.type === "color") {
    return <Box style={{ ...style, backgroundColor: asset.color }} />;
  }

  if (asset.type === "image" && asset.previewUrl) {
    return (
      <Box style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset.previewUrl} alt="bg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Box>
    );
  }

  return <Box style={{ ...style, background: "linear-gradient(135deg, #667eea, #764ba2)" }} />;
};

// ─── Safe zone overlay ────────────────────────────────────────────────────────

const SafeZoneOverlay: React.FC<{ size: number }> = ({ size }) => {
  const szSize = size * SAFE_ZONE_RATIO;
  const offset = (size - szSize) / 2;
  return (
    <Box
      style={{
        position: "absolute",
        left: offset,
        top: offset,
        width: szSize,
        height: szSize,
        border: "1px dashed rgba(255,255,255,0.7)",
        pointerEvents: "none",
        boxSizing: "border-box",
      }}
    />
  );
};

// ─── Grid overlay (Android Studio keylines) ───────────────────────────────────

const GridOverlay: React.FC<{ size: number }> = ({ size }) => {
  const stroke = "rgba(255,255,255,0.45)";
  const m = size / 2;
  // Keyline circle diameter = safe zone
  const r = (size * SAFE_ZONE_RATIO) / 2;
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      width={size}
      height={size}
    >
      {/* Center crosshair */}
      <line x1={m} y1={0} x2={m} y2={size} stroke={stroke} strokeWidth={0.75} strokeDasharray="2 2" />
      <line x1={0} y1={m} x2={size} y2={m} stroke={stroke} strokeWidth={0.75} strokeDasharray="2 2" />
      {/* Keyline circle */}
      <circle cx={m} cy={m} r={r} fill="none" stroke={stroke} strokeWidth={0.75} strokeDasharray="3 2" />
      {/* Keyline square (safe zone) */}
      <rect
        x={m - r}
        y={m - r}
        width={r * 2}
        height={r * 2}
        fill="none"
        stroke={stroke}
        strokeWidth={0.75}
        strokeDasharray="3 2"
      />
    </svg>
  );
};

// ─── Single preview cell ──────────────────────────────────────────────────────

const PreviewCell: React.FC<{
  shape: PreviewShape;
  config: AndroidIconConfig;
  scale: number;
  showSafeZone: boolean;
  showGrid: boolean;
}> = ({ shape, config, scale, showSafeZone, showGrid }) => {
  const size = Math.round(shape.baseSize * scale);
  const { clip, monochrome } = shape;

  let clipStyle: React.CSSProperties = {};
  if (clip.kind === "borderRadius") {
    clipStyle = { borderRadius: clip.value };
  } else if (clip.kind === "squircle") {
    clipStyle = { clipPath: "url(#android-squircle-clip)" };
  }

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    ...clipStyle,
    ...(monochrome ? { filter: "grayscale(1) contrast(1.1)" } : {}),
  };

  return (
    <VStack gap={1.5} align="center">
      <Box style={containerStyle}>
        <BackgroundLayer config={config.background} size={size} />
        <ForegroundLayer config={config.foreground} size={size} />
        {showSafeZone && <SafeZoneOverlay size={size} />}
        {showGrid && <GridOverlay size={size} />}
      </Box>
      <Text fontSize="10px" color="fg.muted" textAlign="center" lineClamp={1}>
        {shape.label}
      </Text>
    </VStack>
  );
};

// ─── Panel ────────────────────────────────────────────────────────────────────

export interface AppIconGeneratorAndroidPreviewPanelProps {
  config: AndroidIconConfig;
  previewDensity?: string;
  showSafeZone?: boolean;
  showGrid?: boolean;
}

const AppIconGeneratorAndroidPreviewPanel: React.FC<AppIconGeneratorAndroidPreviewPanelProps> = ({
  config,
  previewDensity = "xhdpi",
  showSafeZone = false,
  showGrid = false,
}) => {
  const scale = DENSITY_SCALE[previewDensity] ?? 1;

  return (
    <VStack align="stretch" gap={4}>
      {/* Squircle clip-path definition — hidden, referenced by ID */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden>
        <defs>
          <clipPath id="android-squircle-clip" clipPathUnits="objectBoundingBox">
            <path d={SQUIRCLE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <Text fontSize="sm" fontWeight="600">{"Live Preview"}</Text>
      <SimpleGrid columns={3} gap={4} justifyItems="center">
        {PREVIEW_SHAPES.map((shape) => (
          <PreviewCell
            key={shape.key}
            shape={shape}
            config={config}
            scale={scale}
            showSafeZone={showSafeZone}
            showGrid={showGrid}
          />
        ))}
      </SimpleGrid>
      <Text fontSize="10px" color="fg.subtle" textAlign="center">
        {"Preview is approximate. Safe zone = 61% of canvas."}
      </Text>
    </VStack>
  );
};

export default AppIconGeneratorAndroidPreviewPanel;
