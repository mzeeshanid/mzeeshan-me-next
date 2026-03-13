import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import AppBreadcrumb, { AppBreadcrumbItem } from "../Breadcrumb/AppBreadcrumb";

type PageHeaderProps = {
  title: string;
  breadcrumbItems: AppBreadcrumbItem[];
};

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
  const { title, breadcrumbItems } = props;
  return (
    <Box rounded={"lg"} bg={"bg.muted"} p={{ base: 4, md: 6 }}>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <AppBreadcrumb items={breadcrumbItems} />
      </VStack>
    </Box>
  );
};

export default PageHeader;
