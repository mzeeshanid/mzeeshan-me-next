import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Card,
  Clipboard,
  ColorPicker,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  parseColor,
  Separator,
  SimpleGrid,
  Slider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuPipette, LuRefreshCw, LuZap } from "react-icons/lu";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

type ColorValue = ReturnType<typeof parseColor>;

const DEFAULT_COLOR = parseColor("hsba(209, 76%, 81%, 1)");

// ── Format helpers ────────────────────────────────────────────────────────────

function toHex(c: ColorValue): string {
  const v = c.toFormat("rgba");
  const r = Math.round(v.getChannelValue("red")).toString(16).padStart(2, "0");
  const g = Math.round(v.getChannelValue("green"))
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(v.getChannelValue("blue")).toString(16).padStart(2, "0");
  const a = v.getChannelValue("alpha");
  const alphaSuffix =
    a < 1
      ? Math.round(a * 255)
          .toString(16)
          .padStart(2, "0")
      : "";
  return `#${r}${g}${b}${alphaSuffix}`.toUpperCase();
}

function toRgba(c: ColorValue): string {
  const v = c.toFormat("rgba");
  const r = Math.round(v.getChannelValue("red"));
  const g = Math.round(v.getChannelValue("green"));
  const b = Math.round(v.getChannelValue("blue"));
  const a = +v.getChannelValue("alpha").toFixed(2);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function toHsba(c: ColorValue): string {
  const v = c.toFormat("hsba");
  const h = Math.round(v.getChannelValue("hue"));
  const s = Math.round(v.getChannelValue("saturation"));
  const br = Math.round(v.getChannelValue("brightness"));
  const a = +v.getChannelValue("alpha").toFixed(2);
  return `hsba(${h}, ${s}%, ${br}%, ${a})`;
}

function toHsv(c: ColorValue): string {
  const v = c.toFormat("hsba");
  const h = Math.round(v.getChannelValue("hue"));
  const s = Math.round(v.getChannelValue("saturation"));
  const br = Math.round(v.getChannelValue("brightness"));
  return `hsv(${h}, ${s}%, ${br}%)`;
}

function toHsl(c: ColorValue): string {
  const v = c.toFormat("hsla");
  const h = Math.round(v.getChannelValue("hue"));
  const s = Math.round(v.getChannelValue("saturation"));
  const l = Math.round(v.getChannelValue("lightness"));
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function tryParse(text: string): ColorValue | null {
  try {
    return parseColor(text);
  } catch {
    return null;
  }
}

// ── WCAG helpers ──────────────────────────────────────────────────────────────

function linearize(x: number): number {
  const s = x / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function wcagRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Binary search: find HSL lightness (0-100) where contrast vs white OR black = targetRatio.
// vsWhite=true → darker colors achieve higher contrast vs white.
// Returns null if the target is unachievable even at the extreme.
function findLightnessForContrast(
  c: ColorValue,
  targetRatio: number,
  vsWhite: boolean,
): number | null {
  const hsla = c.toFormat("hsla");
  const h = hsla.getChannelValue("hue");
  const s = hsla.getChannelValue("saturation");
  const a = hsla.getChannelValue("alpha");

  const colorAt = (l: number): ColorValue =>
    parseColor(`hsla(${h}, ${s}%, ${l}%, ${a})`);

  const ratioAt = (l: number): number => {
    const rgba = colorAt(l).toFormat("rgba");
    const lum = relativeLuminance(
      rgba.getChannelValue("red"),
      rgba.getChannelValue("green"),
      rgba.getChannelValue("blue"),
    );
    return vsWhite ? wcagRatio(1, lum) : wcagRatio(lum, 0);
  };

  // Check if achievable at extreme
  const extremeRatio = ratioAt(vsWhite ? 0 : 100);
  if (extremeRatio < targetRatio) return null;

  // Binary search for the threshold boundary
  let lo = 0,
    hi = 100;
  for (let i = 0; i < 52; i++) {
    const mid = (lo + hi) / 2;
    const r = ratioAt(mid);
    if (vsWhite) {
      // as L ↑, contrast vs white ↓ → find max L where ratio ≥ target
      if (r >= targetRatio) lo = mid;
      else hi = mid;
    } else {
      // as L ↑, contrast vs black ↑ → find min L where ratio ≥ target
      if (r >= targetRatio) hi = mid;
      else lo = mid;
    }
  }
  return (lo + hi) / 2;
}

// ── Color blindness simulation matrices (Viénot et al. 1999, sRGB approx) ───

function clamp(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function simulateProtanopia(r: number, g: number, b: number): string {
  return `rgb(${clamp(0.56667 * r + 0.43333 * g)}, ${clamp(0.55833 * r + 0.44167 * g)}, ${clamp(0.24167 * g + 0.75833 * b)})`;
}
function simulateDeuteranopia(r: number, g: number, b: number): string {
  return `rgb(${clamp(0.625 * r + 0.375 * g)}, ${clamp(0.7 * r + 0.3 * g)}, ${clamp(0.3 * g + 0.7 * b)})`;
}
function simulateTritanopia(r: number, g: number, b: number): string {
  return `rgb(${clamp(0.95 * r + 0.05 * g)}, ${clamp(0.43333 * g + 0.56667 * b)}, ${clamp(0.475 * g + 0.525 * b)})`;
}
function simulateAchromatopsia(r: number, g: number, b: number): string {
  const l = clamp(0.299 * r + 0.587 * g + 0.114 * b);
  return `rgb(${l}, ${l}, ${l})`;
}

// ── Color harmonics ───────────────────────────────────────────────────────────

function getHarmonics(c: ColorValue) {
  const hsla = c.toFormat("hsla");
  const h = hsla.getChannelValue("hue");
  const s = hsla.getChannelValue("saturation");
  const l = hsla.getChannelValue("lightness");
  const a = hsla.getChannelValue("alpha");
  const rotate = (deg: number): ColorValue => {
    const nh = (((h + deg) % 360) + 360) % 360;
    return parseColor(`hsla(${nh}, ${s}%, ${l}%, ${a})`);
  };
  return {
    complementary: [rotate(180)],
    analogous: [rotate(30), rotate(-30)],
    triadic: [rotate(120), rotate(-120)],
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

interface FormatRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  palette: string;
  /** Segment indices (0-based) whose values must end with "%" */
  percentSegments?: number[];
}

function buildSegments(str: string): { start: number; end: number }[] {
  const segs: { start: number; end: number }[] = [];
  let segStart = 0;
  for (let i = 0; i <= str.length; i++) {
    if (i === str.length || str[i] === ",") {
      segs.push({ start: segStart, end: i });
      segStart = i + 1;
    }
  }
  return segs;
}

function trimmedRange(
  val: string,
  seg: { start: number; end: number },
  isLast: boolean,
): [number, number] {
  let start = seg.start;
  while (start < seg.end && val[start] === " ") start++;
  let end = seg.end;
  if (isLast) while (end > start && (val[end - 1] === ")" || val[end - 1] === " ")) end--;
  return [start, end];
}

const FormatRow: React.FC<FormatRowProps> = ({
  label,
  value,
  onChange,
  palette,
  percentSegments = [],
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pendingSelection = React.useRef<[number, number] | null>(null);

  // Apply selection after re-render caused by onChange (% auto-insert)
  React.useLayoutEffect(() => {
    if (pendingSelection.current && inputRef.current) {
      inputRef.current.setSelectionRange(...pendingSelection.current);
      pendingSelection.current = null;
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Tab" || e.shiftKey) return;

    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const val = input.value;

    const segments = buildSegments(val);
    const currentIdx = segments.findIndex((seg) => pos >= seg.start && pos <= seg.end);
    if (currentIdx === -1) return;

    const curSeg = segments[currentIdx];

    // Find first digit position within current segment
    let numStart = curSeg.start;
    while (numStart < curSeg.end && !/\d/.test(val[numStart])) numStart++;

    // If cursor is in the non-numeric prefix of the current segment (e.g. "rgba("),
    // select the numeric part of this segment instead of jumping to the next one
    if (pos < numStart && numStart < curSeg.end) {
      e.preventDefault();
      const [, selEnd] = trimmedRange(val, curSeg, currentIdx === segments.length - 1);
      input.setSelectionRange(numStart, selEnd);
      return;
    }

    // Last segment: let Tab fall through to the copy button
    if (currentIdx >= segments.length - 1) return;

    e.preventDefault();

    // Auto-insert % if this segment requires it and the value is a bare number
    let workingVal = val;
    if (percentSegments.includes(currentIdx)) {
      const content = workingVal.slice(numStart, curSeg.end);
      if (!content.endsWith("%") && /^\d+(\.\d+)?$/.test(content)) {
        const insertAt = numStart + content.length; // == curSeg.end
        workingVal = workingVal.slice(0, insertAt) + "%" + workingVal.slice(insertAt);
        onChange(workingVal);
      }
    }

    // Recalculate segments on (possibly modified) string and select the next value
    const newSegs = buildSegments(workingVal);
    const nextSeg = newSegs[currentIdx + 1];
    if (!nextSeg) return;

    const isNextLast = currentIdx + 1 === newSegs.length - 1;
    const [selStart, selEnd] = trimmedRange(workingVal, nextSeg, isNextLast);

    if (workingVal !== val) {
      // onChange triggered a re-render; apply selection after it settles
      pendingSelection.current = [selStart, selEnd];
    } else {
      input.setSelectionRange(selStart, selEnd);
    }
  };

  return (
    <HStack gap={2} align="flex-end">
      <Box flex={1}>
        <Text fontSize="xs" fontWeight="semibold" color="fg.muted" mb={1}>
          {label}
        </Text>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          fontFamily="mono"
          fontSize="sm"
          size="sm"
        />
      </Box>
      <Clipboard.Root value={value}>
        <Clipboard.Trigger asChild>
          <Button
            size="sm"
            variant="surface"
            colorPalette={palette}
            flexShrink={0}
            aria-label={`Copy ${label}`}
          >
            <Clipboard.Indicator />
          </Button>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </HStack>
  );
};

interface WcagBadgeProps {
  label: string;
  pass: boolean;
}
const WcagBadge: React.FC<WcagBadgeProps> = ({ label, pass }) => (
  <VStack
    gap={2}
    p={3}
    borderRadius="lg"
    borderWidth="1px"
    borderColor={pass ? "green.200" : "red.200"}
    bg={pass ? "green.50" : "red.50"}
    _dark={{
      bg: pass ? "green.950" : "red.950",
      borderColor: pass ? "green.800" : "red.800",
    }}
    align="center"
  >
    <Text
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="wider"
      textTransform="uppercase"
      textAlign="center"
    >
      {label}
    </Text>
    <Icon
      as={pass ? FaCircleCheck : FaCircleXmark}
      boxSize={5}
      color={pass ? "green.500" : "red.500"}
    />
  </VStack>
);

interface ColorBlindSwatchProps {
  label: string;
  color: string;
}
const ColorBlindSwatch: React.FC<ColorBlindSwatchProps> = ({
  label,
  color,
}) => (
  <VStack gap={2} align="stretch">
    <Box
      h="24"
      borderRadius="lg"
      style={{ backgroundColor: color }}
      borderWidth="1px"
      borderColor="border"
    />
    <Text fontSize="xs" color="fg.muted" textAlign="center">
      {label}
    </Text>
  </VStack>
);

interface HarmonySwatchProps {
  color: ColorValue;
}
const HarmonySwatch: React.FC<HarmonySwatchProps> = ({ color }) => {
  const hex = toHex(color).slice(0, 7);
  return (
    <VStack gap={2} align="center">
      <Box
        w="full"
        h="16"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="border"
        style={{ backgroundColor: hex }}
        flexShrink={0}
      />
      <Clipboard.Root value={hex}>
        <Clipboard.Trigger asChild>
          <Button
            size="2xs"
            variant="ghost"
            fontFamily="mono"
            fontSize="xs"
            color="fg.muted"
            gap={1}
          >
            <Clipboard.Indicator />
            {hex}
          </Button>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </VStack>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const ColorConverterHero: React.FC = () => {
  const { palette } = useColorPalette();

  const [color, setColor] = React.useState<ColorValue>(DEFAULT_COLOR);

  const [hexVal, setHexVal] = React.useState(() => toHex(DEFAULT_COLOR));
  const [rgbaVal, setRgbaVal] = React.useState(() => toRgba(DEFAULT_COLOR));
  const [hsbaVal, setHsbaVal] = React.useState(() => toHsba(DEFAULT_COLOR));
  const [hsvVal, setHsvVal] = React.useState(() => toHsv(DEFAULT_COLOR));
  const [hslVal, setHslVal] = React.useState(() => toHsl(DEFAULT_COLOR));

  const fromPicker = React.useRef(false);

  React.useEffect(() => {
    if (!fromPicker.current) return;
    setHexVal(toHex(color));
    setRgbaVal(toRgba(color));
    setHsbaVal(toHsba(color));
    setHsvVal(toHsv(color));
    setHslVal(toHsl(color));
    fromPicker.current = false;
  }, [color]);

  // ── Color change handlers ─────────────────────────────────────────────────

  const handlePickerChange = React.useCallback((e: { value: ColorValue }) => {
    fromPicker.current = true;
    setColor(e.value);
  }, []);

  const syncFrom = React.useCallback(
    (c: ColorValue, skip: "hex" | "rgba" | "hsba" | "hsv" | "hsl") => {
      setColor(c);
      if (skip !== "hex") setHexVal(toHex(c));
      if (skip !== "rgba") setRgbaVal(toRgba(c));
      if (skip !== "hsba") setHsbaVal(toHsba(c));
      if (skip !== "hsv") setHsvVal(toHsv(c));
      if (skip !== "hsl") setHslVal(toHsl(c));
    },
    [],
  );

  const handleHexChange = (val: string) => {
    setHexVal(val);
    const c = tryParse(val) ?? tryParse(`#${val.replace(/^#/, "")}`);
    if (c) syncFrom(c, "hex");
  };
  const handleRgbaChange = (val: string) => {
    setRgbaVal(val);
    const c = tryParse(val);
    if (c) syncFrom(c, "rgba");
  };
  const handleHsbaChange = (val: string) => {
    setHsbaVal(val);
    const c = tryParse(val);
    if (c) syncFrom(c, "hsba");
  };
  const handleHsvChange = (val: string) => {
    setHsvVal(val);
    const c = tryParse(val.replace(/^hsv\(/, "hsba(").replace(/\)$/, ", 1)"));
    if (c) syncFrom(c, "hsv");
  };
  const handleHslChange = (val: string) => {
    setHslVal(val);
    const c = tryParse(val.replace(/^hsl\(/, "hsla(").replace(/\)$/, ", 1)"));
    if (c) syncFrom(c, "hsl");
  };

  const handleReset = () => {
    fromPicker.current = true;
    setColor(DEFAULT_COLOR);
    setHexVal(toHex(DEFAULT_COLOR));
    setRgbaVal(toRgba(DEFAULT_COLOR));
    setHsbaVal(toHsba(DEFAULT_COLOR));
    setHsvVal(toHsv(DEFAULT_COLOR));
    setHslVal(toHsl(DEFAULT_COLOR));
  };

  // ── WCAG contrast data ────────────────────────────────────────────────────

  const wcag = React.useMemo(() => {
    const v = color.toFormat("rgba");
    const r = v.getChannelValue("red");
    const g = v.getChannelValue("green");
    const b = v.getChannelValue("blue");
    const L = relativeLuminance(r, g, b);
    const vsWhite = +wcagRatio(1, L).toFixed(2);
    const vsBlack = +wcagRatio(L, 0).toFixed(2);
    return { vsWhite, vsBlack, r, g, b };
  }, [color]);

  // ── Lightness slider for auto-correction ──────────────────────────────────

  const currentLightness = React.useMemo(() => {
    const v = color.toFormat("hsla");
    return Math.round(v.getChannelValue("lightness"));
  }, [color]);

  // Threshold lightness positions for AA (4.5:1) and AAA (7:1)
  // Computed for both backgrounds; the dominant one (higher ratio) is used for marks
  const thresholds = React.useMemo(() => {
    const vsWhiteDominant = wcag.vsWhite >= wcag.vsBlack;
    return {
      aa: findLightnessForContrast(color, 4.5, vsWhiteDominant),
      aaa: findLightnessForContrast(color, 7, vsWhiteDominant),
      vsWhite: vsWhiteDominant,
    };
  }, [color, wcag.vsWhite, wcag.vsBlack]);

  const handleLightnessSlider = React.useCallback(
    (val: number) => {
      const v = color.toFormat("hsla");
      const h = v.getChannelValue("hue");
      const s = v.getChannelValue("saturation");
      const a = v.getChannelValue("alpha");
      const newColor = parseColor(`hsla(${h}, ${s}%, ${val}%, ${a})`);
      fromPicker.current = true;
      setColor(newColor);
    },
    [color],
  );

  const handleSnapToWcag = React.useCallback(() => {
    const { aa, aaa } = thresholds;
    const candidates = [aa, aaa].filter((v): v is number => v !== null);
    if (!candidates.length) return;
    const nearest = candidates.reduce((prev, curr) =>
      Math.abs(curr - currentLightness) < Math.abs(prev - currentLightness)
        ? curr
        : prev,
    );
    handleLightnessSlider(Math.round(nearest));
  }, [thresholds, currentLightness, handleLightnessSlider]);

  // ── Color harmonics ───────────────────────────────────────────────────────

  const harmonics = React.useMemo(() => getHarmonics(color), [color]);

  // ── Color blindness simulations ───────────────────────────────────────────

  const colorBlind = React.useMemo(() => {
    const { r, g, b } = wcag;
    return {
      protanopia: simulateProtanopia(r, g, b),
      deuteranopia: simulateDeuteranopia(r, g, b),
      tritanopia: simulateTritanopia(r, g, b),
      achromatopsia: simulateAchromatopsia(r, g, b),
    };
  }, [wcag]);

  // ── Derived UI values ─────────────────────────────────────────────────────

  const activeHex = hexVal.slice(0, 7); // 6-char hex for CSS background (no alpha suffix)

  return (
    <Box as="section">
      <VStack align="stretch" gap={8}>
        {/* Title */}
        <VStack align="flex-start" gap={2}>
          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
          >
            Color Format Converter
          </Heading>
          <Text color="fg.muted" fontSize={{ base: "sm", md: "md" }}>
            The ultimate utility for developers and designers to bridge the gap
            between color spaces with pixel-perfect accuracy.
          </Text>
        </VStack>

        {/* ── Converter card ─────────────────────────────────────────────────── */}
        <Card.Root variant="outline" style={{ isolation: "isolate" }}>
          <Card.Body p={{ base: 4, md: 6 }}>
            <ColorPicker.Root
              open
              value={color}
              onValueChange={handlePickerChange}
              colorPalette={palette}
              w="full"
            >
              <ColorPicker.HiddenInput />
              <ColorPicker.Content
                animation="none"
                shadow="none"
                padding="0"
                w="full"
                style={{ position: "relative", zIndex: 0 }}
              >
                <SimpleGrid
                  columns={{ base: 1, lg: 12 }}
                  gap={{ base: 6, lg: 8 }}
                >
                  {/* Left: Visual controls */}
                  <GridItem colSpan={{ base: 1, lg: 5 }}>
                    <VStack align="stretch" gap={4}>
                      <Box position="relative">
                        <ColorPicker.Area
                          borderRadius="md"
                          overflow="hidden"
                          style={{ aspectRatio: "1 / 1", width: "100%" }}
                        >
                          <ColorPicker.AreaBackground
                            style={{ width: "100%", height: "100%" }}
                          />
                          <ColorPicker.AreaThumb />
                        </ColorPicker.Area>
                        <ColorPicker.EyeDropperTrigger asChild>
                          <Button
                            size="xs"
                            variant="surface"
                            position="absolute"
                            bottom={2}
                            right={2}
                            aria-label="Pick color from screen"
                          >
                            <LuPipette />
                          </Button>
                        </ColorPicker.EyeDropperTrigger>
                      </Box>

                      <VStack align="stretch" gap={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          color="fg.muted"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          Hue
                        </Text>
                        <ColorPicker.ChannelSlider channel="hue">
                          <ColorPicker.ChannelSliderTrack
                            borderRadius="full"
                            h="3"
                          />
                          <ColorPicker.ChannelSliderThumb />
                        </ColorPicker.ChannelSlider>
                      </VStack>

                      <VStack align="stretch" gap={1}>
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          color="fg.muted"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          Alpha / Opacity
                        </Text>
                        <ColorPicker.ChannelSlider channel="alpha">
                          <ColorPicker.TransparencyGrid size="10px" />
                          <ColorPicker.ChannelSliderTrack
                            borderRadius="full"
                            h="3"
                          />
                          <ColorPicker.ChannelSliderThumb />
                        </ColorPicker.ChannelSlider>
                      </VStack>

                      <HStack
                        gap={3}
                        p={3}
                        bg="bg.subtle"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="border"
                      >
                        <ColorPicker.ValueSwatch
                          boxSize={12}
                          borderRadius="md"
                          flexShrink={0}
                          respectAlpha
                        />
                        <VStack align="flex-start" gap={0}>
                          <Text fontSize="xs" fontWeight="semibold">
                            Active Color
                          </Text>
                          <Text
                            fontFamily="mono"
                            fontSize="xs"
                            color="fg.muted"
                          >
                            {hexVal}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </GridItem>

                  {/* Right: Format outputs */}
                  <GridItem colSpan={{ base: 1, lg: 7 }}>
                    <VStack align="stretch" gap={4}>
                      <Box pb={2} borderBottomWidth="1px" borderColor="border">
                        <Heading as="h3" fontSize="lg" fontWeight="semibold">
                          Formats
                        </Heading>
                      </Box>
                      <FormatRow
                        label="HEX"
                        value={hexVal}
                        onChange={handleHexChange}
                        palette={palette}
                      />
                      <FormatRow
                        label="RGBA"
                        value={rgbaVal}
                        onChange={handleRgbaChange}
                        palette={palette}
                      />
                      <FormatRow
                        label="HSBA"
                        value={hsbaVal}
                        onChange={handleHsbaChange}
                        palette={palette}
                        percentSegments={[1, 2]}
                      />
                      <FormatRow
                        label="HSV"
                        value={hsvVal}
                        onChange={handleHsvChange}
                        palette={palette}
                        percentSegments={[1, 2]}
                      />
                      <FormatRow
                        label="HSL"
                        value={hslVal}
                        onChange={handleHslChange}
                        palette={palette}
                        percentSegments={[1, 2]}
                      />
                      <HStack justify="flex-end" pt={2} gap={3} flexWrap="wrap">
                        <Button
                          size="sm"
                          variant="surface"
                          onClick={handleReset}
                        >
                          <LuRefreshCw />
                          Reset
                        </Button>
                        <Clipboard.Root
                          value={`hex: ${hexVal}\nrgba: ${rgbaVal}\nhsba: ${hsbaVal}\nhsv: ${hsvVal}\nhsl: ${hslVal}`}
                        >
                          <Clipboard.Trigger asChild>
                            <Button size="sm" colorPalette={palette}>
                              <Clipboard.Indicator />
                              Copy All
                            </Button>
                          </Clipboard.Trigger>
                        </Clipboard.Root>
                      </HStack>
                      <Text fontSize="xs" color="fg.subtle" pt={1}>
                        HEX: #RRGGBB or #RRGGBBAA &nbsp;·&nbsp;
                        RGBA: R,G,B 0–255 · A 0–1 &nbsp;·&nbsp;
                        HSBA / HSV / HSL: H 0–360 · S,B,L 0–100% · A 0–1
                      </Text>
                    </VStack>
                  </GridItem>
                </SimpleGrid>
              </ColorPicker.Content>
            </ColorPicker.Root>
          </Card.Body>
        </Card.Root>

        {/* ── Contrast & Accessibility ────────────────────────────────────────── */}
        <Card.Root variant="outline">
          <Card.Body p={{ base: 4, md: 6 }}>
            <VStack align="stretch" gap={6}>
              <Heading as="h2" fontSize="xl" fontWeight="bold">
                Contrast &amp; Accessibility
              </Heading>

              {/* Contrast ratios */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={1}>
                    On White Background
                  </Text>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color={`${palette}.fg`}
                    lineHeight="1"
                  >
                    {wcag.vsWhite}:1
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted" mb={1}>
                    On Black Background
                  </Text>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="bold"
                    color={`${palette}.fg`}
                    lineHeight="1"
                  >
                    {wcag.vsBlack}:1
                  </Text>
                </Box>
              </SimpleGrid>

              {/* WCAG badges — left side vs white (normal text), right side vs black (large text) */}
              <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3}>
                <WcagBadge label="AA Normal" pass={wcag.vsWhite >= 4.5} />
                <WcagBadge label="AAA Normal" pass={wcag.vsWhite >= 7} />
                <WcagBadge label="AA Large" pass={wcag.vsBlack >= 3} />
                <WcagBadge label="AAA Large" pass={wcag.vsBlack >= 4.5} />
              </SimpleGrid>

              {/* Text previews */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  borderColor="border"
                >
                  <Box bg="white" p={4}>
                    <Text color={activeHex} fontSize="md">
                      Normal: The quick brown fox jumps over the lazy dog.
                    </Text>
                    <Text
                      color={activeHex}
                      fontSize="xl"
                      fontWeight="semibold"
                      mt={2}
                    >
                      Large: The quick brown fox.
                    </Text>
                  </Box>
                </Box>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  borderColor="border"
                >
                  <Box bg="black" p={4}>
                    <Text color={activeHex} fontSize="md">
                      Normal: The quick brown fox jumps over the lazy dog.
                    </Text>
                    <Text
                      color={activeHex}
                      fontSize="xl"
                      fontWeight="semibold"
                      mt={2}
                    >
                      Large: The quick brown fox.
                    </Text>
                  </Box>
                </Box>
              </SimpleGrid>

              <Separator />

              {/* Auto-correction slider */}
              <Box>
                <HStack justify="space-between" mb={4} flexWrap="wrap" gap={3}>
                  <Text fontWeight="semibold" fontSize="sm">
                    Contrast Auto-Correction
                  </Text>
                  <Button
                    size="xs"
                    variant="solid"
                    colorPalette={palette}
                    onClick={handleSnapToWcag}
                  >
                    <LuZap />
                    Snap to Nearest WCAG
                  </Button>
                </HStack>

                {/* Slider with AA/AAA markers */}
                <Box position="relative" pt={6} pb={2}>
                  {/* Marker labels above the track */}
                  {thresholds.aa !== null && (
                    <Box
                      position="absolute"
                      top={0}
                      left={`${thresholds.aa}%`}
                      transform="translateX(-50%)"
                      textAlign="center"
                    >
                      <Text
                        fontSize="2xs"
                        fontWeight="bold"
                        color="fg.muted"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        AA
                      </Text>
                      <Box
                        w="1px"
                        h="3"
                        bg="border.emphasized"
                        mx="auto"
                        mt="1px"
                      />
                    </Box>
                  )}
                  {thresholds.aaa !== null && (
                    <Box
                      position="absolute"
                      top={0}
                      left={`${thresholds.aaa}%`}
                      transform="translateX(-50%)"
                      textAlign="center"
                    >
                      <Text
                        fontSize="2xs"
                        fontWeight="bold"
                        color="fg.muted"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        AAA
                      </Text>
                      <Box
                        w="1px"
                        h="3"
                        bg="border.emphasized"
                        mx="auto"
                        mt="1px"
                      />
                    </Box>
                  )}

                  <Slider.Root
                    min={0}
                    max={100}
                    step={1}
                    value={[currentLightness]}
                    onValueChange={({ value }) =>
                      handleLightnessSlider(value[0])
                    }
                    colorPalette={palette}
                  >
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumb index={0} />
                    </Slider.Control>
                  </Slider.Root>
                </Box>

                <HStack justify="space-between" mt={1}>
                  <Text fontSize="xs" color="fg.subtle">
                    Darker (0%)
                  </Text>
                  <Text fontSize="xs" color="fg.subtle">
                    Lighter (100%)
                  </Text>
                </HStack>
              </Box>

              <Separator />

              {/* Color Blindness Simulator */}
              <Box>
                <Text fontWeight="semibold" fontSize="sm" mb={4}>
                  Color Blindness Simulator
                </Text>
                <SimpleGrid columns={{ base: 2, sm: 4 }} gap={4}>
                  <ColorBlindSwatch
                    label="Protanopia"
                    color={colorBlind.protanopia}
                  />
                  <ColorBlindSwatch
                    label="Deuteranopia"
                    color={colorBlind.deuteranopia}
                  />
                  <ColorBlindSwatch
                    label="Tritanopia"
                    color={colorBlind.tritanopia}
                  />
                  <ColorBlindSwatch
                    label="Achromatopsia"
                    color={colorBlind.achromatopsia}
                  />
                </SimpleGrid>
              </Box>

              <Separator />

              {/* Inverted preview */}
              <Box>
                <Text fontWeight="semibold" fontSize="sm" mb={3}>
                  Inverted Preview (Active Color Background)
                </Text>
                <Box
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="border"
                  style={{ backgroundColor: activeHex }}
                >
                  <Text color="white" fontSize="lg" fontWeight="medium" mb={2}>
                    White text on active color
                  </Text>
                  <Text color="black" fontSize="lg" fontWeight="medium">
                    Black text on active color
                  </Text>
                </Box>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* ── Color Harmonies ────────────────────────────────────────────────── */}
        <Card.Root variant="outline">
          <Card.Body p={{ base: 4, md: 6 }}>
            <VStack align="stretch" gap={6}>
              <Box>
                <Heading as="h2" fontSize="xl" fontWeight="bold" mb={2}>
                  Color Harmonies
                </Heading>
                <Text color="fg.muted" fontSize="sm">
                  Complementary, analogous, and triadic harmonics are calculated
                  automatically so you can explore related colors without
                  leaving the page.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6}>
                {/* Complementary */}
                <VStack align="stretch" gap={3}>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="fg.muted"
                  >
                    Complementary
                  </Text>
                  <SimpleGrid columns={1} gap={3}>
                    {harmonics.complementary.map((c, i) => (
                      <HarmonySwatch key={i} color={c} />
                    ))}
                  </SimpleGrid>
                </VStack>

                {/* Analogous */}
                <VStack align="stretch" gap={3}>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="fg.muted"
                  >
                    Analogous
                  </Text>
                  <SimpleGrid columns={2} gap={3}>
                    {harmonics.analogous.map((c, i) => (
                      <HarmonySwatch key={i} color={c} />
                    ))}
                  </SimpleGrid>
                </VStack>

                {/* Triadic */}
                <VStack align="stretch" gap={3}>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="fg.muted"
                  >
                    Triadic
                  </Text>
                  <SimpleGrid columns={2} gap={3}>
                    {harmonics.triadic.map((c, i) => (
                      <HarmonySwatch key={i} color={c} />
                    ))}
                  </SimpleGrid>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default ColorConverterHero;
