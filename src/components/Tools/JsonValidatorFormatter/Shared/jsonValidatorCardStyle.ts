// Shared card recipe for the JSON Validator & Formatter tool, matching the
// card style used for sample-files extensions/variants (see
// src/components/Tools/SampleFiles/Shared/ExtensionCard.tsx and
// src/components/Tools/SampleFiles/Details/VariantCard.tsx) so cards look
// consistent across the whole tool instead of drifting per-section.
export const jsonValidatorCardStyle = {
  borderRadius: "2xl",
  overflow: "hidden" as const,
  borderWidth: "1px",
  borderColor: "border.subtle",
  bg: "bg.muted",
};

export const jsonValidatorCardHover = (palette: string) => ({
  borderColor: `${palette}.400`,
  transform: "translateY(-2px)",
});
