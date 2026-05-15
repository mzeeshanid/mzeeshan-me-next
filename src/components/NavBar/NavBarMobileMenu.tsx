import { button } from "styled-system/recipes";
import { FaBars, FaXmark } from "react-icons/fa6";
import DeferredIcon from "@/components/DeferredIcon/DeferredIcon";

type NavBarMobileMenuProps = {
  open: boolean;
  onToggle: () => void;
};

const NavBarMobileMenu: React.FC<NavBarMobileMenuProps> = ({ open, onToggle }) => {
  return (
    <button
      className={button({ variant: "ghost" })}
      onClick={onToggle}
      aria-label="toggle main links menu"
    >
      <DeferredIcon icon={open ? FaXmark : FaBars} size="md" />
    </button>
  );
};

export default NavBarMobileMenu;
