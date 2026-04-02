import { useColorPalette } from "@/contexts/useColorPalette";
import { Button, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";

type Props = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};

const AppIconGenerateButton: React.FC<Props> = ({
  disabled,
  loading,
  onClick,
}) => {
  const { palette } = useColorPalette();
  return (
    <Button
      w="full"
      size="lg"
      colorPalette={palette}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid="generate-button"
    >
      {loading ? <Spinner size="sm" /> : <FaWandMagicSparkles />}
      <Text>
        {loading ? "Generating Icons..." : "Generate and Download ZIP"}
      </Text>
    </Button>
  );
};

export default AppIconGenerateButton;
