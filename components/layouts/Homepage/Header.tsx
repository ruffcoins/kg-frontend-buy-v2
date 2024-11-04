import DesktopHeader from "@/components/shared/headers/DesktopHeader";
import MobileHeader from "@/components/shared/headers/MobileHeader";

const Header: React.FC = () => {
  return (
    <>
      <MobileHeader />
      <DesktopHeader showCallToOrder={true} />
    </>
  );
};

export default Header;
