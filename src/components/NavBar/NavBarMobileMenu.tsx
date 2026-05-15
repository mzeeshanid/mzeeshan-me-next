import { Button, HStack, Icon, StackSeparator } from "@chakra-ui/react";
import { FaBars, FaXmark } from "react-icons/fa6";

type NavBarNormalMenuProps = {
  open: boolean;
  onToggle: () => void;
};

const NavBarMobileMenu: React.FC<NavBarNormalMenuProps> = (props) => {
  const { open, onToggle } = props;

  return (
    <HStack separator={<StackSeparator />} gap={2}>
      <Button
        variant="ghost"
        onClick={onToggle}
        aria-label="toggle main links menu"
      >
        {open ? <Icon as={FaXmark} /> : <Icon as={FaBars} />}
      </Button>
    </HStack>
  );
};

export default NavBarMobileMenu;
