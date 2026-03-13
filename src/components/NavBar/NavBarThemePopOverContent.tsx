import {
  Button,
  Circle,
  Grid,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorPalette } from "../../contexts/useColorPalette";
import navBarData from "../../data/navBar/navBarData";
import { useColorMode } from "../ui/color-mode";

type NavBarThemePopOverContentProps = {};

const NavBarThemePopOverContent: React.FC<NavBarThemePopOverContentProps> = (
  props
) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { themeColors } = navBarData();
  const { palette, setPalette } = useColorPalette();

  return (
    <Stack>
      <HStack justify="space-between">
        <Text>Theme Panel</Text>
        <Button
          variant="ghost"
          aria-label="toggle dark light theme"
          onClick={toggleColorMode}
        >
          <Icon as={colorMode === "light" ? LuSun : LuMoon} />
        </Button>
      </HStack>
      <Stack>
        <Text>{"Accent Color"}</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {themeColors.map((color, idx) => (
            <HStack
              key={idx}
              aria-label={`set theme color to ${color.name}`}
              borderWidth={1}
              borderRadius={"md"}
              p={2}
              borderColor={palette === color.key ? palette : undefined}
              onClick={() => setPalette(color.key)}
            >
              <Circle size={4} bg={`${color.key}.solid`} />
              <Text>{color.name}</Text>
            </HStack>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default NavBarThemePopOverContent;
