import {
  imageFormatOptions,
  getImageConversionRouteByPair,
  getImageConversionRouteBySlug,
  getRelatedImageConversionRoutes,
  imageConversionRoutes,
  imageFormatBrowserSupport,
  checkBrowserSupportsFormat,
  getFormatBrowserSupport,
} from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { ImageFormat } from "@/data/tools/imageFormatConverter/types";
import { describe, expect, it } from "vitest";

describe("imageConversionRoutes", () => {
  describe("imageFormatOptions", () => {
    it("contains all supported image formats", () => {
      const values = imageFormatOptions.map((opt) => opt.value);
      expect(values).toContain("png");
      expect(values).toContain("jpg");
      expect(values).toContain("webp");
      expect(values).toContain("bmp");
      expect(values).toContain("tiff");
      expect(values).toContain("gif");
      expect(values).toContain("avif");
      expect(values).toContain("ico");
      expect(values).toContain("heic");
    });

    it("has labels for all formats", () => {
      imageFormatOptions.forEach((opt) => {
        expect(opt.label).toBeDefined();
        expect(opt.label.length).toBeGreaterThan(0);
      });
    });
  });

  describe("imageConversionRoutes", () => {
    it("has active routes for common conversions", () => {
      const activeRoutes = imageConversionRoutes.filter(
        (route) => route.status === "active",
      );
      expect(activeRoutes.length).toBeGreaterThan(0);
    });

    it("has routes for all format pairs", () => {
      expect(imageConversionRoutes.length).toBeGreaterThan(0);
    });

    it("each route has required properties", () => {
      imageConversionRoutes.forEach((route) => {
        expect(route.sourceFormat).toBeDefined();
        expect(route.targetFormat).toBeDefined();
        expect(route.slug).toBeDefined();
        expect(route.path).toBeDefined();
        expect(route.label).toBeDefined();
        expect(route.status).toBeDefined();
      });
    });
  });

  describe("getImageConversionRouteByPair", () => {
    it("finds route for valid conversion pair", () => {
      const route = getImageConversionRouteByPair("png", "jpg");
      expect(route).toBeDefined();
      expect(route?.sourceFormat).toBe("png");
      expect(route?.targetFormat).toBe("jpg");
    });

    it("finds route for jpg to png", () => {
      const route = getImageConversionRouteByPair("jpg", "png");
      expect(route).toBeDefined();
      expect(route?.sourceFormat).toBe("jpg");
      expect(route?.targetFormat).toBe("png");
    });

    it("returns undefined for invalid pair", () => {
      const route = getImageConversionRouteByPair("invalid", "jpg");
      expect(route).toBeUndefined();
    });

    it("returns undefined for same source and target", () => {
      const route = getImageConversionRouteByPair("jpg", "jpg");
      expect(route).toBeUndefined();
    });
  });

  describe("getImageConversionRouteBySlug", () => {
    it("finds route by slug", () => {
      const route = getImageConversionRouteBySlug("png-to-jpg");
      expect(route).toBeDefined();
      if (route) {
        expect(route.sourceFormat).toBe("png");
        expect(route.targetFormat).toBe("jpg");
      }
    });

    it("returns undefined for unknown slug", () => {
      const route = getImageConversionRouteBySlug("unknown-slug");
      expect(route).toBeUndefined();
    });
  });

  describe("getRelatedImageConversionRoutes", () => {
    it("returns related routes for given slug", () => {
      const routes = getRelatedImageConversionRoutes("png-to-jpg", 4);
      expect(routes.length).toBeGreaterThan(0);
      expect(routes.length).toBeLessThanOrEqual(4);
    });

    it("excludes the current route", () => {
      const routes = getRelatedImageConversionRoutes("png-to-jpg", 10);
      routes.forEach((route) => {
        expect(route.slug).not.toBe("png-to-jpg");
      });
    });

    it("returns active routes when slug not found", () => {
      const routes = getRelatedImageConversionRoutes("unknown-slug", 4);
      routes.forEach((route) => {
        expect(route.status).toBe("active");
      });
    });
  });

  describe("route output configuration", () => {
    it("active routes have output mime type", () => {
      imageConversionRoutes
        .filter((route) => route.status === "active")
        .forEach((route) => {
          expect(route.outputMimeType).toBeDefined();
        });
    });

    it("active routes have output extension", () => {
      imageConversionRoutes
        .filter((route) => route.status === "active")
        .forEach((route) => {
          expect(route.outputExtension).toBeDefined();
        });
    });
  });

  describe("AVIF format support", () => {
    it("has AVIF in imageFormatOptions", () => {
      const avifOption = imageFormatOptions.find((opt) => opt.value === "avif");
      expect(avifOption).toBeDefined();
      expect(avifOption?.label).toBe("AVIF");
    });

    it("has routes for AVIF conversions", () => {
      const avifRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "avif" || route.sourceFormat === "avif",
      );
      expect(avifRoutes.length).toBeGreaterThan(0);
    });

    it("AVIF output supports quality", () => {
      const avifRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "avif" && route.status === "active",
      );
      avifRoutes.forEach((route) => {
        expect(route.supportsQuality).toBe(true);
      });
    });
  });

  describe("ICO format support", () => {
    it("has ICO in imageFormatOptions", () => {
      const icoOption = imageFormatOptions.find((opt) => opt.value === "ico");
      expect(icoOption).toBeDefined();
      expect(icoOption?.label).toBe("ICO");
    });

    it("has routes for ICO conversions", () => {
      const icoRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "ico" || route.sourceFormat === "ico",
      );
      expect(icoRoutes.length).toBeGreaterThan(0);
    });

    it("ICO output does not support quality", () => {
      const icoRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "ico" && route.status === "active",
      );
      icoRoutes.forEach((route) => {
        expect(route.supportsQuality).toBeUndefined();
      });
    });
  });

  describe("HEIC format support", () => {
    it("has HEIC in imageFormatOptions", () => {
      const heicOption = imageFormatOptions.find((opt) => opt.value === "heic");
      expect(heicOption).toBeDefined();
      expect(heicOption?.label).toBe("HEIC");
    });

    it("has routes for HEIC conversions", () => {
      const heicRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "heic" || route.sourceFormat === "heic",
      );
      expect(heicRoutes.length).toBeGreaterThan(0);
    });

    it("HEIC output does not support quality", () => {
      const heicRoutes = imageConversionRoutes.filter(
        (route) => route.targetFormat === "heic" && route.status === "active",
      );
      heicRoutes.forEach((route) => {
        expect(route.supportsQuality).toBeUndefined();
      });
    });
  });

  describe("browser support detection", () => {
    it("has browser support data for all formats", () => {
      const supportedFormats = ["png", "jpg", "webp", "bmp", "tiff", "gif", "avif", "ico", "heic"];
      supportedFormats.forEach((format) => {
        expect(imageFormatBrowserSupport[format as keyof typeof imageFormatBrowserSupport]).toBeDefined();
      });
    });

    it("AVIF has specific browser version requirements", () => {
      const avifSupport = imageFormatBrowserSupport.avif;
      expect(avifSupport.since).toBe("2022");
      expect(avifSupport.browsers.length).toBeGreaterThan(0);
    });

    it("ICO has universal browser support", () => {
      const icoSupport = imageFormatBrowserSupport.ico;
      expect(icoSupport.browsers).toContain("All browsers");
    });

    it("HEIC has Safari-only browser support", () => {
      const heicSupport = imageFormatBrowserSupport.heic;
      expect(heicSupport.browsers).toContain("Safari 11+ (iOS/macOS only)");
      expect(heicSupport.since).toBe("2016");
    });

    it("getFormatBrowserSupport returns correct data", () => {
      const avifSupport = getFormatBrowserSupport("avif");
      expect(avifSupport.supported).toBeDefined();
      expect(avifSupport.browsers).toBeDefined();
      expect(avifSupport.since).toBe("2022");
    });
  });
});