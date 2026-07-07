import {
  Box,
  Center,
  SimpleGrid,
  Skeleton,
  Stack,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------
const SectionHeaderSkeleton = ({ centered = false }: { centered?: boolean }) => (
  <Stack gap={3} align={centered ? "center" : "flex-start"} w="full">
    <Skeleton height="4" width="100px" rounded="full" />
    <Skeleton height="8" width={centered ? "60%" : "80%"} />
    <Skeleton height="4" width={centered ? "75%" : "90%"} />
    <Skeleton height="4" width={centered ? "50%" : "70%"} />
  </Stack>
);

// ---------------------------------------------------------------------------
// Per-section skeletons (shapes mirror each section's real layout)
// ---------------------------------------------------------------------------

// Section header (centered) + single-column list of skill rows
export const MySkillsSkeleton = () => (
  <Stack gap={8}>
    <Center>
      <Box w={{ base: "full", md: "60%" }}>
        <SectionHeaderSkeleton centered />
      </Box>
    </Center>
    <Stack gap={6}>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} height="120px" rounded="xl" />
      ))}
    </Stack>
  </Stack>
);

// Centered heading + grid of framework cards
export const MyFrameworksSkeleton = () => (
  <Stack gap={8} align="center">
    <Box w={{ base: "full", md: "60%" }}>
      <SectionHeaderSkeleton centered />
    </Box>
    <SimpleGrid w="full" columns={{ base: 2, md: 3, lg: 4 }} gap={4}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} height="80px" rounded="xl" />
      ))}
    </SimpleGrid>
  </Stack>
);

// Two-column: text + tag list on left, image placeholder on right
export const MyThirdPartySDKsSkeleton = () => (
  <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 1, md: 2 }}>
    <Stack gap={4}>
      <Skeleton height="6" width="80px" rounded="full" />
      <SectionHeaderSkeleton />
      <Wrap>
        {Array.from({ length: 8 }).map((_, i) => (
          <WrapItem key={i}>
            <Skeleton height="7" width="80px" rounded="md" />
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
    <Skeleton height="300px" rounded="2xl" />
  </SimpleGrid>
);

// Two-column: feature list on left, pricing card on right
export const MyPricingSkeleton = () => (
  <SimpleGrid gap={{ base: 4, md: 8 }} columns={{ base: 1, md: 2 }}>
    <Stack gap={4} pt={4} pb={4}>
      <Skeleton height="4" width="80px" />
      <Skeleton height="10" width="90%" />
      <Skeleton height="8" width="70%" />
      <Stack gap={3} pt={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height="5" width={i % 2 === 0 ? "100%" : "85%"} />
        ))}
      </Stack>
    </Stack>
    <Skeleton height="380px" rounded="2xl" />
  </SimpleGrid>
);

// Section header (centered) + 3-column stat cards
export const MyPerformanceStatsSkeleton = () => (
  <Stack gap={8}>
    <Center>
      <Box w={{ base: "full", md: "60%" }}>
        <SectionHeaderSkeleton centered />
      </Box>
    </Center>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} height="120px" rounded="xl" />
      ))}
    </SimpleGrid>
  </Stack>
);

// Small centered CTA: tag + heading + button
export const MyCTASkeleton = () => (
  <VStack gap={6}>
    <Skeleton height="8" width="160px" rounded="full" />
    <Stack gap={3} align="center" w={{ base: "full", md: "50%" }}>
      <Skeleton height="8" width="80%" />
      <Skeleton height="4" width="90%" />
      <Skeleton height="4" width="70%" />
    </Stack>
    <Skeleton height="10" width="130px" rounded="md" />
  </VStack>
);

// Section header + 2×2 app cards + view-all strip
export const MyAppsSkeleton = () => (
  <Stack gap={8}>
    <VStack gap={4}>
      <SectionHeaderSkeleton centered />
    </VStack>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height="160px" rounded="xl" />
      ))}
    </SimpleGrid>
    <Skeleton height="44px" rounded="md" />
  </Stack>
);

// Section header + 2×2 tool cards + view-all strip
export const MyFreeToolsSkeleton = () => (
  <Stack gap={8}>
    <VStack gap={4}>
      <SectionHeaderSkeleton centered />
    </VStack>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height="160px" rounded="xl" />
      ))}
    </SimpleGrid>
    <Skeleton height="44px" rounded="md" />
  </Stack>
);

// Two-column: text header on left, 2×2 number grid on right
export const MyStatsSkeleton = () => (
  <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
    <Stack gap={4}>
      <SectionHeaderSkeleton />
    </Stack>
    <SimpleGrid columns={2} gap={8}>
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} height="80px" rounded="lg" />
      ))}
    </SimpleGrid>
  </SimpleGrid>
);

// Stats bar + (header column + review cards grid)
export const MyClientReviewsSkeleton = () => (
  <Stack gap={8}>
    <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} height="60px" rounded="xl" />
      ))}
    </SimpleGrid>
    <Stack direction={{ base: "column", md: "row" }} gap={4}>
      <Skeleton
        flexShrink={0}
        width={{ base: "full", md: "200px" }}
        height={{ base: "120px", md: "300px" }}
        rounded="xl"
      />
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4} flex={1}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} height="140px" rounded="xl" />
        ))}
      </SimpleGrid>
    </Stack>
  </Stack>
);

// Centered heading + 2-column contribution cards
export const MyOpenSourceContributionSkeleton = () => (
  <Stack gap={6} align="center">
    <Box w={{ base: "full", md: "50%" }}>
      <Skeleton height="8" width="80%" mx="auto" />
    </Box>
    <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} gap={4}>
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} height="160px" rounded="xl" />
      ))}
    </SimpleGrid>
  </Stack>
);
