import { useColorPalette } from "@/contexts/useColorPalette";
import { jsonValidatorFormatterSearchData } from "@/data/tools/jsonValidatorFormatter/jsonValidatorFormatterData";
import {
  Box,
  Button,
  Flex,
  Input,
  Kbd,
  Stack,
  Text,
  VStack,
  Field,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

type Props = {
  activeMatchPath: string | null;
  activeMatchIndex: number;
  matchesCount: number;
  onClear: () => void;
  onGo: () => void;
  onNext: () => void;
  onPrevious: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchEnabled: boolean;
  lastSearchedTerm: string;
};

const JsonSearch: React.FC<Props> = ({
  activeMatchPath,
  activeMatchIndex,
  matchesCount,
  onClear,
  onGo,
  onNext,
  onPrevious,
  searchTerm,
  setSearchTerm,
  searchEnabled,
  lastSearchedTerm,
}) => {
  const { palette } = useColorPalette();
  const searchData = jsonValidatorFormatterSearchData;

  const handlePrimarySearchAction = React.useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      onGo();
      return;
    }

    if (matchesCount === 0 || lastSearchedTerm !== trimmedSearchTerm) {
      onGo();
      return;
    }

    onNext();
  }, [lastSearchedTerm, matchesCount, onGo, onNext, searchTerm]);

  const handleSearchInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!searchEnabled) {
        return;
      }

      const isMetaNext =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "g";
      const isF3 = event.key === "F3";

      if (event.key === "Enter") {
        event.preventDefault();

        if (event.shiftKey) {
          onPrevious();
          return;
        }

        handlePrimarySearchAction();
        return;
      }

      if (isF3 || isMetaNext) {
        event.preventDefault();

        if (event.shiftKey) {
          onPrevious();
          return;
        }

        onNext();
      }
    },
    [handlePrimarySearchAction, onNext, onPrevious, searchEnabled],
  );

  return (
    <Box borderTopWidth="1px" mt={4} pt={4}>
      <VStack align="stretch" gap={3}>
        <Field.Root>
          <Field.Label>{searchData.label}</Field.Label>
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleSearchInputKeyDown}
            placeholder={searchData.placeholder}
          />
        </Field.Root>

        <Stack direction={{ base: "row", md: "column" }} gap={3}>
          <ButtonGroup size="xs">
            <Button colorPalette={palette} variant="solid" onClick={onGo}>
              <FaMagnifyingGlass />
              {"Go"}
            </Button>
            <Button
              variant="surface"
              onClick={onNext}
              disabled={matchesCount === 0}
            >
              {"Next"}
            </Button>
            <Button
              variant="surface"
              onClick={onPrevious}
              disabled={matchesCount === 0}
            >
              {"Previous"}
            </Button>
            <Button variant="ghost" onClick={onClear}>
              {"Clear"}
            </Button>
          </ButtonGroup>
        </Stack>
        <Text color="fg.muted">
          {matchesCount === 0
            ? searchData.noMatches
            : `${searchData.resultsPrefix} ${activeMatchIndex + 1} of ${matchesCount}: ${activeMatchPath}`}
        </Text>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontWeight="semibold" mb={2}>
            {searchData.shortcutTitle}
          </Text>
          <VStack align="stretch" gap={2}>
            {searchData.shortcuts.map((shortcut) => (
              <Flex
                key={shortcut.label}
                align="center"
                justify="space-between"
                gap={3}
              >
                <Text fontSize="xs" color="fg.muted">
                  {shortcut.label}
                </Text>
                <Flex align="center" gap={1} wrap="wrap" justify="flex-end">
                  {shortcut.keys.map((key) => (
                    <Kbd key={`${shortcut.label}-${key}`} size={"sm"}>
                      {key}
                    </Kbd>
                  ))}
                  <Text fontSize="xs" color="fg.muted">
                    {"or"}
                  </Text>
                  {shortcut.alternateKeys.map((key) => (
                    <Kbd key={`${shortcut.label}-${key}`} size={"sm"}>
                      {key}
                    </Kbd>
                  ))}
                </Flex>
              </Flex>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default JsonSearch;
