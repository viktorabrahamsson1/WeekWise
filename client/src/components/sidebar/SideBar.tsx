import { Link } from "react-router-dom";
import { useActiveLink } from "../../hooks/useActiveLink";
import {
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineHome,
  HiOutlineRocketLaunch,
  HiOutlineUsers,
} from "react-icons/hi2";

import SideBarLink from "./SideBarLink";
import { useAppContext } from "../../contexts/AppContext";

type SideBarSmallProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideBar({ setIsOpen }: SideBarSmallProps) {
  const { activeLink, handleSetActiveLink } = useActiveLink();
  const { userInfo } = useAppContext();

  return (
    <aside className="z-10 row-span-full hidden flex-col gap-16 border-slate-200 px-4 py-6 shadow-md duration-150 dark:border-r-[1px] dark:border-r-gray-700 dark:bg-slate-800 lg:flex  ">
      <Link
        onClick={() => handleSetActiveLink("/")}
        to="/"
        className="text-center text-3xl font-bold text-gray-600 dark:text-gray-300"
      >
        WeekWise
      </Link>
      <div className="flex flex-col gap-4">
        <SideBarLink
          name="Home"
          path="/"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
          setIsOpen={setIsOpen}
          icon={
            <HiOutlineHome
              fontSize={24}
              className=" duration-150 group-hover:text-white dark:text-gray-300"
            />
          }
        />
        <SideBarLink
          name="Calender"
          path="/calender"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
          setIsOpen={setIsOpen}
          icon={
            <HiOutlineCalendarDays
              fontSize={24}
              className="text-slate-700 duration-150 group-hover:text-white dark:text-gray-300"
            />
          }
        />
        <SideBarLink
          name="Progress"
          path="/progress"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
          setIsOpen={setIsOpen}
          icon={
            <HiOutlineRocketLaunch
              fontSize={24}
              className="text-slate-700 duration-150 group-hover:text-white dark:text-gray-300"
            />
          }
        />

        {userInfo.userRole === "superAdmin" && (
          <SideBarLink
            name="Users"
            path="/users"
            handleSetActiveLink={handleSetActiveLink}
            setIsOpen={setIsOpen}
            activeLink={activeLink}
            icon={
              <HiOutlineUsers
                fontSize={24}
                className="text-slate-700 duration-150 group-hover:text-white dark:text-gray-300"
              />
            }
          />
        )}
        {userInfo.userRole === "superAdmin" && (
          <SideBarLink
            name="Dashboard"
            path="/dashboard"
            handleSetActiveLink={handleSetActiveLink}
            setIsOpen={setIsOpen}
            activeLink={activeLink}
            icon={
              <HiOutlineChartBarSquare
                fontSize={24}
                className="text-slate-700 duration-150 group-hover:text-white dark:text-gray-300"
              />
            }
          />
        )}
      </div>
      <p className=" mx-auto mt-auto text-nowrap text-[10px] text-gray-400">
        Copyright &copy; 2024 by Viktor Abrahamsson
      </p>
    </aside>
  );
}

export default SideBar;
