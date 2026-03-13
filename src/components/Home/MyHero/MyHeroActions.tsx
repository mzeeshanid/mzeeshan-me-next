import { useColorPalette } from "@/contexts/useColorPalette";
import myHeroData from "@/data/home/myHeroData";
import { Button, Link, Stack } from "@chakra-ui/react";
import React from "react";

type MyHeroActionsProps = {};

const MyHeroActions: React.FC<MyHeroActionsProps> = ({}) => {
  const { actions } = myHeroData();
  const { palette } = useColorPalette();
  return (
    <Stack gap={4} direction={{ base: "column", md: "row" }} w="full">
      {actions.map((action, idx) => (
        <Link key={idx} href={action.link}>
          <Button
            variant={action.variant}
            colorPalette={palette}
            size={{ base: "lg", md: "xl" }}
          >
            {action.buttonText}
          </Button>
        </Link>
      ))}
    </Stack>
  );
};

export default MyHeroActions;
