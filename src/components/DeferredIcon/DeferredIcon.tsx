import { Box, Icon, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { useIsInteractive } from "@/hooks/useIsInteractive";

type IconProps = React.ComponentPropsWithoutRef<typeof Icon>;

export type DeferredIconProps = Omit<IconProps, "as"> & {
  icon: IconType;
};

const SIZE_PX: Record<string, string> = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "28px",
  "2xl": "32px",
  "3xl": "40px",
  "4xl": "48px",
};

function resolveSize(size?: unknown): string {
  if (!size || typeof size === "object") return "1em";
  const s = String(size);
  return SIZE_PX[s] ?? s;
}

const DeferredIcon: React.FC<DeferredIconProps> = ({ icon, size, ...rest }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (!isInteractive) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInteractive]);

  const px = resolveSize(size as string | undefined);

  if (!ready) {
    return (
      <Box
        as="span"
        ref={ref}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        w={px}
        h={px}
      >
        <Skeleton w={px} h={px} borderRadius="sm" />
      </Box>
    );
  }

  return <Icon as={icon} size={size} {...rest} />;
};

export default DeferredIcon;
