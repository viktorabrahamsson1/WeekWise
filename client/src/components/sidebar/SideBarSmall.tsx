import {
  HiXMark,
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineChartBarSquare,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

import { Link } from "react-router-dom";
import { useActiveLink } from "../../hooks/useActiveLink";
import SideBarLink from "./SideBarLink";
import { useAppContext } from "../../contexts/AppContext";

type SideBarSmallProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideBarSmall({ isOpen, setIsOpen }: SideBarSmallProps) {
  const { activeLink, handleSetActiveLink } = useActiveLink();
  const { userInfo } = useAppContext();

  return (
    <div
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 z-50 flex h-full flex-col gap-16 border-r-[1px] bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:border-r-gray-700 dark:bg-slate-800 lg:hidden  `}
    >
      <div className="relative flex items-center gap-6 ">
        <Link
          to="/"
          className="mx-auto pt-8 text-3xl font-bold text-gray-600 dark:text-gray-300"
        >
          WeekWise
        </Link>
        <HiXMark
          onClick={() => setIsOpen((open) => !open)}
          fontSize={28}
          cursor="pointer"
          className="absolute right-[-10px] top-0 duration-150 hover:text-slate-600 dark:text-gray-300 dark:hover:text-gray-600"
        />
      </div>
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
              className="text-slate-600 duration-150 group-hover:text-white dark:text-gray-300"
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
              className="text-slate-600 duration-150 group-hover:text-white dark:text-gray-300"
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
                className="text-slate-600 duration-150 group-hover:text-white dark:text-gray-300"
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
                className="text-slate-600 duration-150 group-hover:text-white dark:text-gray-300"
              />
            }
          />
        )}
      </div>
      <p className=" mx-auto mt-auto text-nowrap text-[8px] text-gray-400">
        Copyright &copy; 2024 by Viktor Abrahamsson
      </p>
    </div>
  );
}

export default SideBarSmall;
