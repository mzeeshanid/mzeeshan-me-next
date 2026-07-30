import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Container, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import SampleFilesCategoryTags from "./SampleFilesCategoryTags";

const SampleFilesStickyCategoryBar: React.FC = () => {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const stuckBg = useColorModeValue(
    "rgba(250, 250, 250, 0.5)",
    "rgba(17, 17, 17, 0.5)",
  );
  const stuckBorderColor = useColorModeValue(
    "rgba(148, 163, 184, 0.22)",
    "rgba(148, 163, 184, 0.18)",
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let rafId: number | null = null;

    const handleScroll = (): void => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const navbarHeight =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--navbar-height",
            ),
          ) || 0;
        setStuck(sentinel.getBoundingClientRect().top <= navbarHeight);
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <Box ref={sentinelRef} h="0" />
      <Box
        position="sticky"
        top="var(--navbar-height, 93px)"
        zIndex={900}
        borderBottomWidth="1px"
        style={{
          background: stuck ? stuckBg : "transparent",
          borderColor: stuck ? stuckBorderColor : "transparent",
          backdropFilter: stuck ? "blur(16px)" : "none",
          WebkitBackdropFilter: stuck ? "blur(16px)" : "none",
          transition: "background 0.2s, backdrop-filter 0.2s, border-color 0.2s",
        }}
      >
        <Container maxW="6xl" px={4} py={3}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap={4}
            alignItems="center"
            justify="center"
          >
            <Text fontSize={"sm"}>{"Categories: "}</Text>
            <SampleFilesCategoryTags />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default SampleFilesStickyCategoryBar;
