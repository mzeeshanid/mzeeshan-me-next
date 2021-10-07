import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { LightMode } from "@chakra-ui/color-mode";
import { Box, Center } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import React from "react";
import AppHeadingText from "../AppHeadingText";

export default function AppFaqs({ faqs }) {
  return (
    <LightMode>
      <Box p={8} bg={theme.colors.white}>
        <AppHeadingText
          heading="FAQs"
          headingColor={theme.colors.black}
          bg={theme.colors.white}
        />
        <Center bg={theme.colors.white}>
          <Box bg={theme.colors.white} w="full" maxW={"800px"} p={8}>
            <Accordion
              bg={theme.colors.white}
              defaultIndex={[0]}
              border={theme.colors.gray[200]}
              allowMultiple
            >
              {faqs.map((faq, idx) => {
                return (
                  <AccordionItem key={idx}>
                    <h2>
                      <AccordionButton>
                        <Box
                          flex="1"
                          textAlign="left"
                          color={theme.colors.black}
                        >
                          {faq.question}
                        </Box>
                        <AccordionIcon color={theme.colors.black} />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel color={theme.colors.black} pb={4}>
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Box>
        </Center>
      </Box>
    </LightMode>
  );
}
