import { useMounted } from "@/hooks/useMounted";
import { Box, Clipboard, Flex, IconButton, Text } from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";
import { useColorMode } from "../ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";

type MarkDownCodeBlockProps = {
  className?: string;
  children: string;
};

export const MarkDownCodeBlock: React.FC<MarkDownCodeBlockProps> = ({
  className,
  children,
}) => {
  const { colorMode } = useColorMode();

  const language = className?.replace("language-", "") || "";

  const mounted = useMounted();
  const theme = mounted
    ? colorMode === "dark"
      ? themes.gruvboxMaterialDark
      : themes.gruvboxMaterialLight
    : undefined;

  const { palette } = useColorPalette();

  return (
    <Box my={6} fontSize={"md"} borderRadius="lg" overflow="hidden">
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={2}
        bg={theme?.plain.backgroundColor}
        borderBottomWidth={0.5}
        borderColor={"border.emphasized"}
      >
        <Text
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
          opacity={0.8}
          color={`${palette}.fg`}
        >
          {language || "code"}
        </Text>
        <Clipboard.Root value={children.trim()}>
          <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs" colorPalette={palette}>
              <Clipboard.Indicator />
            </IconButton>
          </Clipboard.Trigger>
        </Clipboard.Root>
      </Flex>
      <Highlight
        language={language || "ts"}
        code={children.trim()}
        theme={theme}
      >
        {(highlight) => {
          const { className, style, tokens, getLineProps, getTokenProps } =
            highlight;
          return (
            <Box
              as="pre"
              className={className}
              style={style}
              p={4}
              overflowX="auto"
            >
              {tokens.map((line, i) => (
                <Box key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <Box as="span" key={key} {...getTokenProps({ token })} />
                  ))}
                </Box>
              ))}
            </Box>
          );
        }}
      </Highlight>
    </Box>
  );
};
