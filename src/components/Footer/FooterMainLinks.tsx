import {
  HStack,
  Icon,
  Link,
  Stack,
  StackSeparator,
  useBreakpointValue,
} from "@chakra-ui/react";

import footerData from "../../data/footer/footerData";

type FooterMainLinksProps = {};

const FooterMainLinks = (props: FooterMainLinksProps) => {
  const { mainLinks } = footerData();
  const showSeparator = useBreakpointValue({ base: true, lg: false });

  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 2, md: 4, lg: 6 }}
      justify={"center"}
      flexWrap="wrap"
      separator={showSeparator ? <StackSeparator /> : undefined}
    >
      {mainLinks.map((linkItem, idx) => (
        <Link
          key={idx}
          href={linkItem.url}
          aria-label={`bottom bar link ${linkItem.label}`}
          fontSize={"lg"}
        >
          <HStack gap={2}>
            <Icon as={linkItem.icon} />
            {linkItem.label}
          </HStack>
        </Link>
      ))}
    </Stack>
  );
};

export default FooterMainLinks;
