import { ReactNode } from "react";
import { useAuthStore } from "../../store";
import NavbarWithLeftDrawer from "../Navbar";

const Layout = ({ children }: { children: ReactNode }): ReactNode => {
  const { authenticated } = useAuthStore()
  if (authenticated) return <NavbarWithLeftDrawer >{children}</NavbarWithLeftDrawer>
  return <div>{children}</div>
};

export default Layout;
