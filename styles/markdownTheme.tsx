import { MarkDownCodeBlock } from "@/components/Markdown/CodeBlock";
import { Gist } from "@/components/Markdown/Gist";
import { useColorPalette } from "@/contexts/useColorPalette";
import { Box, List } from "@chakra-ui/react";
import { Components } from "react-markdown";

const BLOCK_TAGS = new Set(["pre", "gist", "iframe", "table", "img"]);

export const getMarkdownTheme = (): Components => {
  return {
    h1: (props: any) => (
      <Box as="h1" fontSize="4xl" fontWeight="bold" mt={8} mb={4} {...props} />
    ),
    h2: (props: any) => (
      <Box as="h2" fontSize="2xl" fontWeight="bold" mt={8} mb={4} {...props} />
    ),
    h3: (props: any) => (
      <Box
        as="h3"
        fontSize="xl"
        fontWeight="semibold"
        mt={6}
        mb={3}
        {...props}
      />
    ),
    ul: (props: any) => (
      <List.Root
        as="ul"
        fontSize="lg"
        variant={"marker"}
        pl={6}
        mt={4}
        {...props}
      />
    ),
    ol: (props: any) => (
      <List.Root
        as="ol"
        fontSize="lg"
        variant={"marker"}
        pl={6}
        mt={4}
        {...props}
      />
    ),
    li: (props: any) => (
      <List.Item
        as="li"
        fontSize="lg"
        lineHeight={"shorter"}
        _marker={{ color: "inherit" }}
        mt={2}
        {...props}
      />
    ),
    blockquote: (props: any) => (
      <Box
        as="blockquote"
        fontSize="lg"
        pl={4}
        py={2}
        mt={6}
        borderLeft="4px solid"
        borderColor="border.subtle"
        color="fg.muted"
        fontStyle="italic"
        {...props}
      />
    ),
    a: (props: any) => (
      <Box
        as="a"
        fontSize="lg"
        textDecoration="underline"
        _hover={{ color: `fg.muted` }}
        {...props}
      />
    ),
    iframe: ({ node, ...props }: any) => (
      <Box
        as="iframe"
        w="100%"
        aspectRatio="16/9"
        border="0"
        borderRadius="lg"
        my={6}
        {...props}
      />
    ),
  };
};

export const markdownComponents = {
  gist: ({ node, ...props }: any) => <Gist {...props} />,
  code: ({ inline, children }: any) => {
    if (!inline) {
      // Let <pre> handle block code
      return null;
    }

    return (
      <Box
        as="code"
        px={1.5}
        py={0.5}
        bg="bg.muted"
        borderRadius="md"
        fontSize="sm"
      >
        {children}
      </Box>
    );
  },
  pre: ({ children }: any) => {
    const codeElement = children?.props;

    return (
      <MarkDownCodeBlock className={codeElement?.className}>
        {String(codeElement?.children)}
      </MarkDownCodeBlock>
    );
  },
  p: ({ node, children }: any) => {
    const hasBlockChild = node?.children?.some(
      (child: any) => child.type === "element" && BLOCK_TAGS.has(child.tagName),
    );

    if (hasBlockChild) {
      return <>{children}</>;
    }

    return (
      <Box as="p" fontSize="lg" lineHeight="tall" mt={4}>
        {children}
      </Box>
    );
  },
};
