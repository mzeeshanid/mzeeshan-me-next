import { SampleFileVariantModel } from "@/apis/sampleFiles/sampleFilesExtensionDetails";
import SharedNoteBanner from "@/components/Tools/SampleFiles/Details/SharedNoteBanner";
import { cardStyle } from "@/components/Tools/SampleFiles/Shared/ExtensionCard";
import {
  sectionColor,
  sectionInitials,
} from "@/components/Tools/SampleFiles/Shared/variantSections";
import { Box, Collapsible, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

interface VariantSectionCardProps {
  sectionKey: string;
  label: string;
  items: SampleFileVariantModel[];
  initialOpen?: boolean;
  sharedNote: string | null;
  palette: string;
  renderCard: (variant: SampleFileVariantModel) => React.ReactNode;
}

// Mirrors SampleFilesExtensions' CategorySection so a variant group (e.g.
// "Resolution", "Frame Rate") looks and behaves the same as a category
// group on the main extension listing — same card chrome, colored
// initials badge, and collapse/expand affordance.
const VariantSectionCard: React.FC<VariantSectionCardProps> = ({
  sectionKey,
  label,
  items,
  initialOpen = false,
  sharedNote,
  palette,
  renderCard,
}) => {
  const [open, setOpen] = React.useState(initialOpen);
  const color = sectionColor(sectionKey);
  const initials = sectionInitials(label);

  return (
    <Box {...cardStyle}>
      <Collapsible.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        collapsedHeight={0}
      >
        <Collapsible.Trigger asChild>
          <HStack
            px={4}
            py={4}
            gap={3}
            cursor="pointer"
            userSelect="none"
            justify="space-between"
            _hover={{ bg: "bg.subtle" }}
          >
            <HStack gap={3} minW={0}>
              <Box
                w={10}
                h={10}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={`${color}.subtle`}
                color={`${color}.fg`}
                fontFamily="mono"
                fontWeight="bold"
                fontSize="xs"
                flexShrink={0}
              >
                {initials}
              </Box>
              <HStack gap={2} align="baseline" minW={0} flexWrap="wrap">
                <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                  {label}
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {items.length} variant{items.length !== 1 ? "s" : ""}
                </Text>
              </HStack>
            </HStack>

            <Collapsible.Indicator>
              <Box color="fg.muted">
                {open ? <LuChevronDown size={18} /> : <LuChevronRight size={18} />}
              </Box>
            </Collapsible.Indicator>
          </HStack>
        </Collapsible.Trigger>

        <Collapsible.Content>
          {/* pt gives the first row's translateY(-2px) hover lift room —
              Collapsible.Content clips overflow to animate its height, so
              without this buffer that lift gets cut off at the top edge. */}
          <Box px={4} pt={2} pb={4}>
            {sharedNote && <SharedNoteBanner note={sharedNote} palette={palette} />}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
              {items.map((v) => renderCard(v))}
            </SimpleGrid>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

export default VariantSectionCard;
