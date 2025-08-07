import Navbar from "@/components/Shared/Navbar";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
