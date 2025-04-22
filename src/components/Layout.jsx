import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        {/*https://api.reactrouter.com/v7/functions/react_router.Outlet.html*/}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
