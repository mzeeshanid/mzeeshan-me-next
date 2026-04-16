import { useColorPalette } from "@/contexts/useColorPalette";
import {
  ColorPicker,
  For,
  getColorChannels,
  HStack,
  parseColor,
  Portal,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  value: string;
  onChange: (hex: string) => void;
}

const AppIconGeneratorColorPickerControl: React.FC<Props> = ({ value, onChange }) => {
  const { palette } = useColorPalette();

  // Local color drives the picker UI immediately; onChange is debounced 800ms.
  const [localColor, setLocalColor] = React.useState(value);
  const onChangeRef = React.useRef(onChange);
  React.useLayoutEffect(() => { onChangeRef.current = onChange; });

  // Sync if parent resets the value externally
  React.useEffect(() => { setLocalColor(value); }, [value]);

  // Debounce propagation to parent
  React.useEffect(() => {
    const timer = setTimeout(() => { onChangeRef.current(localColor); }, 800);
    return () => clearTimeout(timer);
  }, [localColor]);

  const handleChange = (str: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(str)) {
      setLocalColor(str);
    } else {
      const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const toHex = (n: number) => Number(n).toString(16).padStart(2, "0");
        setLocalColor(
          `#${toHex(Number(match[1]))}${toHex(Number(match[2]))}${toHex(Number(match[3]))}`,
        );
      }
    }
  };

  const parsed = React.useMemo(() => {
    try {
      return parseColor(localColor);
    } catch {
      return parseColor("#000000");
    }
  }, [localColor]);

  return (
    <ColorPicker.Root
      value={parsed}
      onValueChange={(details) => handleChange(details.valueAsString)}
    >
      <ColorPicker.HiddenInput />
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger>
          <ColorPicker.TransparencyGrid rounded="sm" />
          <ColorPicker.ValueSwatch rounded="sm" />
        </ColorPicker.Trigger>
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper
                size="xs"
                variant="subtle"
                colorPalette={palette}
              />
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </HStack>
            <ColorPicker.ChannelInput colorPalette={palette} channel="hex" />
            <ChannelInputs format="rgba" />
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  );
};

const ChannelInputs = (props: { format: ColorPicker.ColorFormat }) => {
  const { palette } = useColorPalette();
  const channels = getColorChannels(props.format).filter(
    (channel) => channel !== "alpha",
  );
  return (
    <ColorPicker.View format={props.format} colorPalette={palette}>
      <HStack>
        <For each={channels}>
          {(channel) => (
            <VStack align={"flex-start"} gap="1" key={channel} flex="1">
              <ColorPicker.ChannelText px={"1"}>
                {channel.charAt(0).toUpperCase()}
              </ColorPicker.ChannelText>
              <ColorPicker.ChannelInput
                channel={channel}
                px="0"
                height="7"
                textStyle="xs"
                textAlign="center"
              />
            </VStack>
          )}
        </For>
      </HStack>
    </ColorPicker.View>
  );
};

export default AppIconGeneratorColorPickerControl;
