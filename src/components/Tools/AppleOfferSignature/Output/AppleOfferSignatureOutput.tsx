import {
  Box,
  CodeBlock,
  Heading,
  Icon,
  IconButton,
  List,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { PiKey, PiLockKey, PiSignature } from "react-icons/pi";

type Props = {
  plainSignature: string;
  signedSignature: string;
  pemKey: string;
};

const AppleOfferSignatureOutput: React.FC<Props> = (props: Props) => {
  return (
    <Box as={"section"}>
      <VStack w={"full"} align={"flex-start"}>
        <CodeBlockComponent
          title="Plain Signature"
          content={props.plainSignature}
          icon={PiSignature}
        />
        <CodeBlockComponent
          title="Signed Signature"
          content={props.signedSignature}
          icon={PiLockKey}
        />
        <CodeBlockComponent
          title="Key PEM"
          content={props.pemKey}
          icon={PiKey}
        />
        <Spacer p={1} />
        <VStack w={"full"} align={"flex-start"}>
          <Heading>{"Signature Components"}</Heading>
          <Box pl={6}>
            <List.Root>
              {props.plainSignature.split("\u2063").map((value, idx) => {
                return <List.Item key={idx}>{value}</List.Item>;
              })}
            </List.Root>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

const CodeBlockComponent: React.FC<{
  title: string;
  content: string;
  icon?: IconType;
}> = ({ title, content, icon }) => {
  return (
    <CodeBlock.Root w={"full"} code={content} language="plaintext">
      <CodeBlock.Header>
        <CodeBlock.Title>
          {icon && <Icon m={2} as={icon} size={"sm"} />} {title}
        </CodeBlock.Title>
        <CodeBlock.CopyTrigger asChild>
          <IconButton variant="ghost" size="2xs">
            <CodeBlock.CopyIndicator />
          </IconButton>
        </CodeBlock.CopyTrigger>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
};

export default AppleOfferSignatureOutput;
