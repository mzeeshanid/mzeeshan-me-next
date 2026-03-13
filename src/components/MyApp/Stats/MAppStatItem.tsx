import { MyAppStatItemDataModel } from "@/data/myApps/myAppStatsData";
import { HStack, Icon, Stat } from "@chakra-ui/react";
import React from "react";

type Props = {
  idx: number;
  item: MyAppStatItemDataModel;
};

const MAppStatItem: React.FC<Props> = (props: Props) => {
  const { item } = props;
  return (
    <Stat.Root p={4} borderWidth={1} borderRadius={"lg"}>
      <HStack justify="space-between">
        <Stat.Label>{item.label}</Stat.Label>
        <Icon color="fg.muted" as={item.icon} />
      </HStack>
      <Stat.ValueText alignItems={"baseline"}>
        {item.value}
        {item.unit && <Stat.ValueUnit>{item.unit}</Stat.ValueUnit>}
      </Stat.ValueText>
      <Stat.HelpText>{item.helper}</Stat.HelpText>
    </Stat.Root>
  );
};

export default MAppStatItem;
