import React from "react";
import { Button, HStack, Icon, Link } from "@chakra-ui/react";
import footerData from "../../data/footer/footerData";

type FooterSocialLinksProps = {};

const FooterSocialLinks = (props: FooterSocialLinksProps) => {
  const { socialLinks } = footerData();

  return (
    <HStack gap={0} justify={{ base: "center", md: "flex-end" }}>
      {socialLinks.map(({ icon, link }, idx) => (
        <Button key={idx} as={"span"} p={0} variant={"ghost"}>
          <Link href={link} aria-label={link}>
            <Icon as={icon} size="md" />
          </Link>
        </Button>
      ))}
    </HStack>
  );
};

export default FooterSocialLinks;
