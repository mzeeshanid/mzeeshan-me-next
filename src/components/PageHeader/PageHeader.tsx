import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import AppBreadcrumb, { AppBreadcrumbItem } from "../Breadcrumb/AppBreadcrumb";

type PageHeaderProps = {
  title: string;
  breadcrumbItems: AppBreadcrumbItem[];
  /** Pass the current page path (e.g. "/tools/sample-files/extensions/flac") to include it in the breadcrumb JSON-LD. */
  currentHref?: string;
};

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
  const { title, breadcrumbItems, currentHref } = props;
  return (
    <Box rounded={"lg"} bg={"bg.muted"} p={{ base: 4, md: 6 }}>
      <VStack>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          {title}
        </Heading>
        <AppBreadcrumb items={breadcrumbItems} currentHref={currentHref} />
      </VStack>
    </Box>
  );
};

export default PageHeader;
