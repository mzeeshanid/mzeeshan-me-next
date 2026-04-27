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

const MAX_LOCAL = 6;
const DEBOUNCE_DELAY = 150;

type Props = {
  initialValue?: string;
  extensions?: SampleFilesExtensionModel[];
};

const SampleFilesSearchBar: React.FC<Props> = ({
  initialValue = "",
  extensions,
}) => {
  const { palette } = useColorPalette();
  const hasLocal = extensions !== undefined;
  const isMac = React.useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return (
      navigator.userAgent.toUpperCase().includes("MAC") ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).platform?.toUpperCase().includes("MAC")
    );
  }, []);

  const [searchText, setSearchText] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);

  // API-mode state (only used when no local list is provided)
  const [apiSuggestions, setApiSuggestions] = React.useState<SampleFilesExtensionModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  // Local filter — only when extensions list is available
  const localSuggestions = React.useMemo<SampleFilesExtensionModel[]>(() => {
    if (!hasLocal) return [];
    const q = searchText.trim().toLowerCase();
    if (!q) return [];
    return (extensions ?? [])
      .filter(
        (ext) =>
          ext.slug.includes(q) ||
          ext.name.toLowerCase().includes(q) ||
          (ext.info && ext.info.toLowerCase().includes(q)),
      )
      .slice(0, MAX_LOCAL);
  }, [searchText, extensions, hasLocal]);

  const suggestions = hasLocal ? localSuggestions : apiSuggestions;

  // API fetch — only runs when no local list
  const fetchSuggestions = React.useCallback(
    async (keyword: string, signal: AbortSignal) => {
      if (!keyword.trim()) {
        setApiSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetchSampleFilesExtensionsNextJs(
          keyword, 6, 1, undefined, undefined, { signal },
        );
        setApiSuggestions(response.data || []);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setApiSuggestions([]);
        }
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    },
    [],
  );

  // Debounce + abort — API mode only
  React.useEffect(() => {
    if (hasLocal) return;

    if (!searchText.trim()) {
      setApiSuggestions([]);
      setIsLoading(false);
      abortRef.current?.abort();
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(searchText, controller.signal);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceRef.current!);
      controller.abort();
    };
  }, [searchText, fetchSuggestions, hasLocal]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setOpen(value.length > 0);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Click outside
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <Box
      as="search"
      ref={containerRef}
      w={{ base: "full", md: "lg", lg: "2xl" }}
      position="relative"
    >
      <Field.Root w={{ base: "full", md: "lg", lg: "2xl" }}>
        <InputGroup
          endElement={
            <HStack gap={1} display={{ base: "none", md: "flex" }}>
              <Kbd variant="subtle">{isMac ? "⌘" : "Ctrl"}</Kbd>
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
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.documentId}
                  w="full"
                  href={`/tools/sample-files/extensions/${suggestion.slug}`}
                >
                  <Box
                    w="full"
                    p={3}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                    onClick={() => {
                      setSearchText(suggestion.name);
                      setOpen(false);
                    }}
                  >
                    <VStack alignItems="flex-start" gap={0}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {suggestion.name}
                      </Text>
                      {suggestion.info && (
                        <Text fontSize="xs" color="fg.muted">
                          {suggestion.info}
                        </Text>
                      )}
                    </VStack>
                  </Box>
                </Link>
              ))}
            </VStack>
          ) : (
            <Box p={4}>
              <Text textAlign="center" fontSize="sm">
                No extensions found
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SampleFilesSearchBar;
