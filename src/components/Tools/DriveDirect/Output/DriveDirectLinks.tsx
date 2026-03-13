import { useColorPalette } from "@/contexts/useColorPalette";
import { driveDirectData } from "@/data/tools/driveDirect/driveDirectData";
import {
  Blockquote,
  Box,
  Button,
  Center,
  Clipboard,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Link,
  List,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { IoLink, IoWarningOutline } from "react-icons/io5";

type Props = {
  links: string[];
};

const DriveDirectLinks: React.FC<Props> = (props: Props) => {
  const { links } = props;
  const { palette } = useColorPalette();
  const { blockQuote } = driveDirectData();

  const isDisabled =
    links.length === 0 || (links.length === 1 && links[0] === "");

  return (
    <Box>
      <Box as="section" bg="bg.subtle" borderRadius={"2xl"}>
        <Center>
          <VStack w="full">
            <HStack
              w={"full"}
              justify={"space-between"}
              pt={4}
              pr={{ base: 4, md: 6 }}
              pl={{ base: 4, md: 6 }}
            >
              <Text
                as="h3"
                fontWeight={"bold"}
                fontSize={{ base: "lg", md: "2xl" }}
              >
                {"Your Direct Download Links"}
              </Text>
              <Clipboard.Root value={links.join("\n")}>
                <Clipboard.Trigger asChild>
                  <Button
                    size="sm"
                    variant={"plain"}
                    colorPalette={palette}
                    disabled={isDisabled}
                  >
                    <Clipboard.Indicator />
                    <Text>{"Copy All"}</Text>
                  </Button>
                </Clipboard.Trigger>
              </Clipboard.Root>
            </HStack>
            <Box w="full" pr={{ base: 4, md: 6 }} pl={{ base: 4, md: 6 }}>
              <List.Root w="full">
                <VStack gap={2}>
                  {links.map((link, idx) => (
                    <List.Item w="full" key={idx} listStyle={"none"}>
                      <InputGroup
                        w="full"
                        colorPalette={palette}
                        startElement={<IoLink size={16} />}
                        endElement={
                          <HStack>
                            <Link
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                size={"xs"}
                                variant={"surface"}
                                disabled={isDisabled}
                              >
                                <LuExternalLink />
                              </IconButton>
                            </Link>
                            <Clipboard.Root value={link}>
                              <Clipboard.Trigger asChild>
                                <Button
                                  size={"xs"}
                                  variant={"surface"}
                                  disabled={isDisabled}
                                >
                                  <Clipboard.Indicator />
                                  <Clipboard.CopyText />
                                </Button>
                              </Clipboard.Trigger>
                            </Clipboard.Root>
                          </HStack>
                        }
                      >
                        <Input
                          w="full"
                          placeholder="https://drive.google.com/uc?..."
                          size={"xl"}
                          variant={"subtle"}
                          colorPalette={palette}
                          value={link}
                          color={"fg.muted"}
                          readOnly
                        />
                      </InputGroup>
                    </List.Item>
                  ))}
                </VStack>
              </List.Root>
              <Spacer p={2} />
              <HStack gap={1} color="fg.warning">
                <Spacer />
                <Icon>
                  <IoWarningOutline size={12} />
                </Icon>
                <Text fontSize="xs">{"Public access required"}</Text>
              </HStack>
            </Box>
            <Spacer p={2} />
          </VStack>
        </Center>
      </Box>
      <Spacer p={4} />
      <Blockquote.Root variant="subtle">
        <Blockquote.Content>{blockQuote.quote}</Blockquote.Content>
        <Blockquote.Caption>{blockQuote.caption}</Blockquote.Caption>
      </Blockquote.Root>
    </Box>
  );
};

export default DriveDirectLinks;
