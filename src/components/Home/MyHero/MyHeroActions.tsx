import { useColorPalette } from "@/contexts/useColorPalette";
import myHeroData from "@/data/home/myHeroData";
import { Button, Link, Stack } from "@chakra-ui/react";
import React from "react";

type MyHeroActionsProps = {};

const MyHeroActions: React.FC<MyHeroActionsProps> = ({}) => {
  const { actions } = myHeroData;
  const { palette } = useColorPalette();
  const primaryActions = actions.slice(0, 2);
  const linkedInAction = actions[2];
  return (
    <Stack gap={4} direction="column" w="full">
      <Stack gap={4} direction={{ base: "column", md: "row" }} w="full">
        {primaryActions.map((action, idx) => (
          <Link key={idx} href={action.link} flex={1}>
            <Button
              variant={action.variant}
              colorPalette={palette}
              size={{ base: "lg", md: "xl" }}
              w="full"
            >
              {action.buttonText}
            </Button>
          </Link>
        ))}
      </Stack>
      {linkedInAction && (
        <Link href={linkedInAction.link} w="full" target="_blank" rel="noopener noreferrer">
          <Button
            variant={linkedInAction.variant}
            colorPalette={palette}
            size={{ base: "lg", md: "xl" }}
            w="full"
          >
            {linkedInAction.buttonText}
          </Button>
        </Link>
      )}
    </Stack>
  );
};

export default MyHeroActions;
