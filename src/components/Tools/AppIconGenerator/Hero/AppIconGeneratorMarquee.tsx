import { appIconGeneratorMarqueeIcons } from "@/data/tools/appIconGenerator/appIconGeneratorData";
import { Box, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import React from "react";

const MARQUEE_GAP = "1rem";

const moveLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(calc(-50% - (${MARQUEE_GAP} / 2))); }
`;

const moveRight = keyframes`
  from { transform: translateX(calc(-50% - (${MARQUEE_GAP} / 2))); }
  to { transform: translateX(0); }
`;

const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => {
  const edgeFade =
    "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)";
  const items = appIconGeneratorMarqueeIcons;

  return (
    <Box
      overflow="hidden"
      position="relative"
      style={{
        maskImage: edgeFade,
        WebkitMaskImage: edgeFade,
      }}
    >
      <Box
        display="flex"
        gap={MARQUEE_GAP}
        minW="max-content"
        animation={`${reverse ? moveRight : moveLeft} 40s linear infinite`}
      >
        {[0, 1].map((groupIndex) => (
          <HStack key={groupIndex} gap={4} minW="max-content" flexShrink={0}>
            {items.map((src, index) => (
              <Box
                key={`${groupIndex}-${src}-${index}`}
                borderWidth="1px"
                borderRadius="2xl"
                overflow="hidden"
                bg="bg.subtle"
                p={3}
                boxShadow="sm"
              >
                <Image
                  src={src}
                  alt="App icon example"
                  width={72}
                  height={72}
                />
              </Box>
            ))}
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

const AppIconGeneratorMarquee: React.FC = () => {
  return (
    <Box as="section">
      <Box mb={4}>
        <MarqueeRow />
      </Box>
      <MarqueeRow reverse />
    </Box>
  );
};

export default AppIconGeneratorMarquee;
