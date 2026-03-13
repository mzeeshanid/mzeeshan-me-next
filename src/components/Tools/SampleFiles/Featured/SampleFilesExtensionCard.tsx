import { useColorPalette } from "@/contexts/useColorPalette";
import { Card, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  extension: any;
};

const SampleFilesExtensionCard: React.FC<Props> = ({ extension }) => {
  const { palette } = useColorPalette();
  const { name, info, slug, isFeatured } = extension;

  return (
    <Link href={`/tools/sample-files/extensions/${slug}`}>
      <Card.Root bg={"bg.muted"}>
        <Card.Body gap={3}>
          <VStack alignItems="flex-start" gap={2}>
            {isFeatured && (
              <Badge colorPalette={palette} variant="surface">
                {"Featured"}
              </Badge>
            )}
            <Heading>{name}</Heading>
            <Text color="fg.muted">{info}</Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

export default SampleFilesExtensionCard;
