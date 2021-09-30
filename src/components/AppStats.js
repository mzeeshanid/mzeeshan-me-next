import { DarkMode } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import {
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";
import React from "react";

function AppStats({ stats }) {
  return (
    <DarkMode>
      <Box w="100%" bg="gray.800" justify="center" align="center">
        <StatGroup maxW="1200px" justify="center" align="center">
          {stats.map((stat, idx) => {
            return (
              <Stat minWidth="220px" key={idx} p={8}>
                <StatLabel fontSize={{ base: 22, lg: 28 }} textColor="white">
                  {stat.title}
                </StatLabel>
                <StatNumber
                  fontSize={{ base: 28, lg: 35 }}
                  textColor="teal.300"
                >
                  {stat.detail}
                </StatNumber>
              </Stat>
            );
          })}
        </StatGroup>
      </Box>
    </DarkMode>
  );
}

export default AppStats;
