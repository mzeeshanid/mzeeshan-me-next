import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import type { BackgroundLayerConfig, ForegroundLayerConfig } from "../android/AppIconGeneratorAndroidTypes";
import type { IosCustomConfig } from "./AppIconGeneratorIosTypes";

// iOS home screen icon: safe zone ~80%, corner radius ~22.5%
const IOS_SAFE_ZONE_RATIO = 0.8;

export interface AppIconGeneratorIosPreviewPanelProps {
  config: IosCustomConfig;
  showSafeZone?: boolean;
  showGrid?: boolean;
}

// ─── Background layer ─────────────────────────────────────────────────────────

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
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset.previewUrl} alt="bg" style={{ ...style, objectFit: "cover" }} />
    );
  }
  return <Box style={{ ...style, background: "linear-gradient(135deg, #667eea, #764ba2)" }} />;
};

// ─── Text layer (single-line, scales to fit) ──────────────────────────────────

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
          transformBox: "fill-box" as React.CSSProperties["transformBox"],
          transformOrigin: "center",
          transform: `scale(${scale})`,
        }}
      >
        {asset.text || "A"}
      </text>
    </svg>
  );
};

// ─── Foreground layer ─────────────────────────────────────────────────────────

const ForegroundLayer: React.FC<{
  config: ForegroundLayerConfig;
  size: number;
}> = ({ config, size }) => {
  const { asset, resize } = config;
  const fgSize = size * IOS_SAFE_ZONE_RATIO * (resize / 100);
  const offset = (size - fgSize) / 2;

  const style: React.CSSProperties = {
    position: "absolute",
    left: offset,
    top: offset,
    width: fgSize,
    height: fgSize,
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
        <img
          src={asset.previewUrl}
          alt="fg"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    );
  }

  if (asset.type === "clipart") {
    if (!asset.svgString) return null;
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(asset.svgString)}`;
    return (
      <Box style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt="clipart"
          style={{ width: "85%", height: "85%", objectFit: "contain" }}
        />
      </Box>
    );
  }

  if (asset.type === "text") {
    return (
      <Box style={{ ...style, overflow: "visible" }}>
        <TextPreviewLayer asset={asset} size={fgSize} />
      </Box>
    );
  }

  return null;
};

// ─── Safe zone overlay ────────────────────────────────────────────────────────

const SafeZoneOverlay: React.FC<{ size: number }> = ({ size }) => {
  const szSize = size * IOS_SAFE_ZONE_RATIO;
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

// ─── Grid overlay ─────────────────────────────────────────────────────────────

const GridOverlay: React.FC<{ size: number }> = ({ size }) => {
  const stroke = "rgba(255,255,255,0.45)";
  const m = size / 2;
  const r = (size * IOS_SAFE_ZONE_RATIO) / 2;
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      width={size}
      height={size}
    >
      <line x1={m} y1={0} x2={m} y2={size} stroke={stroke} strokeWidth={0.75} strokeDasharray="2 2" />
      <line x1={0} y1={m} x2={size} y2={m} stroke={stroke} strokeWidth={0.75} strokeDasharray="2 2" />
      <circle cx={m} cy={m} r={r} fill="none" stroke={stroke} strokeWidth={0.75} strokeDasharray="3 2" />
    </svg>
  );
};

// ─── Panel ────────────────────────────────────────────────────────────────────

const AppIconGeneratorIosPreviewPanel: React.FC<AppIconGeneratorIosPreviewPanelProps> = ({
  config,
  showSafeZone = false,
  showGrid = false,
}) => {
  const ICON_SIZE = 200;
  return (
    <VStack align="center" gap={4}>
      <Text fontSize="sm" fontWeight="600">{"Live Preview"}</Text>
      <Box
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: "22.5%",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <BackgroundLayer config={config.background} size={ICON_SIZE} />
        <ForegroundLayer config={config.foreground} size={ICON_SIZE} />
        {showSafeZone && <SafeZoneOverlay size={ICON_SIZE} />}
        {showGrid && <GridOverlay size={ICON_SIZE} />}
      </Box>
      <Text fontSize="10px" color="fg.subtle" textAlign="center">
        {"Preview uses approximate iOS corner shape."}
      </Text>
    </VStack>
  );
};

export default AppIconGeneratorIosPreviewPanel;
