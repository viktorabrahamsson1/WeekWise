import { Navigate, Outlet } from "react-router";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

import SideBar from "../components/sidebar/SideBar";
import MainHeader from "../components/header/MainHeader";
import SideBarSmall from "../components/sidebar/SideBarSmall";
import Spinner from "../components/Spinner";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isLoggedIn } = useAppContext();

  if (isLoading)
    return (
      <div className="absolute left-0 top-0 flex h-dvh w-full items-center justify-center">
        <Spinner />
      </div>
    );

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-[16rem_1fr] lg:grid-rows-[auto_1fr] ">
      <SideBar setIsOpen={setIsOpen} />
      <SideBarSmall isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainHeader setIsOpen={setIsOpen} />
      <main className="overflow-scroll overflow-x-hidden bg-indigo-50  px-6 py-16 text-slate-700 duration-150 dark:bg-gray-900 dark:text-gray-200 sm:px-8 md:px-24 ">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
