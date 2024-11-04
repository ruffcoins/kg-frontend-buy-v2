import HomepageLayout from "@/components/layouts/Homepage/HomepageLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <HomepageLayout>
      <div className="mt-40 max-w-[1500px] m-auto">{children}</div>
    </HomepageLayout>
  );
};

export default layout;
