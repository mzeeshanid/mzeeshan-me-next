import { FaDatabase, FaFileWord, FaFilm, FaFlask, FaFont, FaHeadphones, FaTriangleExclamation, FaUsers } from "react-icons/fa6";
import { LuArchive, LuBoxes, LuFiles, LuImage, LuMonitor, LuPalette, LuVideo } from "react-icons/lu";
import { SampleFileFeature, SampleFilesStatsData } from "./statsData";

const communityDrivenLibrary: SampleFileFeature = {
  title: "Community-Driven Library",
  description:
    "Can't find the exact variant you need? Request it — the library grows based on real developer and QA feedback.",
  icon: FaUsers,
};

const useCaseBasedTesting = (scenario: string): SampleFileFeature => ({
  title: "Use-Case Based Testing",
  description: `Variants are organized by ${scenario} — not just file size — so every one maps to a real, concrete testing scenario.`,
  icon: FaFlask,
});

const corruptAndEdgeCaseFiles = (fileType: string): SampleFileFeature => ({
  title: "Corrupt & Edge-Case Files",
  description: `Zero-byte, truncated, and malformed ${fileType} files are included so you can verify your app fails gracefully instead of crashing.`,
  icon: FaTriangleExclamation,
});

export const sampleFilesCategoryFeaturesData: Record<string, SampleFilesStatsData> = {
  videos: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Video Sample Files",
    details:
      "A web app that allows developers and testers to download free video sample files for testing purposes.",
    features: [
      {
        title: "11 Video Formats",
        description:
          "MP4, MOV, MKV, WEBM, AVI, FLV, WMV, 3GP, 3G2, MPG, and OGV — the formats your users actually upload and stream.",
        icon: LuVideo,
      },
      useCaseBasedTesting("resolution, frame rate, and codec"),
      {
        title: "Codec Compatibility",
        description:
          "Test H.264, H.265, and VP9 encoded files across every container format, and catch codec-specific playback failures before your users do.",
        icon: FaFilm,
      },
      {
        title: "Every Resolution & Frame Rate",
        description:
          "From 480p SD to 4K UHD, with multiple frame rates and both portrait and landscape orientations.",
        icon: LuMonitor,
      },
      corruptAndEdgeCaseFiles("video"),
      communityDrivenLibrary,
    ],
  },

  audios: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Audio Sample Files",
    details:
      "A web app that allows developers and testers to download free audio sample files for testing purposes.",
    features: [
      {
        title: "11 Audio Formats",
        description:
          "MP3, WAV, FLAC, AAC, OGG, OPUS, WMA, AIFF, M4A, M4R, and MMF — covering both lossy and lossless codecs.",
        icon: FaHeadphones,
      },
      useCaseBasedTesting("channel configuration and sample rate"),
      {
        title: "Multi-Channel Variants",
        description:
          "Mono, stereo, 5.1, and 7.1 surround configurations across multiple sample rates and bit depths, for end-to-end audio pipeline testing.",
        icon: FaHeadphones,
      },
      {
        title: "Lossy & Lossless Codecs",
        description:
          "Test compressed formats like MP3 and AAC alongside lossless formats like FLAC and WAV to catch codec-specific quality issues.",
        icon: FaFilm,
      },
      corruptAndEdgeCaseFiles("audio"),
      communityDrivenLibrary,
    ],
  },

  docs: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Document Sample Files",
    details:
      "A web app that allows developers and testers to download free document sample files for testing purposes.",
    features: [
      {
        title: "13 Document Formats",
        description:
          "PDF, DOCX, DOC, RTF, TXT, CSV, XLSX, XLS, PPTX, PPT, KEY, NUMBERS, and PAGES — the most common office and data-exchange formats.",
        icon: FaFont,
      },
      useCaseBasedTesting("document structure and formatting"),
      {
        title: "Structured Data Formats",
        description:
          "CSV variants with different delimiters, quoted fields, and Unicode content — built to stress-test parsers and spreadsheet importers.",
        icon: FaDatabase,
      },
      {
        title: "Formatting Edge Cases",
        description:
          "DOCX, RTF, and PDF variants include embedded tables, images, headers/footers, and special characters for testing conversion tools.",
        icon: FaFileWord,
      },
      corruptAndEdgeCaseFiles("document"),
      communityDrivenLibrary,
    ],
  },

  images: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Image Sample Files",
    details:
      "A web app that allows developers and testers to download free image sample files for testing purposes.",
    features: [
      {
        title: "11 Image Formats",
        description:
          "PNG, JPG, GIF, WebP, SVG, BMP, TIFF, TGA, HDR, EPS, and WBMP — covering both raster and vector formats.",
        icon: LuImage,
      },
      useCaseBasedTesting("color profile, resolution, and transparency"),
      {
        title: "Transparency & Color Profiles",
        description:
          "Alpha-channel transparency, CMYK color space for print pipelines, high-DPI/Retina files, and grayscale variants.",
        icon: LuPalette,
      },
      {
        title: "Raster & Vector Coverage",
        description:
          "Test pixel-based formats like PNG and JPEG alongside vector formats like SVG and EPS for scaling and print pipeline tests.",
        icon: LuBoxes,
      },
      corruptAndEdgeCaseFiles("image"),
      communityDrivenLibrary,
    ],
  },

  archives: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Archive Sample Files",
    details:
      "A web app that allows developers and testers to download free archive sample files for testing purposes.",
    features: [
      {
        title: "6 Archive Formats",
        description:
          "ZIP, RAR, 7ZIP, TAR, TAR.GZ, and TAR.BZ — the most common compression formats for file distribution and backups.",
        icon: LuArchive,
      },
      useCaseBasedTesting("compression algorithm and size"),
      {
        title: "Multiple Compression Algorithms",
        description:
          "ZIP's DEFLATE, 7-Zip's LZMA, RAR's proprietary format, and gzip/bzip2-based TAR variants — for testing extraction libraries.",
        icon: LuBoxes,
      },
      {
        title: "Small to Large Bundles",
        description:
          "From small test archives to large multi-file bundles, for stress-testing extraction speed, memory usage, and upload handling.",
        icon: LuArchive,
      },
      corruptAndEdgeCaseFiles("archive"),
      communityDrivenLibrary,
    ],
  },

  others: {
    badge: "Free & Instant",
    heading: "Ultimate Resource for Sample Files",
    details:
      "A web app that allows developers and testers to download free sample files for testing purposes.",
    features: [
      {
        title: "4 Miscellaneous Formats",
        description:
          "JSON, XML, and the font formats OTF and TTF — with more added over time based on developer requests.",
        icon: LuFiles,
      },
      useCaseBasedTesting("schema and structure"),
      {
        title: "Structured Data Formats",
        description:
          "JSON with nested objects and arrays, and XML with namespaces and schema variations — plus malformed versions to test parsers.",
        icon: FaDatabase,
      },
      {
        title: "Web Font Testing",
        description:
          "TrueType and OpenType font variants for testing font-loading pipelines, glyph rendering, and web font embedding.",
        icon: FaFont,
      },
      corruptAndEdgeCaseFiles("miscellaneous"),
      communityDrivenLibrary,
    ],
  },
};
