import React from "react";
import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useMounted } from "@/hooks/useMounted";
import { base64CodeExamplesData } from "@/data/tools/base64EncoderDecoder";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import {
  Box,
  Button,
  Card,
  Clipboard,
  HStack,
  NativeSelect,
  SegmentGroup,
  VStack,
} from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";

const Base64CodeExamples: React.FC = () => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();
  const data = base64CodeExamplesData;

  const [langKey, setLangKey] = React.useState(data.examples[0].language);
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");

  const current =
    data.examples.find((e) => e.language === langKey) ?? data.examples[0];
  const code = mode === "encode" ? current.encode : current.decode;

  const theme = mounted
    ? colorMode === "dark"
      ? themes.gruvboxMaterialDark
      : themes.gruvboxMaterialLight
    : undefined;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <SectionHeader
          tagline={data.header.badge}
          headline={data.header.title}
          description={data.header.description}
        />

        <Card.Root overflow="hidden" w="full">
          <Card.Header bg="bg.subtle" py={3} px={4}>
            <HStack justify="space-between" flexWrap="wrap" gap={3}>
              <HStack gap={3}>
                <NativeSelect.Root size="sm" width="180px">
                  <NativeSelect.Field
                    value={langKey}
                    onChange={(e) => setLangKey(e.currentTarget.value)}
                  >
                    {data.examples.map((ex) => (
                      <option key={ex.language} value={ex.language}>
                        {ex.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>

                <SegmentGroup.Root
                  size="sm"
                  value={mode}
                  onValueChange={(e) => setMode(e.value as "encode" | "decode")}
                >
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Item value="encode">
                    <SegmentGroup.ItemText>Encode</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                  <SegmentGroup.Item value="decode">
                    <SegmentGroup.ItemText>Decode</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                </SegmentGroup.Root>
              </HStack>

              <Clipboard.Root value={code}>
                <Clipboard.Trigger asChild>
                  <Button size="sm" variant="surface" colorPalette={palette}>
                    <Clipboard.Indicator />
                    Copy
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
          </Card.Header>

          <Card.Body p={0}>
            <Highlight language={current.language} code={code} theme={theme}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Box
                  as="pre"
                  className={className}
                  style={style}
                  p={5}
                  overflowX="auto"
                  fontSize="sm"
                  lineHeight="tall"
                  margin={0}
                >
                  {tokens.map((line, i) => (
                    <Box key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <Box
                          as="span"
                          key={key}
                          {...getTokenProps({ token })}
                        />
                      ))}
                    </Box>
                  ))}
                </Box>
              )}
            </Highlight>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Box>
  );
};

export default Base64CodeExamples;
