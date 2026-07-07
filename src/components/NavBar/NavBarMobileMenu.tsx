import { Button, HStack, StackSeparator } from "@chakra-ui/react";
import { FaBars, FaXmark } from "react-icons/fa6";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";

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
        color="fg"
      >
        {open ? (
          <DeferredIcon icon={FaXmark} />
        ) : (
          <DeferredIcon icon={FaBars} />
        )}
      </Button>
    </HStack>
  );
};

export default NavBarMobileMenu;
