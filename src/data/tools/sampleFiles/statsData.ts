import { IconType } from "react-icons";
import { BiSolidCheckShield, BiSolidSelectMultiple } from "react-icons/bi";
import { FaFileAlt } from "react-icons/fa";
import { FaChartSimple, FaDatabase, FaDownload, FaFilm, FaFlask, FaGears, FaHeadphones, FaMoneyBill1, FaUsers } from "react-icons/fa6";

export type SampleFileFeature = {
  title: string;
  description: string;
  icon: IconType;
};

export type SampleFilesStatsData = {
  badge: string;
  heading: string;
  details: string;
  features: SampleFileFeature[];
};

export const sampleFilesStatsData: SampleFilesStatsData = {
  badge: "Free & Instant",
  heading: "Ultimate Resource for Sample Files",
  details:
    "A web app that allows developers and testers to download free sample files for testing purposes.",
  features: [
    {
      title: "55+ File Types",
      description:
        "Access a wide variety of file formats for your testing needs.",
      icon: FaFileAlt,
    },
    {
      title: "Multiple Variants",
      description:
        "Files organized by real testing scenarios — not just size. Stereo, mono, and surround sound audio; transparent, CMYK, and high-DPI images; portrait and landscape video — matched to what your app actually needs to handle.",
      icon: BiSolidSelectMultiple,
    },
    {
      title: "100% Free",
      description:
        "No hidden costs, no registration required, completely free to use.",
      icon: FaMoneyBill1,
    },
    {
      title: "Instant Download",
      description:
        "Download your sample files instantly without any waiting time.",
      icon: FaDownload,
    },
    {
      title: "Privacy Protected",
      description:
        "Your data is safe. We don't track or store any personal information.",
      icon: BiSolidCheckShield,
    },
    {
      title: "Easy to Use",
      description:
        "Simple and intuitive interface that anyone can use without technical knowledge.",
      icon: FaChartSimple,
    },
    {
      title: "Use-Case Based Testing",
      description:
        "Every variant targets a specific developer scenario. Test how your app handles a corrupted PDF, a zero-byte file, an oversized image, or a 96kHz audio track — not just small, medium, and large.",
      icon: FaFlask,
    },
    {
      title: "Multi-Channel Audio Variants",
      description:
        "Validate audio pipelines end-to-end with mono, stereo, 5.1, and 7.1 surround sound files across multiple sample rates (44.1 kHz, 48 kHz, 96 kHz) and bit depths — essential for media player, streaming, and audio app testing.",
      icon: FaHeadphones,
    },
    {
      title: "Codec & Format Compatibility",
      description:
        "Same content, multiple codec combinations. Test H.264, H.265, and VP9 video; AAC, MP3, and FLAC audio — catch codec-specific playback failures before your users do.",
      icon: FaFilm,
    },
    {
      title: "CI/CD & Automation Ready",
      description:
        "Permanent, direct download URLs — no redirects, no CAPTCHAs, no rate limits. Drop them straight into your test suites, GitHub Actions workflows, or shell scripts for fully automated file-upload and processing tests.",
      icon: FaGears,
    },
    {
      title: "Community-Driven Library",
      description:
        "Can't find the exact variant you need? Request it. The library grows based on real developer and QA feedback — new formats, codecs, channel configurations, and edge-case files added regularly.",
      icon: FaUsers,
    },
    {
      title: "Structured Data Formats",
      description:
        "Test CSV parsers, JSON deserializers, and XML processors with dedicated variants — empty files, malformed syntax, Unicode content, and large datasets — to stress-test your data import and export pipelines.",
      icon: FaDatabase,
    },
  ],
};
