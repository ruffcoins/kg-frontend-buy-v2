import Footer from "@/components/layouts/Homepage/Footer";
import MobileFooter from "@/components/layouts/Homepage/MobileFooter";
import DesktopHeader from "@/components/shared/headers/DesktopHeader";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen overflow-hidden">
      <DesktopHeader />

      <div className=" lg:mt-20 max-w-[1500px] m-auto">{children}</div>

      <Footer allowCTA={false} />
      <MobileFooter allowCTA={false} />
    </main>
  );
};
export default layout;
