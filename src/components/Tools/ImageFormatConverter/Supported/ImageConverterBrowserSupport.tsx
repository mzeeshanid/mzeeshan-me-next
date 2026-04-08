import { Box, Link, Table } from "@chakra-ui/react";
import React from "react";

import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import { imageFormatBrowserSupport, imageFormatOptions } from "@/data/tools/imageFormatConverter/imageConversionRoutes";
import type { SectionHeaderData } from "@/data/tools/imageFormatConverter/types";

type Props = {
  header: SectionHeaderData;
};

const ImageConverterBrowserSupport: React.FC<Props> = ({ header }) => {
  const { palette } = useColorPalette();

  const formats = imageFormatOptions.map((opt) => opt.value);
  const browserColumns = [
    { key: "format", label: "Format" },
    { key: "since", label: "Since" },
    { key: "browsers", label: "Browser Support" },
  ];

  return (
    <Box as="section">
      <SectionHeader
        tagline={header.badge}
        headline={header.title}
        description={header.description}
      />
      <Box mt={8} borderWidth="1px" borderRadius="2xl" overflow="hidden">
        <Table.ScrollArea>
          <Table.Root variant="outline" showColumnBorder>
            <Table.Header>
              <Table.Row>
                {browserColumns.map((col) => (
                  <Table.ColumnHeader key={col.key}>{col.label}</Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {formats.map((format) => {
                const support = imageFormatBrowserSupport[format];
                return (
                  <Table.Row key={format}>
                    <Table.Cell fontWeight="medium">{format.toUpperCase()}</Table.Cell>
                    <Table.Cell color="fg.muted">{support.since}</Table.Cell>
                    <Table.Cell>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {support.browsers.map((browser, idx) => (
                          <Link
                            key={idx}
                            fontSize="xs"
                            colorPalette={palette}
                            href={`https://caniuse.com/${format === "avif" ? "av1" : format}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {browser}
                          </Link>
                        ))}
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Box>
  );
};

export default ImageConverterBrowserSupport;
