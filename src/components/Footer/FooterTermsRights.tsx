import {
  HStack,
  Link,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import footerData from "../../data/footer/footerData";

const NextJsIcon = ({ color, size }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" fill={color ?? "currentColor"} width={size ?? 20} height={size ?? 20} aria-hidden="true">
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4-14h-1.35v4H16V8zm-6.654 1.709L14.905 17.5l1.09-.772L9.683 8H8v8h1.346V9.709z" />
  </svg>
);

const ChakraUiIcon = ({ color, size }: { color?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" fill={color ?? "currentColor"} width={size ?? 16} height={size ?? 16} aria-hidden="true">
    <path d="M7.678 1.583a3.492 3.492 0 0 0-3.03 1.76L.265 10.997a2.035 2.035 0 0 0-.064 1.886l4.486 7.784a3.493 3.493 0 0 0 3.03 1.751l8.602-.01a3.495 3.495 0 0 0 3.026-1.759l4.39-7.655a2.025 2.025 0 0 0-.002-2.008L19.339 3.34a3.494 3.494 0 0 0-3.028-1.756Zm4.365 1.244V9.11c0 .32.226.595.54.656l6.089 1.187c-2.005 3.466-4.006 6.934-6.008 10.4-.17.296-.62.176-.62-.166v-6.286a.667.667 0 0 0-.538-.656l-6.072-1.193 5.988-10.393c.168-.29.621-.178.621.168z" />
  </svg>
);

type FooterTermsRightsProps = {};

const FooterTermsRights = ({}: FooterTermsRightsProps) => {
  const { rightsReserved, bottomLinks, nextJs, chakraUi } = footerData();
  return (
    <Stack
      direction={{ base: "column-reverse", md: "row" }}
      justify={"center"}
      gap={4}
      pl={4}
      pr={4}
      pb={4}
      mt={{ base: 0, md: 4 }}
      mb={{ base: 0, md: 4 }}
      separator={<StackSeparator />}
    >
      <Text textAlign="center">{rightsReserved}</Text>
      <HStack gap={4} flexWrap="wrap" justify="center">
        {bottomLinks.map((link, idx) => (
          <Link key={idx} href={link.url} variant={"underline"}>
            {link.label}
          </Link>
        ))}
      </HStack>
      <HStack gap={2} flexWrap="wrap" justify="center">
        <Text>{"Powered by"}</Text>
        <Link href={nextJs.url} aria-label="Next.js">
          <NextJsIcon size={20} />
        </Link>
        <Text>{"&"}</Text>
        <Link href={chakraUi.url} aria-label="Chakra UI">
          <ChakraUiIcon size={16} />
        </Link>
      </HStack>
    </Stack>
  );
};

export default FooterTermsRights;
