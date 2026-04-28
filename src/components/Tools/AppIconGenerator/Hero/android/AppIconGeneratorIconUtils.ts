import React from "react";

// ─── Pack loaders (static imports so webpack can tree-shake / chunk correctly) ─

const PACK_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {
  ai:  () => import("react-icons/ai"),
  bi:  () => import("react-icons/bi"),
  bs:  () => import("react-icons/bs"),
  cg:  () => import("react-icons/cg"),
  ci:  () => import("react-icons/ci"),
  cg2: () => import("react-icons/cg"),
  di:  () => import("react-icons/di"),
  fa:  () => import("react-icons/fa6"),  // prefer v6
  fa6: () => import("react-icons/fa6"),
  fc:  () => import("react-icons/fc"),
  fi:  () => import("react-icons/fi"),
  gi:  () => import("react-icons/gi"),
  go:  () => import("react-icons/go"),
  gr:  () => import("react-icons/gr"),
  hi:  () => import("react-icons/hi2"), // prefer v2
  hi2: () => import("react-icons/hi2"),
  im:  () => import("react-icons/im"),
  io:  () => import("react-icons/io5"), // prefer v5
  io5: () => import("react-icons/io5"),
  lia: () => import("react-icons/lia"),
  lu:  () => import("react-icons/lu"),
  md:  () => import("react-icons/md"),
  pi:  () => import("react-icons/pi"),
  ri:  () => import("react-icons/ri"),
  rx:  () => import("react-icons/rx"),
  si:  () => import("react-icons/si"),
  sl:  () => import("react-icons/sl"),
  tb:  () => import("react-icons/tb"),
  tfi: () => import("react-icons/tfi"),
  ti:  () => import("react-icons/ti"),
  vsc: () => import("react-icons/vsc"),
  wi:  () => import("react-icons/wi"),
};

// ─── Module cache so each pack is only loaded once ────────────────────────────

const moduleCache = new Map<string, Record<string, unknown>>();

// ─── Prefix extraction ────────────────────────────────────────────────────────

/**
 * Extracts the react-icons pack key from an icon name.
 * e.g. "FaHeart" → "fa", "VscGithub" → "vsc", "TbBrand" → "tb"
 */
export function getPrefixFromIconName(iconName: string): string | null {
  const match = iconName.match(/^([A-Z][a-z]+)/);
  if (!match) return null;
  return match[1].toLowerCase(); // "Fa" → "fa", "Vsc" → "vsc"
}

// ─── Dynamic loader ───────────────────────────────────────────────────────────

export type IconComponent = React.FC<{ size?: number; color?: string }>;

export async function loadIconComponent(
  iconName: string,
): Promise<IconComponent | null> {
  if (!iconName.trim()) return null;

  const prefix = getPrefixFromIconName(iconName);
  if (!prefix) return null;

  const loader = PACK_LOADERS[prefix];
  if (!loader) return null;

  try {
    let mod = moduleCache.get(prefix);
    if (!mod) {
      mod = await loader();
      moduleCache.set(prefix, mod);
    }
    const component = mod[iconName];
    if (typeof component !== "function") return null;
    return component as IconComponent;
  } catch {
    return null;
  }
}

// ─── SVG extractor (browser-only) ────────────────────────────────────────────
// Must be called outside React's commit phase (e.g. inside setTimeout).

export function extractIconSvg(
  Component: IconComponent,
  color: string,
): string {
  if (typeof document === "undefined") return "";
  const { createRoot } = require("react-dom/client") as typeof import("react-dom/client");
  const { flushSync } = require("react-dom") as typeof import("react-dom");
  const { createElement } = require("react") as typeof import("react");

  // Detached container — never appended to document.body so the live
  // document layout is never dirtied and no forced reflow occurs.
  const container = document.createElement("div");
  const root = createRoot(container);
  try {
    flushSync(() => {
      root.render(createElement(Component, { size: 100, color }));
    });
    const svg = container.querySelector("svg");
    if (!svg) return "";
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    return new XMLSerializer().serializeToString(svg);
  } finally {
    root.unmount();
  }
}
