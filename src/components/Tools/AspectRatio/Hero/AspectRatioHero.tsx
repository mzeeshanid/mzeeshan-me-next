import { Box, Spacer, Stack } from "@chakra-ui/react";
import React from "react";
import type { AspectRatioFormValues } from "@/utils/aspectRatio";
import AspectRatioBlockquote from "./AspectRatioBlockquote";
import AspectRatioForm from "./AspectRatioForm";
import AspectRatioVisualiser from "./AspectRatioVisualiser";

type AspectRatioHeroProps = {};

const AspectRatioHero: React.FC<AspectRatioHeroProps> = (
  props: AspectRatioHeroProps,
) => {
  const [formValues, setFormValues] = React.useState<AspectRatioFormValues>({
    originalWidth: "1080",
    originalHeight: "1920",
    desiredWidth: "",
    desiredHeight: "",
  });

  return (
    <Box as="section">
      <Stack direction={{ base: "column", md: "row" }} gap={4}>
        <Box w="full">
          <AspectRatioForm
            onFormValuesChange={(values: AspectRatioFormValues) => {
              setFormValues(values);
            }}
            initialValues={formValues}
          />
        </Box>
        <Box w={{ base: "full", md: "xs" }}>
          <AspectRatioVisualiser
            width={Number(formValues.originalWidth)}
            height={Number(formValues.originalHeight)}
          />
        </Box>
        {/* </Box> */}
        {/* <Card.Header>
            <Tabs.Root
              variant="enclosed"
              fitted
              defaultValue={"tab-1"}
              colorPalette={palette}
            >
              <Tabs.List>
                <Tabs.Trigger value="tab-1">{"Width"}</Tabs.Trigger>
                <Tabs.Trigger value="tab-2">{"Height"}</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab-1">
                <Text>
                  {
                    "New Width = (New Height x Original Width) / Original Height"
                  }
                </Text>
              </Tabs.Content>
              <Tabs.Content value="tab-2">
                <Text>
                  {
                    "New Height = (New Width x Original Height) / Original Width"
                  }
                </Text>
              </Tabs.Content>
            </Tabs.Root>
          </Card.Header> */}
      </Stack>
      <Spacer p={4} />
      <AspectRatioBlockquote />
    </Box>
  );
};

export default AspectRatioHero;
