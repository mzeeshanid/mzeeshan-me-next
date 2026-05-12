export type ColorCodeExample = {
  language: string;
  label: string;
  code: string;
};

export type ColorCodeExamplesData = {
  header: { badge: string; title: string; description: string };
  examples: ColorCodeExample[];
};

export const colorConverterCodeExamplesData: ColorCodeExamplesData = {
  header: {
    badge: "Code Examples",
    title: "Color Conversion in Your Language",
    description:
      "Copy-paste implementations of all six conversion directions — HEX↔RGB, RGB↔HSL, RGB↔HSV — for the most popular languages.",
  },
  examples: [
    {
      language: "javascript",
      label: "JavaScript",
      code: `// HEX → RGB
function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}
console.log(hexToRgb('#3b82f6')); // { r: 59, g: 130, b: 246 }

// RGB → HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('');
}
console.log(rgbToHex(59, 130, 246)); // '#3b82f6'

// RGB → HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  const l = (max + min) / 2;
  if (delta === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h = max === r ? ((g - b) / delta) % 6
        : max === g ? (b - r) / delta + 2
        : (r - g) / delta + 4;
  return { h: Math.round(((h * 60) + 360) % 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
console.log(rgbToHsl(59, 130, 246)); // { h: 217, s: 91, l: 60 }

// HSL → RGB
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  return { r: Math.round((r+m)*255), g: Math.round((g+m)*255), b: Math.round((b+m)*255) };
}
console.log(hslToRgb(217, 91, 60)); // { r: 59, g: 130, b: 246 }

// RGB → HSV
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  const v = max, s = max === 0 ? 0 : delta / max;
  let h = 0;
  if (delta !== 0) {
    h = max === r ? ((g - b) / delta) % 6
      : max === g ? (b - r) / delta + 2
      : (r - g) / delta + 4;
    h = ((h * 60) + 360) % 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}
console.log(rgbToHsv(59, 130, 246)); // { h: 217, s: 76, v: 96 }

// HSV → RGB
function hsvToRgb(h, s, v) {
  s /= 100; v /= 100;
  const c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else              { r = c; b = x; }
  return { r: Math.round((r+m)*255), g: Math.round((g+m)*255), b: Math.round((b+m)*255) };
}
console.log(hsvToRgb(217, 76, 96)); // { r: 59, g: 130, b: 246 }`,
    },
    {
      language: "python",
      label: "Python",
      code: `import colorsys

# HEX → RGB
def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    h = hex_color.lstrip('#')
    if len(h) == 3:
        h = ''.join(c*2 for c in h)
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)

print(hex_to_rgb('#3b82f6'))  # (59, 130, 246)

# RGB → HEX
def rgb_to_hex(r: int, g: int, b: int) -> str:
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

print(rgb_to_hex(59, 130, 246))  # #3b82f6

# RGB → HSL  (Python uses HLS order)
def rgb_to_hsl(r: int, g: int, b: int) -> tuple[int, int, int]:
    h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)
    return round(h * 360), round(s * 100), round(l * 100)

print(rgb_to_hsl(59, 130, 246))  # (217, 91, 60)

# HSL → RGB
def hsl_to_rgb(h: int, s: int, l: int) -> tuple[int, int, int]:
    r, g, b = colorsys.hls_to_rgb(h/360, l/100, s/100)
    return round(r*255), round(g*255), round(b*255)

print(hsl_to_rgb(217, 91, 60))  # (59, 130, 246)

# RGB → HSV
def rgb_to_hsv(r: int, g: int, b: int) -> tuple[int, int, int]:
    h, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
    return round(h*360), round(s*100), round(v*100)

print(rgb_to_hsv(59, 130, 246))  # (217, 76, 96)

# HSV → RGB
def hsv_to_rgb(h: int, s: int, v: int) -> tuple[int, int, int]:
    r, g, b = colorsys.hsv_to_rgb(h/360, s/100, v/100)
    return round(r*255), round(g*255), round(b*255)

print(hsv_to_rgb(217, 76, 96))  # (59, 130, 246)`,
    },
    {
      language: "swift",
      label: "Swift",
      code: `import Foundation

// HEX → RGB
func hexToRgb(_ hex: String) -> (r: Int, g: Int, b: Int)? {
    var clean = hex.hasPrefix("#") ? String(hex.dropFirst()) : hex
    if clean.count == 3 { clean = clean.map { "\\($0)\\($0)" }.joined() }
    guard clean.count == 6, let value = UInt64(clean, radix: 16) else { return nil }
    return (Int((value >> 16) & 0xFF), Int((value >> 8) & 0xFF), Int(value & 0xFF))
}
print(hexToRgb("#3b82f6") ?? "nil") // (59, 130, 246)

// RGB → HEX
func rgbToHex(r: Int, g: Int, b: Int) -> String {
    String(format: "#%02x%02x%02x", r, g, b)
}
print(rgbToHex(r: 59, g: 130, b: 246)) // #3b82f6

// RGB → HSL
func rgbToHsl(r: Int, g: Int, b: Int) -> (h: Int, s: Int, l: Int) {
    let rN = Double(r)/255, gN = Double(g)/255, bN = Double(b)/255
    let max = Swift.max(rN, gN, bN), min = Swift.min(rN, gN, bN)
    let delta = max - min, l = (max + min) / 2
    guard delta != 0 else { return (0, 0, Int((l * 100).rounded())) }
    let s = delta / (1 - abs(2 * l - 1))
    var h: Double
    switch max {
    case rN: h = ((gN - bN) / delta).truncatingRemainder(dividingBy: 6)
    case gN: h = (bN - rN) / delta + 2
    default:  h = (rN - gN) / delta + 4
    }
    h = ((h * 60) + 360).truncatingRemainder(dividingBy: 360)
    return (Int(h.rounded()), Int((s * 100).rounded()), Int((l * 100).rounded()))
}
print(rgbToHsl(r: 59, g: 130, b: 246)) // (217, 91, 60)

// HSL → RGB
func hslToRgb(h: Int, s: Int, l: Int) -> (r: Int, g: Int, b: Int) {
    let sN = Double(s)/100, lN = Double(l)/100
    let c = (1 - abs(2 * lN - 1)) * sN
    let x = c * (1 - abs(Double(h) / 60.0.truncatingRemainder(dividingBy: 2) - 1))
    let m = lN - c / 2
    var r = 0.0, g = 0.0, b = 0.0
    switch h {
    case 0..<60:   r=c; g=x
    case 60..<120: r=x; g=c
    case 120..<180: g=c; b=x
    case 180..<240: g=x; b=c
    case 240..<300: r=x; b=c
    default:        r=c; b=x
    }
    return (Int(((r+m)*255).rounded()), Int(((g+m)*255).rounded()), Int(((b+m)*255).rounded()))
}

// RGB → HSV
func rgbToHsv(r: Int, g: Int, b: Int) -> (h: Int, s: Int, v: Int) {
    let rN = Double(r)/255, gN = Double(g)/255, bN = Double(b)/255
    let max = Swift.max(rN, gN, bN), min = Swift.min(rN, gN, bN)
    let delta = max - min
    guard delta != 0 else { return (0, 0, Int((max * 100).rounded())) }
    let s = delta / max
    var h: Double
    switch max {
    case rN: h = ((gN - bN) / delta).truncatingRemainder(dividingBy: 6)
    case gN: h = (bN - rN) / delta + 2
    default:  h = (rN - gN) / delta + 4
    }
    h = ((h * 60) + 360).truncatingRemainder(dividingBy: 360)
    return (Int(h.rounded()), Int((s * 100).rounded()), Int((max * 100).rounded()))
}

// HSV → RGB
func hsvToRgb(h: Int, s: Int, v: Int) -> (r: Int, g: Int, b: Int) {
    let sN = Double(s)/100, vN = Double(v)/100
    let c = vN * sN, x = c * (1 - abs(Double(h)/60.0.truncatingRemainder(dividingBy: 2) - 1))
    let m = vN - c
    var r = 0.0, g = 0.0, b = 0.0
    switch h {
    case 0..<60:   r=c; g=x
    case 60..<120: r=x; g=c
    case 120..<180: g=c; b=x
    case 180..<240: g=x; b=c
    case 240..<300: r=x; b=c
    default:        r=c; b=x
    }
    return (Int(((r+m)*255).rounded()), Int(((g+m)*255).rounded()), Int(((b+m)*255).rounded()))
}`,
    },
    {
      language: "php",
      label: "PHP",
      code: `<?php

// HEX → RGB
function hexToRgb(string $hex): array {
    $h = ltrim($hex, '#');
    if (strlen($h) === 3) {
        $h = $h[0].$h[0].$h[1].$h[1].$h[2].$h[2];
    }
    return ['r' => hexdec(substr($h,0,2)), 'g' => hexdec(substr($h,2,2)), 'b' => hexdec(substr($h,4,2))];
}
print_r(hexToRgb('#3b82f6')); // r=59, g=130, b=246

// RGB → HEX
function rgbToHex(int $r, int $g, int $b): string {
    return sprintf('#%02x%02x%02x', $r, $g, $b);
}
echo rgbToHex(59, 130, 246); // #3b82f6

// RGB → HSL
function rgbToHsl(int $r, int $g, int $b): array {
    [$r, $g, $b] = [$r/255, $g/255, $b/255];
    $max = max($r,$g,$b); $min = min($r,$g,$b); $delta = $max - $min;
    $l = ($max + $min) / 2;
    if ($delta == 0) return ['h' => 0, 's' => 0, 'l' => round($l * 100)];
    $s = $delta / (1 - abs(2 * $l - 1));
    if ($max == $r)      $h = fmod(($g - $b) / $delta, 6);
    elseif ($max == $g)  $h = ($b - $r) / $delta + 2;
    else                 $h = ($r - $g) / $delta + 4;
    $h = fmod(($h * 60) + 360, 360);
    return ['h' => round($h), 's' => round($s * 100), 'l' => round($l * 100)];
}
print_r(rgbToHsl(59, 130, 246)); // h=217, s=91, l=60

// HSL → RGB
function hslToRgb(int $h, int $s, int $l): array {
    $s /= 100; $l /= 100;
    $c = (1 - abs(2 * $l - 1)) * $s;
    $x = $c * (1 - abs(fmod($h / 60, 2) - 1));
    $m = $l - $c / 2;
    [$r,$g,$b] = match(true) {
        $h < 60  => [$c,$x,0], $h < 120 => [$x,$c,0], $h < 180 => [0,$c,$x],
        $h < 240 => [0,$x,$c], $h < 300 => [$x,0,$c], default   => [$c,0,$x],
    };
    return ['r' => round(($r+$m)*255), 'g' => round(($g+$m)*255), 'b' => round(($b+$m)*255)];
}

// RGB → HSV
function rgbToHsv(int $r, int $g, int $b): array {
    [$r,$g,$b] = [$r/255,$g/255,$b/255];
    $max = max($r,$g,$b); $min = min($r,$g,$b); $delta = $max - $min;
    $v = $max; $s = $max == 0 ? 0 : $delta / $max;
    $h = 0;
    if ($delta != 0) {
        if ($max == $r)     $h = fmod(($g - $b) / $delta, 6);
        elseif ($max == $g) $h = ($b - $r) / $delta + 2;
        else                $h = ($r - $g) / $delta + 4;
        $h = fmod(($h * 60) + 360, 360);
    }
    return ['h' => round($h), 's' => round($s * 100), 'v' => round($v * 100)];
}
print_r(rgbToHsv(59, 130, 246)); // h=217, s=76, v=96

// HSV → RGB
function hsvToRgb(int $h, int $s, int $v): array {
    $s /= 100; $v /= 100;
    $c = $v * $s; $x = $c * (1 - abs(fmod($h / 60, 2) - 1)); $m = $v - $c;
    [$r,$g,$b] = match(true) {
        $h < 60  => [$c,$x,0], $h < 120 => [$x,$c,0], $h < 180 => [0,$c,$x],
        $h < 240 => [0,$x,$c], $h < 300 => [$x,0,$c], default   => [$c,0,$x],
    };
    return ['r' => round(($r+$m)*255), 'g' => round(($g+$m)*255), 'b' => round(($b+$m)*255)];
}`,
    },
    {
      language: "css",
      label: "CSS",
      code: `/* ── Color Format Examples in CSS ── */

/* HEX notation */
.element {
  color: #3b82f6;
  background-color: #1e40af;
}

/* RGB notation */
.element {
  color: rgb(59, 130, 246);
  /* CSS Color 4 — space-separated, no commas */
  background-color: rgb(30 64 175);
}

/* HSL notation — great for design systems */
:root {
  --hue: 217;
  --brand: hsl(var(--hue), 91%, 60%);
  --brand-dark:  hsl(var(--hue), 91%, 40%);
  --brand-light: hsl(var(--hue), 91%, 80%);
}

/* With opacity / alpha */
.overlay {
  background-color: rgba(59, 130, 246, 0.5);  /* 50% transparent */
  background-color: rgb(59 130 246 / 50%);    /* CSS Color 4 syntax */
  background-color: hsl(217 91% 60% / 50%);   /* HSL with alpha */
  background-color: #3b82f680;                /* 8-digit HEX (alpha = 0x80 = ~50%) */
}

/* Custom Properties (design token pattern) */
:root {
  --color-primary-h: 217;
  --color-primary-s: 91%;
  --color-primary-l: 60%;
  --color-primary: hsl(
    var(--color-primary-h),
    var(--color-primary-s),
    var(--color-primary-l)
  );
  --color-primary-hover: hsl(
    var(--color-primary-h),
    var(--color-primary-s),
    50%  /* darker on hover */
  );
}

/* CSS Color 4 — relative color syntax (Chrome 119+, Safari 16.4+) */
:root {
  --brand: #3b82f6;
  --brand-lighter: hsl(from var(--brand) h s calc(l + 15%));
  --brand-darker:  hsl(from var(--brand) h s calc(l - 15%));
  --brand-muted:   hsl(from var(--brand) h calc(s - 40%) l);
}`,
    },
    {
      language: "kotlin",
      label: "Kotlin",
      code: `// Kotlin — pure math, no Android dependency required

// HEX → RGB
fun hexToRgb(hex: String): Triple<Int, Int, Int>? {
    var clean = hex.removePrefix("#")
    if (clean.length == 3) clean = clean.map { "$it$it" }.joinToString("")
    if (clean.length != 6) return null
    val value = clean.toLongOrNull(16) ?: return null
    return Triple(((value shr 16) and 0xFF).toInt(), ((value shr 8) and 0xFF).toInt(), (value and 0xFF).toInt())
}
println(hexToRgb("#3b82f6")) // (59, 130, 246)

// RGB → HEX
fun rgbToHex(r: Int, g: Int, b: Int): String = "#%02x%02x%02x".format(r, g, b)
println(rgbToHex(59, 130, 246)) // #3b82f6

// RGB → HSL
fun rgbToHsl(r: Int, g: Int, b: Int): Triple<Int, Int, Int> {
    val rN = r/255.0; val gN = g/255.0; val bN = b/255.0
    val max = maxOf(rN,gN,bN); val min = minOf(rN,gN,bN); val delta = max - min
    val l = (max + min) / 2
    if (delta == 0.0) return Triple(0, 0, (l*100).toInt())
    val s = delta / (1 - Math.abs(2*l - 1))
    var h = when (max) {
        rN   -> ((gN - bN) / delta) % 6
        gN   -> (bN - rN) / delta + 2
        else -> (rN - gN) / delta + 4
    }
    h = ((h * 60) + 360) % 360
    return Triple(h.toInt(), (s*100).toInt(), (l*100).toInt())
}
println(rgbToHsl(59, 130, 246)) // (217, 91, 60)

// HSL → RGB
fun hslToRgb(h: Int, s: Int, l: Int): Triple<Int, Int, Int> {
    val sN = s/100.0; val lN = l/100.0
    val c = (1 - Math.abs(2*lN - 1)) * sN
    val x = c * (1 - Math.abs((h/60.0) % 2 - 1)); val m = lN - c/2
    val (r,g,b) = when {
        h < 60  -> Triple(c,x,0.0); h < 120 -> Triple(x,c,0.0)
        h < 180 -> Triple(0.0,c,x); h < 240 -> Triple(0.0,x,c)
        h < 300 -> Triple(x,0.0,c); else     -> Triple(c,0.0,x)
    }
    return Triple(((r+m)*255).toInt(), ((g+m)*255).toInt(), ((b+m)*255).toInt())
}

// RGB → HSV
fun rgbToHsv(r: Int, g: Int, b: Int): Triple<Int, Int, Int> {
    val rN = r/255.0; val gN = g/255.0; val bN = b/255.0
    val max = maxOf(rN,gN,bN); val min = minOf(rN,gN,bN); val delta = max - min
    if (delta == 0.0) return Triple(0, 0, (max*100).toInt())
    val s = delta / max
    var h = when (max) {
        rN   -> ((gN - bN) / delta) % 6
        gN   -> (bN - rN) / delta + 2
        else -> (rN - gN) / delta + 4
    }
    h = ((h * 60) + 360) % 360
    return Triple(h.toInt(), (s*100).toInt(), (max*100).toInt())
}
println(rgbToHsv(59, 130, 246)) // (217, 76, 96)

// HSV → RGB
fun hsvToRgb(h: Int, s: Int, v: Int): Triple<Int, Int, Int> {
    val sN = s/100.0; val vN = v/100.0
    val c = vN * sN; val x = c * (1 - Math.abs((h/60.0) % 2 - 1)); val m = vN - c
    val (r,g,b) = when {
        h < 60  -> Triple(c,x,0.0); h < 120 -> Triple(x,c,0.0)
        h < 180 -> Triple(0.0,c,x); h < 240 -> Triple(0.0,x,c)
        h < 300 -> Triple(x,0.0,c); else     -> Triple(c,0.0,x)
    }
    return Triple(((r+m)*255).toInt(), ((g+m)*255).toInt(), ((b+m)*255).toInt())
}
println(hsvToRgb(217, 76, 96)) // (59, 130, 246)`,
    },
  ],
};
