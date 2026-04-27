import { useColorMode } from "@/components/ui/color-mode";
import { useColorPalette } from "@/contexts/useColorPalette";
import { useMounted } from "@/hooks/useMounted";
import {
  Box,
  Button,
  Card,
  Clipboard,
  Heading,
  HStack,
  NativeSelect,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Highlight, themes } from "prism-react-renderer";
import React from "react";

const SNIPPETS: Record<string, { label: string; lang: string; code: string }> = {
  js: {
    label: "JavaScript",
    lang: "javascript",
    code: `// Current Unix timestamp (seconds)
const nowSec = Math.floor(Date.now() / 1000);

// Timestamp → Date
const date = new Date(timestamp * 1000);

// Date → timestamp
const ts = Math.floor(date.getTime() / 1000);`,
  },
  ts: {
    label: "TypeScript",
    lang: "typescript",
    code: `// Current Unix timestamp (seconds)
const nowSec: number = Math.floor(Date.now() / 1000);

// Timestamp → Date
const date: Date = new Date(timestamp * 1000);

// Date → timestamp
const ts: number = Math.floor(date.getTime() / 1000);`,
  },
  python: {
    label: "Python",
    lang: "python",
    code: `import time
from datetime import datetime, timezone

# Current Unix timestamp (seconds)
now_sec = int(time.time())

# Timestamp → Date (UTC)
dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)

# Date → timestamp
ts = int(dt.timestamp())`,
  },
  php: {
    label: "PHP",
    lang: "php",
    code: `<?php
// Current Unix timestamp (seconds)
$now = time();

// Timestamp → Date
$date = date('Y-m-d H:i:s', $timestamp);

// Date → timestamp
$ts = strtotime('2024-01-01 00:00:00');`,
  },
  ruby: {
    label: "Ruby",
    lang: "ruby",
    code: `# Current Unix timestamp (seconds)
now_sec = Time.now.to_i

# Timestamp → Date (UTC)
time = Time.at(timestamp).utc

# Date → timestamp
ts = Time.utc(2024, 1, 1, 0, 0, 0).to_i`,
  },
  java: {
    label: "Java",
    lang: "java",
    code: `import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

// Current Unix timestamp (seconds)
long nowSec = Instant.now().getEpochSecond();

// Timestamp → Date (UTC)
LocalDateTime date = LocalDateTime.ofEpochSecond(timestamp, 0, ZoneOffset.UTC);

// Date → timestamp
long ts = LocalDateTime.of(2024, 1, 1, 0, 0, 0)
    .toEpochSecond(ZoneOffset.UTC);`,
  },
  csharp: {
    label: "C#",
    lang: "csharp",
    code: `using System;

// Current Unix timestamp (seconds)
long nowSec = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

// Timestamp → Date (UTC)
DateTimeOffset date = DateTimeOffset.FromUnixTimeSeconds(timestamp);

// Date → timestamp
long ts = new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero)
    .ToUnixTimeSeconds();`,
  },
  swift: {
    label: "Swift",
    lang: "swift",
    code: `import Foundation

// Current Unix timestamp (seconds)
let nowSec = Int(Date().timeIntervalSince1970)

// Timestamp → Date
let date = Date(timeIntervalSince1970: TimeInterval(timestamp))

// Date → timestamp
let ts = Int(date.timeIntervalSince1970)`,
  },
  kotlin: {
    label: "Kotlin",
    lang: "kotlin",
    code: `import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset

// Current Unix timestamp (seconds)
val nowSec: Long = Instant.now().epochSecond

// Timestamp → Date (UTC)
val date: LocalDateTime = LocalDateTime.ofEpochSecond(timestamp, 0, ZoneOffset.UTC)

// Date → timestamp
val ts: Long = LocalDateTime.of(2024, 1, 1, 0, 0, 0)
    .toEpochSecond(ZoneOffset.UTC)`,
  },
  go: {
    label: "Go",
    lang: "go",
    code: `package main

import "time"

func main() {
    // Current Unix timestamp (seconds)
    nowSec := time.Now().Unix()

    // Timestamp → Time (UTC)
    t := time.Unix(timestamp, 0).UTC()

    // Time → timestamp
    ts := t.Unix()
}`,
  },
  rust: {
    label: "Rust",
    lang: "rust",
    code: `use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    // Current Unix timestamp (seconds)
    let now_sec = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    // Timestamp → Duration since epoch
    let duration = std::time::Duration::from_secs(timestamp);

    // Date → timestamp (chrono crate)
    // let ts = Utc.with_ymd_and_hms(2024, 1, 1, 0, 0, 0).unwrap().timestamp();
}`,
  },
  sql: {
    label: "SQL",
    lang: "sql",
    code: `-- MySQL / MariaDB
SELECT UNIX_TIMESTAMP() AS now_ts;
SELECT FROM_UNIXTIME(1700000000) AS human_date;

-- PostgreSQL
SELECT EXTRACT(EPOCH FROM NOW())::bigint AS now_ts;
SELECT TO_TIMESTAMP(1700000000) AS human_date;

-- SQLite
SELECT strftime('%s', 'now') AS now_ts;
SELECT datetime(1700000000, 'unixepoch') AS human_date;`,
  },
  bash: {
    label: "Bash",
    lang: "bash",
    code: `# Current Unix timestamp (seconds)
now_sec=$(date +%s)

# Timestamp → Date (UTC)
date -u -d @1700000000 '+%Y-%m-%d %H:%M:%S'   # Linux
date -u -r 1700000000 '+%Y-%m-%d %H:%M:%S'    # macOS

# Date → timestamp
date -u -d '2024-01-01 00:00:00' +%s           # Linux
date -u -j -f '%Y-%m-%d %H:%M:%S' \
  '2024-01-01 00:00:00' +%s                    # macOS`,
  },
  dart: {
    label: "Dart",
    lang: "dart",
    code: `// Current Unix timestamp (seconds)
final nowSec = DateTime.now().millisecondsSinceEpoch ~/ 1000;

// Timestamp → Date (UTC)
final date = DateTime.fromMillisecondsSinceEpoch(
  timestamp * 1000,
  isUtc: true,
);

// Date → timestamp
final ts = DateTime.utc(2024, 1, 1).millisecondsSinceEpoch ~/ 1000;`,
  },
};

type Props = {};

const UnixTimestampDevTools: React.FC<Props> = () => {
  const { palette } = useColorPalette();
  const { colorMode } = useColorMode();
  const mounted = useMounted();
  const [lang, setLang] = React.useState("js");

  const current = SNIPPETS[lang];

  const theme = mounted
    ? colorMode === "dark"
      ? themes.gruvboxMaterialDark
      : themes.gruvboxMaterialLight
    : undefined;

  return (
    <Box as="section">
      <VStack align="flex-start" gap={6}>
        <VStack align="flex-start" gap={3}>
          <Tag.Root variant="surface" colorPalette={palette} size={{ base: "lg", md: "xl" }}>
            <Tag.Label>Developer Utilities</Tag.Label>
          </Tag.Root>
          <Heading as="h2" fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }} lineHeight="normal">
            Get Unix Timestamp in Any Language
          </Heading>
          <Text color="fg.muted">
            Copy-paste snippets for getting the current timestamp, converting to date, and converting
            back — in every major language.
          </Text>
        </VStack>

        <Card.Root overflow="hidden" w="full">
          <Card.Header bg="bg.subtle" py={3} px={4}>
            <HStack justify="space-between">
              <NativeSelect.Root size="sm" width="180px">
                <NativeSelect.Field
                  value={lang}
                  onChange={(e) => setLang(e.currentTarget.value)}
                >
                  {Object.entries(SNIPPETS).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              <Clipboard.Root value={current.code}>
                <Clipboard.Trigger asChild>
                  <Button size="sm" variant="outline">
                    <Clipboard.Indicator />
                    Copy
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
          </Card.Header>

          <Card.Body p={0}>
            <Highlight language={current.lang} code={current.code} theme={theme}>
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
                        <Box as="span" key={key} {...getTokenProps({ token })} />
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

export default UnixTimestampDevTools;
