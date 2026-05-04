export const MAX_BASE64_FILE_BYTES = 50 * 1024 * 1024;

export type InferredFileType = {
  mimeType: string;
  extension: string;
  label: string;
};

export const inferTypeFromBase64 = (base64: string): InferredFileType | null => {
  try {
    const cleaned = base64.replace(/\s/g, "");
    // Round down to nearest multiple of 4, take up to 16 bytes (24 base64 chars)
    const alignedLen = Math.min(Math.floor(cleaned.length / 4) * 4, 24);
    if (alignedLen < 4) return null;

    const binary = atob(cleaned.slice(0, alignedLen));
    const b = (i: number) => binary.charCodeAt(i);
    const len = binary.length;

    if (len >= 4 && b(0) === 0x89 && b(1) === 0x50 && b(2) === 0x4e && b(3) === 0x47)
      return { mimeType: "image/png", extension: "png", label: "PNG Image" };

    if (len >= 3 && b(0) === 0xff && b(1) === 0xd8 && b(2) === 0xff)
      return { mimeType: "image/jpeg", extension: "jpg", label: "JPEG Image" };

    if (len >= 4 && b(0) === 0x47 && b(1) === 0x49 && b(2) === 0x46 && b(3) === 0x38)
      return { mimeType: "image/gif", extension: "gif", label: "GIF Image" };

    // WebP: RIFF at 0-3, WEBP at 8-11 (needs 12 bytes = 16 base64 chars)
    if (
      len >= 12 &&
      b(0) === 0x52 && b(1) === 0x49 && b(2) === 0x46 && b(3) === 0x46 &&
      b(8) === 0x57 && b(9) === 0x45 && b(10) === 0x42 && b(11) === 0x50
    )
      return { mimeType: "image/webp", extension: "webp", label: "WebP Image" };

    if (len >= 2 && b(0) === 0x42 && b(1) === 0x4d)
      return { mimeType: "image/bmp", extension: "bmp", label: "BMP Image" };

    if (len >= 4 && b(0) === 0x00 && b(1) === 0x00 && b(2) === 0x01 && b(3) === 0x00)
      return { mimeType: "image/x-icon", extension: "ico", label: "Icon File" };

    // %PDF
    if (len >= 4 && b(0) === 0x25 && b(1) === 0x50 && b(2) === 0x44 && b(3) === 0x46)
      return { mimeType: "application/pdf", extension: "pdf", label: "PDF Document" };

    // ZIP / DOCX / XLSX / PPTX — all share PK\x03\x04 header
    if (len >= 4 && b(0) === 0x50 && b(1) === 0x4b && b(2) === 0x03 && b(3) === 0x04)
      return { mimeType: "application/zip", extension: "zip", label: "ZIP Archive" };

    // Compound Document (DOC / XLS / PPT legacy)
    if (len >= 4 && b(0) === 0xd0 && b(1) === 0xcf && b(2) === 0x11 && b(3) === 0xe0)
      return { mimeType: "application/msword", extension: "doc", label: "Office Document" };

    // ID3 tag → MP3
    if (len >= 3 && b(0) === 0x49 && b(1) === 0x44 && b(2) === 0x33)
      return { mimeType: "audio/mpeg", extension: "mp3", label: "MP3 Audio" };

    // MP3 sync word without ID3
    if (len >= 2 && b(0) === 0xff && (b(1) === 0xfb || b(1) === 0xf3 || b(1) === 0xf2))
      return { mimeType: "audio/mpeg", extension: "mp3", label: "MP3 Audio" };

    // MP4: 'ftyp' box at offset 4
    if (len >= 8 && b(4) === 0x66 && b(5) === 0x74 && b(6) === 0x79 && b(7) === 0x70)
      return { mimeType: "video/mp4", extension: "mp4", label: "MP4 Video" };

    // GZIP
    if (len >= 2 && b(0) === 0x1f && b(1) === 0x8b)
      return { mimeType: "application/gzip", extension: "gz", label: "GZIP Archive" };

    // Text-based formats — decode as UTF-8 and inspect content
    const text = new TextDecoder("utf-8", { fatal: false }).decode(
      new Uint8Array(Array.from(binary).map((c) => c.charCodeAt(0))),
    ).trimStart();

    if (text.startsWith("{") || text.startsWith("["))
      return { mimeType: "application/json", extension: "json", label: "JSON" };

    if (text.toLowerCase().startsWith("<svg"))
      return { mimeType: "image/svg+xml", extension: "svg", label: "SVG Image" };

    if (text.toLowerCase().startsWith("<!doctype html") || text.toLowerCase().startsWith("<html"))
      return { mimeType: "text/html", extension: "html", label: "HTML" };

    if (text.startsWith("<?xml"))
      return { mimeType: "application/xml", extension: "xml", label: "XML" };

    if (text.startsWith("-----BEGIN"))
      return { mimeType: "application/x-pem-file", extension: "pem", label: "PEM Certificate" };

    return null;
  } catch {
    return null;
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
};

export const fixPadding = (input: string): string => {
  const stripped = input.replace(/=+$/, "");
  const remainder = stripped.length % 4;
  if (remainder === 0) return stripped;
  return stripped + "=".repeat(4 - remainder);
};

export const toBase64URL = (standard: string): string =>
  standard.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export const fromBase64URL = (urlSafe: string): string =>
  fixPadding(urlSafe.replace(/-/g, "+").replace(/_/g, "/"));

export const encodeToDataURI = (base64: string, mimeType: string): string =>
  `data:${mimeType};base64,${base64}`;

export const getEncodedSizeBytes = (originalBytes: number): number =>
  Math.ceil(originalBytes / 3) * 4;

export const encodingOverheadLabel = (originalBytes: number): string => {
  const encodedBytes = getEncodedSizeBytes(originalBytes);
  const percent = Math.round(((encodedBytes - originalBytes) / originalBytes) * 100);
  return `${formatBytes(originalBytes)} → ${formatBytes(encodedBytes)} (+${percent}%)`;
};

const getDecodeErrorMessage = (error: unknown): string => {
  const msg = error instanceof Error ? error.message : String(error);
  if (msg.includes("Invalid character")) {
    return "Invalid Base64 character. Standard Base64 uses only A–Z, a–z, 0–9, +, /, and =.";
  }
  if (msg.includes("padding")) {
    return "Incorrect padding. Ensure the string length is a multiple of 4 (padded with = signs).";
  }
  return "Invalid Base64 string. Check for spaces, line breaks, or non-Base64 characters.";
};

export const encodeText = (input: string): string => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const decodeText = (input: string): { output: string; error?: string } => {
  try {
    const cleaned = fixPadding(input.replace(/\s/g, "").trim());
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return { output: new TextDecoder("utf-8").decode(bytes) };
  } catch (error) {
    return { output: "", error: getDecodeErrorMessage(error) };
  }
};

export const encodeFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip "data:<mime>;base64," prefix
      const base64 = result.split(",")[1] ?? "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
};

export const decodeBase64ToBlob = (base64: string, mimeType: string): Blob => {
  const cleaned = fixPadding(base64.replace(/\s/g, ""));
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const getMimeTypeFromFilename = (filename: string): string => {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const mimeMap: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    csv: "text/csv",
    json: "application/json",
    xml: "application/xml",
    html: "text/html",
    htm: "text/html",
    css: "text/css",
    js: "application/javascript",
    ts: "application/typescript",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    wav: "audio/wav",
    zip: "application/zip",
    gz: "application/gzip",
  };
  return mimeMap[ext] ?? "application/octet-stream";
};
