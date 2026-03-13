import React from "react";

type Origin = { x: number; y: number };

type UseImageGesturesArgs = {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setOrigin: React.Dispatch<React.SetStateAction<Origin>>;
  prev: () => void;
  next: () => void;
};

export const useImageGestures = ({
  scale,
  setScale,
  setOrigin,
  prev,
  next,
}: UseImageGesturesArgs) => {
  const lastTapRef = React.useRef<number>(0);
  const singleTapTimeoutRef = React.useRef<number | null>(null);

  const isZoomed = scale > 1;

  const onPointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const now = Date.now();
    const isDoubleTap = now - lastTapRef.current < 300;
    lastTapRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;

    // cancel pending single tap
    if (singleTapTimeoutRef.current) {
      clearTimeout(singleTapTimeoutRef.current);
      singleTapTimeoutRef.current = null;
    }

    if (isDoubleTap) {
      if (isZoomed) {
        setScale(1);
        setOrigin({ x: 50, y: 50 });
      } else {
        setOrigin({
          x: (x / rect.width) * 100,
          y:
            ((e.clientY - rect.top) /
              rect.height) *
            100,
        });
        setScale(2.5);
      }
      return;
    }

    // single tap (delay)
    singleTapTimeoutRef.current = window.setTimeout(() => {
      if (isZoomed) return;

      if (isLeftHalf) {
        prev();
      } else {
        next();
      }

      singleTapTimeoutRef.current = null;
    }, 250);
  };

  return { onPointerUp };
};
