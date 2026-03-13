import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { useColorPalette } from "@/contexts/useColorPalette";
import {
  ExtensionBenefitsData,
  ExtensionHowToUseData,
} from "@/data/tools/sampleFiles/sampleFilesExtensionDetails";
import { Box, Card, Center, Icon, List, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuCircleCheck } from "react-icons/lu";

type Props = {
  benefits?: ExtensionBenefitsData;
  usage?: ExtensionHowToUseData;
};

const ExtensionBenefitsUsage: React.FC<Props> = (props: Props) => {
  const { benefits, usage } = props;
  const { palette } = useColorPalette();

  return (
    <Box as="section">
      <Stack direction={{ base: "column", md: "row" }} gap={6}>
        <Card.Root w={{ base: "full", md: "50%" }} variant={"subtle"}>
          <Card.Header>
            <SectionHeader headline={"Benefits"} />
          </Card.Header>
          <Card.Body>
            {benefits?.items && (
              <Box>
                <List.Root color="fg.muted" variant={"plain"} gap={4}>
                  {benefits.items.map((item, idx) => (
                    <List.Item key={idx}>
                      <Center pt={1} pb={1}>
                        <List.Indicator asChild>
                          <Icon
                            as={LuCircleCheck}
                            color={`${palette}.fg`}
                            size={"sm"}
                          />
                        </List.Indicator>
                      </Center>
                      <Text>{item}</Text>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            )}
          </Card.Body>
        </Card.Root>
        <Card.Root w={{ base: "full", md: "50%" }} variant={"subtle"}>
          <Card.Header>
            <SectionHeader headline={"Usage"} />
          </Card.Header>
          <Card.Body>
            {usage?.items && (
              <Box>
                <List.Root color="fg.muted" variant={"plain"} gap={4}>
                  {usage.items.map((item, idx) => (
                    <List.Item key={idx}>
                      <Center pt={1}>
                        <List.Indicator asChild>
                          <Icon
                            as={LuCircleCheck}
                            color={`${palette}.fg`}
                            size={"sm"}
                          />
                        </List.Indicator>
                      </Center>
                      <Text>{item}</Text>
                    </List.Item>
                  ))}
                </List.Root>
              </Box>
            )}
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};

export default ExtensionBenefitsUsage;
