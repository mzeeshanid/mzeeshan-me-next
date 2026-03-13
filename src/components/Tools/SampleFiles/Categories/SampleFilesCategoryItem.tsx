import { SampleFilesCategoryDataModel } from "@/data/tools/sampleFiles/sampleFilesCategoriesData";
import { Icon, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  category: SampleFilesCategoryDataModel;
};

const SampleFilesCategoryItem: React.FC<Props> = (props: Props) => {
  return (
    <Link href={props.category.path}>
      <VStack>
        <Icon as={props.category.icon} boxSize={12} />
        <Text
          as="h2"
          fontWeight={"bold"}
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign={"center"}
        >
          {props.category.name}
        </Text>
        <Text color="fg.muted" textAlign={"center"}>
          {props.category.details}
        </Text>
      </VStack>
    </Link>
  );
};

export default SampleFilesCategoryItem;
