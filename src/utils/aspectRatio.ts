export type AspectRatioFormValues = {
  originalWidth: string;
  originalHeight: string;
  desiredWidth?: string;
  desiredHeight?: string;
};

export const gcd = (u: number, v: number): number => {
  if (u === v) return u;
  if (u === 0) return v;
  if (v === 0) return u;

  if ((~u & 1) === 1) {
    if ((v & 1) === 1) return gcd(u >> 1, v);
    return gcd(u >> 1, v >> 1) << 1;
  }

  if ((~v & 1) === 1) return gcd(u, v >> 1);

  if (u > v) return gcd((u - v) >> 1, v);

  return gcd((v - u) >> 1, u);
};

export const simplifyRatio = (w: number, h: number): [number, number] => {
  const d = gcd(w, h);
  return [w / d, h / d];
};

export const formatSmart = (num: number, decimals = 2): string => {
  return num.toFixed(decimals).replace(/\.?0+$/, "");
};

export const calculateMissingAspectRatioDimension = ({
  originalWidth,
  originalHeight,
  desiredWidth,
  desiredHeight,
  roundValues,
  lastEdited,
}: {
  originalWidth: number;
  originalHeight: number;
  desiredWidth?: number;
  desiredHeight?: number;
  roundValues: boolean;
  lastEdited?: "desiredWidth" | "desiredHeight";
}): { desiredWidth: string; desiredHeight: string } => {
  if (lastEdited === "desiredWidth" && desiredWidth) {
    const newHeight = (originalHeight / originalWidth) * desiredWidth;
    const nextHeight = roundValues
      ? Math.round(newHeight).toString()
      : newHeight.toFixed(2);

    return {
      desiredWidth: desiredWidth.toString(),
      desiredHeight: nextHeight,
    };
  }

  if (lastEdited === "desiredHeight" && desiredHeight) {
    const newWidth = (desiredHeight * originalWidth) / originalHeight;
    const nextWidth = roundValues
      ? Math.round(newWidth).toString()
      : newWidth.toFixed(2);

    return {
      desiredWidth: nextWidth,
      desiredHeight: desiredHeight.toString(),
    };
  }

  return { desiredWidth: "", desiredHeight: "" };
};
