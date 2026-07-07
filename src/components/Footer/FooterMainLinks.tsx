import {
  HStack,
  Link,
  Stack,
  StackSeparator,
  useBreakpointValue,
} from "@chakra-ui/react";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";

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
          color={"fg"}
        >
          <HStack gap={2}>
            {linkItem.icon && <DeferredIcon icon={linkItem.icon} />}
            {linkItem.label}
          </HStack>
        </Link>
      ))}
    </Stack>
  );
};

export default FooterMainLinks;
