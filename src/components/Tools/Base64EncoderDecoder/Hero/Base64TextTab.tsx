import React from "react";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  decodeText,
  encodeText,
  fromBase64URL,
  toBase64URL,
} from "@/services/base64Service";
import {
  Badge,
  Blockquote,
  Button,
  Clipboard,
  Field,
  HStack,
  IconButton,
  SegmentGroup,
  SimpleGrid,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";
import { Tooltip } from "@/components/ui/tooltip";
import { FaCircleInfo } from "react-icons/fa6";

const Base64TextTab: React.FC = () => {
  const { palette } = useColorPalette();

  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = React.useState(false);

  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const process = React.useCallback(
    (value: string, currentMode: typeof mode, currentUrlSafe: boolean) => {
      if (!value.trim()) {
        setOutput("");
        setError("");
        return;
      }

      if (currentMode === "encode") {
        let result = encodeText(value);
        if (currentUrlSafe) result = toBase64URL(result);
        setOutput(result);
        setError("");
      } else {
        let cleaned = value.trim();
        if (currentUrlSafe) cleaned = fromBase64URL(cleaned);
        const { output: decoded, error: decodeError } = decodeText(cleaned);
        if (decodeError) {
          setError(decodeError);
          setOutput("");
        } else {
          setOutput(decoded);
          setError("");
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      process(input, mode, urlSafe);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, mode, urlSafe, process]);

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
  };

  const inputByteCount = React.useMemo(() => {
    try {
      return new TextEncoder().encode(input).length;
    } catch {
      return 0;
    }
  }, [input]);

  return (
    <VStack align="stretch" gap={4}>
      <HStack flexWrap="wrap" gap={4} justify="space-between">
        <SegmentGroup.Root
          value={mode}
          onValueChange={(e) =>
            handleModeChange(e.value as "encode" | "decode")
          }
          size="sm"
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

        <HStack gap={2}>
          <Text fontSize="sm" color="fg.muted">
            URL-safe (Base64URL)
          </Text>
          <Switch.Root
            size="sm"
            colorPalette={palette}
            checked={urlSafe}
            onCheckedChange={(e) => setUrlSafe(e.checked)}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
          <Tooltip
            content="Base64URL replaces + with - and / with _ and omits = padding, making the output safe for URLs, file names, and JWT tokens."
            showArrow
            contentProps={{ maxW: "260px" }}
          >
            <IconButton
              size="2xs"
              variant="ghost"
              aria-label="About Base64URL"
              colorPalette={palette}
            >
              <DeferredIcon icon={FaCircleInfo} />
            </IconButton>
          </Tooltip>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Field.Root>
          <Field.Label>
            {mode === "encode" ? "Text to encode" : "Base64 to decode"}
          </Field.Label>
          <Textarea
            placeholder={
              mode === "encode"
                ? "Enter text here..."
                : "Paste Base64 string here..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            fontFamily={mode === "decode" ? "mono" : undefined}
            fontSize="sm"
            resize="vertical"
          />
          {input && (
            <Field.HelperText>
              {mode === "encode"
                ? `${input.length} chars · ${inputByteCount} bytes`
                : `${input.trim().length} chars`}
            </Field.HelperText>
          )}
        </Field.Root>

        <Field.Root invalid={!!error}>
          <Field.Label>
            <HStack justify="space-between" w="full">
              <Text>
                {mode === "encode" ? "Base64 output" : "Decoded text"}
              </Text>
              {output && (
                <Clipboard.Root value={output}>
                  <Clipboard.Trigger asChild>
                    <Button size="2xs" variant="surface" colorPalette={palette}>
                      <Clipboard.Indicator />
                      Copy
                    </Button>
                  </Clipboard.Trigger>
                </Clipboard.Root>
              )}
            </HStack>
          </Field.Label>
          <Textarea
            readOnly
            placeholder="Output will appear here..."
            value={output}
            rows={10}
            fontFamily={mode === "encode" ? "mono" : undefined}
            fontSize="sm"
            resize="vertical"
            bg="bg.subtle"
          />
          {error && <Field.ErrorText>{error}</Field.ErrorText>}
          {output && !error && (
            <Field.HelperText>
              {mode === "encode" ? (
                <HStack gap={2}>
                  <Text>{output.length} chars</Text>
                  {urlSafe && (
                    <Badge size="sm" colorPalette="green" variant="subtle">
                      URL-safe
                    </Badge>
                  )}
                </HStack>
              ) : (
                `${output.length} chars`
              )}
            </Field.HelperText>
          )}
        </Field.Root>
      </SimpleGrid>

      {input && (
        <HStack gap={2} justify="flex-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setInput("");
              setOutput("");
              setError("");
            }}
          >
            Clear
          </Button>
          {output && (
            <Button
              size="sm"
              variant="surface"
              colorPalette={palette}
              onClick={() => {
                setInput(output);
                setMode(mode === "encode" ? "decode" : "encode");
              }}
            >
              ↔ Swap & {mode === "encode" ? "Decode" : "Encode"}
            </Button>
          )}
        </HStack>
      )}

      <Blockquote.Root variant="subtle">
        <Blockquote.Content>
          All encoding and decoding happens in your browser. Your text never
          leaves your device.
        </Blockquote.Content>
      </Blockquote.Root>
    </VStack>
  );
};

export default Base64TextTab;
