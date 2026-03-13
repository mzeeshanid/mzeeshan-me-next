import {
  fetchSampleFilesExtensionsNextJs,
  SampleFilesExtensionModel,
} from "@/apis/sampleFiles/sampleFilesExtension";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  Box,
  Field,
  HStack,
  Input,
  InputGroup,
  Kbd,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  initialValue?: string;
};

const DEBOUNCE_DELAY = 150;

const SampleFilesSearchBar: React.FC<Props> = ({ initialValue = "" }) => {
  const { palette } = useColorPalette();

  const [searchText, setSearchText] = React.useState(initialValue);
  const [suggestions, setSuggestions] = React.useState<
    SampleFilesExtensionModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // ---- Fetch logic (abort-aware)
  const fetchSuggestions = React.useCallback(
    async (keyword: string, signal: AbortSignal) => {
      if (!keyword.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetchSampleFilesExtensionsNextJs(
          keyword,
          3,
          1,
          undefined,
          undefined,
          {
            signal,
          },
        );
        setSuggestions(response.data || []);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  // ---- Input handler (PURE)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setOpen(value.length > 0);
  };

  // ---- Debounce + cancel previous request
  React.useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      setIsLoading(false);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      return;
    }

    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(searchText, controller.signal);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimerRef.current!);
      controller.abort();
    };
  }, [searchText, fetchSuggestions]);

  // ---- Keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.key === "Escape") {
        if (document.activeElement === inputRef.current) {
          inputRef.current?.blur();
          setOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ---- Click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <Box
      as={"search"}
      ref={containerRef}
      w={{ base: "full", md: "lg", lg: "2xl" }}
      position="relative"
    >
      <Field.Root w={{ base: "full", md: "lg", lg: "2xl" }}>
        <InputGroup
          endElement={
            <HStack gap={1} display={{ base: "none", md: "flex" }}>
              <Kbd variant="subtle">
                {navigator.userAgent.toUpperCase().includes("MAC") ||
                navigator.platform.toUpperCase().includes("MAC")
                  ? "⌘"
                  : "Ctrl"}
              </Kbd>
              <Kbd variant="subtle">k</Kbd>
            </HStack>
          }
        >
          <Input
            ref={inputRef}
            colorPalette={palette}
            size={{ base: "lg", md: "xl" }}
            placeholder="Search for file extension (e.g., pdf, jpg, mp4)..."
            value={searchText}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </InputGroup>
      </Field.Root>

      {open && searchText && (
        <Box
          bg="bg.muted"
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          borderRadius="md"
          boxShadow="lg"
          zIndex={10}
          maxH="300px"
          overflowY="auto"
        >
          {isLoading ? (
            <Box p={4} textAlign="center">
              <Spinner size="sm" />
            </Box>
          ) : suggestions.length > 0 ? (
            <VStack gap={0} divideY="1px">
              {suggestions.map((suggestion, index) => (
                <Link
                  w={"full"}
                  href={`/tools/sample-files/extensions/${suggestion.slug}`}
                >
                  <Box
                    key={index}
                    w="full"
                    p={3}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                    onClick={() => {
                      setSearchText(suggestion.name);
                      setSuggestions([]);
                      setOpen(false);
                    }}
                  >
                    <VStack alignItems="flex-start" gap={0}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {suggestion.name}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {suggestion.info}
                      </Text>
                    </VStack>
                  </Box>
                </Link>
              ))}
            </VStack>
          ) : (
            <Box p={4}>
              <Text textAlign="center" fontSize="sm">
                {"No extensions found"}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SampleFilesSearchBar;
