import { FC } from "react";
import Header from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mb-6">{children}</div>
    </>
  );
};

export default Layout;
