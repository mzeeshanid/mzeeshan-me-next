import { Link, Tag } from "@chakra-ui/react";
import React from "react";

type MyThirdPartySDKItemProps = {
  title: string;
  link: string;
};

const MyThirdPartySDKItem: React.FC<MyThirdPartySDKItemProps> = (
  props: MyThirdPartySDKItemProps
) => {
  const { title, link } = props;
  return (
    <Link href={link}>
      <Tag.Root variant={"surface"} size={{ base: "md", md: "lg", lg: "xl" }}>
        <Tag.Label>{title}</Tag.Label>
      </Tag.Root>
    </Link>
  );
};

export default MyThirdPartySDKItem;
