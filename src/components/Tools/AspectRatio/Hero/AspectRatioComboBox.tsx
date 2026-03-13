import {
  AspectRatioLinearCommonRatioModel,
  aspectRatioLinearCommonRatios,
} from "@/data/tools/aspectRatio/aspectRatioCommon";
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  comboxBoxValueChanged: (value: AspectRatioLinearCommonRatioModel) => void;
};

const AspectRatioComboBox: React.FC<Props> = (props: Props) => {
  const { comboxBoxValueChanged } = props;
  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: aspectRatioLinearCommonRatios,
    filter: contains,
  });
  return (
    <Combobox.Root
      openOnClick
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      onValueChange={(e) => {
        const selected = collection.items.find(
          (item) => item.value === e.value[0],
        );

        if (selected) {
          comboxBoxValueChanged(selected);
        }
      }}
    >
      <Combobox.Label>{"Select a common aspect ratio"}</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>{"No items found"}</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.label}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};

export default AspectRatioComboBox;
