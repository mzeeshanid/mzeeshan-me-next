import { SampleFileVariantModel } from "@/apis/sampleFiles/sampleFilesExtensionDetails";

export const SECTION_ORDER = [
  { key: "basic", label: "Basic" },
  { key: "size_duration", label: "Size & Duration" },
  { key: "size_resolution", label: "Size & Resolution" },
  { key: "general", label: "General" },
  { key: "aspect_ratio", label: "Aspect Ratio" },
  { key: "resolution", label: "Resolution" },
  { key: "dpi", label: "DPI" },
  { key: "orientation", label: "Orientation" },
  { key: "frame_rate", label: "Frame Rate" },
  { key: "codec", label: "Codec" },
  { key: "bitrate", label: "Bitrate" },
  { key: "color_profile", label: "Color Profile" },
  { key: "transparency", label: "Transparency" },
  { key: "header_container", label: "Header & Container" },
  { key: "audio", label: "Audio" },
  { key: "audio_quality", label: "Audio Quality" },
  { key: "bit_depth", label: "Bit Depth" },
  { key: "block_size", label: "Block Size" },
  { key: "channels", label: "Channels" },
  { key: "compression", label: "Compression" },
  { key: "content_type", label: "Content Type" },
  { key: "edge_cases", label: "Edge Cases" },
  { key: "encoding_variants", label: "Encoding Variants" },
  { key: "character_encoding", label: "Character Encoding" },
  { key: "line_endings", label: "Line Endings" },
  { key: "metadata", label: "Metadata" },
  { key: "sample_rate_bit_depth", label: "Sample Rate & Bit Depth" },
  { key: "waveform_signal", label: "Waveform & Signal Type" },
  { key: "document_structure", label: "Document Structure" },
  { key: "spec_version", label: "Specification Version" },
  { key: "text_formatting", label: "Text Formatting" },
  { key: "misc", label: "Misc" },
];

export function sectionLabel(key: string): string {
  return SECTION_ORDER.find((s) => s.key === key)?.label ?? key;
}

// Rotated by each section's fixed position in SECTION_ORDER (not by the
// subset present on a given extension), so a section like "Resolution"
// keeps the same color across every extension's variant listing.
export const SECTION_COLOR_PALETTES = [
  "orange",
  "blue",
  "purple",
  "green",
  "yellow",
  "red",
  "cyan",
  "pink",
  "teal",
];

export function sectionColor(key: string): string {
  const idx = SECTION_ORDER.findIndex((s) => s.key === key);
  const safeIdx = idx === -1 ? 0 : idx;
  return SECTION_COLOR_PALETTES[safeIdx % SECTION_COLOR_PALETTES.length];
}

export function sectionInitials(label: string): string {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return label.slice(0, 2).toUpperCase();
}

export interface VariantSectionGroup {
  key: string;
  label: string;
  items: SampleFileVariantModel[];
}

export function groupVariants(
  variants: SampleFileVariantModel[],
): VariantSectionGroup[] {
  const map = new Map<string, SampleFileVariantModel[]>();
  for (const v of variants) {
    const key = v.section?.trim() || "general";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(v);
  }
  const orderKeys = SECTION_ORDER.map((s) => s.key);
  return Array.from(map.keys())
    .sort((a, b) => {
      const ai = orderKeys.indexOf(a);
      const bi = orderKeys.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    })
    .map((key) => ({ key, label: sectionLabel(key), items: map.get(key)! }));
}
