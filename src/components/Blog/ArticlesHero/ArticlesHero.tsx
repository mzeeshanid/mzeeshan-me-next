import { ArticleCategoryModel } from "@/apis/articles/articleCategories";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  InputGroup,
  Kbd,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ArticleCategoriesList from "../ArticleCategories/ArticleCategoriesList";

type ArticlesHeroProps = {
  categories: ArticleCategoryModel[];
  isSearching: boolean;
  keyword: string;
  searchFieldTextChanaged: (text: string) => void;
};

const ArticlesHero: React.FC<ArticlesHeroProps> = (
  props: ArticlesHeroProps,
) => {
  const { categories, isSearching, keyword, searchFieldTextChanaged } = props;
  const { palette } = useColorPalette();

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K → focus
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      // Esc → blur (only if focused)
      if (e.key === "Escape") {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <VStack gap={8}>
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight={"bold"}
        lineHeight={"shorter"}
      >
        {"Blog - Sharing Experiences"}
      </Text>
      <Stack w={{ base: "full", md: "auto" }} direction={"row"} gap={4}>
        <Box as="search">
          <Field.Root w={{ base: "full", md: "lg", lg: "2xl" }}>
            <InputGroup
              endElement={
                <HStack gap={1} display={{ base: "none", md: "flex" }}>
                  <Kbd variant={"subtle"}>
                    {navigator.userAgent.toUpperCase().includes("MAC") ||
                    navigator.platform.toUpperCase().includes("MAC")
                      ? "⌘"
                      : "Ctrl"}
                  </Kbd>
                  <Kbd variant={"subtle"}>k</Kbd>
                </HStack>
              }
            >
              <Input
                ref={inputRef}
                colorPalette={palette}
                size={{ base: "md", md: "xl" }}
                placeholder={"Search for articles..."}
                value={keyword}
                onChange={(e) => {
                  searchFieldTextChanaged(e.target.value);
                }}
              />
            </InputGroup>
          </Field.Root>
        </Box>
        <Button
          loading={isSearching}
          size={{ base: "md", md: "xl" }}
          colorPalette={palette}
          onClick={() => {
            searchFieldTextChanaged(keyword);
          }}
        >
          {"Search"}
        </Button>
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} gap={4} align={"center"}>
        <Text color={"fg.muted"} fontSize={"md"}>
          {"Categories"}
        </Text>
        <ArticleCategoriesList categories={categories} />
      </Stack>
    </VStack>
  );
};

export default ArticlesHero;
