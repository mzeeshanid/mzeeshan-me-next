import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Field,
  HStack,
  Input,
  InputGroup,
  Kbd,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  keyword: string;
  searchFieldTextChanaged: (text: string) => void;
};

type MyToolsHeroQueryParams = {
  keyword?: string;
};

const MyToolsHero: React.FC<Props> = (props: Props) => {
  const { palette } = useColorPalette();

  const router = useRouter();

  const [searchText, setSearchText] = React.useState(
    (router.query.keyword as string) || "",
  );

  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const searchFieldTextChanaged = (text: string) => {
    setSearchText(text);

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer (200ms)
    debounceTimerRef.current = setTimeout(() => {
      updateRouter(text);
      props.searchFieldTextChanaged(text);
    }, 100);
  };

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
    return () => {
      window.removeEventListener("keydown", handler);
      // Cleanup debounce timer on unmount
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [props]);

  const buildQuery = (keyword: string): MyToolsHeroQueryParams => {
    const query: MyToolsHeroQueryParams = {};

    if (keyword.length > 0) {
      query.keyword = keyword;
    }

    return query;
  };

  const updateRouter = async (keyword: string) => {
    await router.push(
      {
        pathname: "/tools",
        query: buildQuery(keyword),
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Box as="section">
      <VStack gap={8}>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight={"bold"}
          lineHeight={"shorter"}
        >
          {"Tools Simplifying Workflows"}
        </Text>
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
                placeholder={"Search for tools..."}
                value={searchText}
                onChange={(e) => {
                  searchFieldTextChanaged(e.target.value);
                }}
              />
            </InputGroup>
          </Field.Root>
        </Box>
      </VStack>
    </Box>
  );
};

export default MyToolsHero;
