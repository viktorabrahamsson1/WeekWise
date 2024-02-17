import { Link } from "react-router-dom";
import { useActiveLink } from "../../hooks/useActiveLink";
import {
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlinePaperAirplane,
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
    <aside className="z-10 row-span-full hidden flex-col gap-16 border-r-[1px] border-blue-800 bg-blue-700 px-4 py-6 duration-150 dark:border-r-gray-700 dark:bg-slate-800 lg:flex ">
      <Link
        onClick={() => handleSetActiveLink("/")}
        to="/"
        className="text-center text-3xl font-bold text-white dark:text-gray-300"
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
              className="text-gray-200 duration-150 group-hover:text-white"
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
              className="text-gray-200 duration-150 group-hover:text-white"
            />
          }
        />
        <SideBarLink
          name="Send"
          path="/send"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
          setIsOpen={setIsOpen}
          icon={
            <HiOutlinePaperAirplane
              fontSize={24}
              className="text-gray-200 duration-150 group-hover:text-white"
            />
          }
        />
        <SideBarLink
          name="Retrived"
          path="/retrived"
          activeLink={activeLink}
          handleSetActiveLink={handleSetActiveLink}
          setIsOpen={setIsOpen}
          icon={
            <HiOutlineEnvelope
              fontSize={24}
              className="text-gray-200 duration-150 group-hover:text-white"
            />
          }
        />

        {userInfo?.userRole === "superAdmin" && (
          <SideBarLink
            name="Users"
            path="/users"
            handleSetActiveLink={handleSetActiveLink}
            setIsOpen={setIsOpen}
            activeLink={activeLink}
            icon={
              <HiOutlineUsers
                fontSize={24}
                className="text-gray-200 duration-150 group-hover:text-white"
              />
            }
          />
        )}
        {userInfo?.userRole === "superAdmin" && (
          <SideBarLink
            name="Dashboard"
            path="/dashboard"
            handleSetActiveLink={handleSetActiveLink}
            setIsOpen={setIsOpen}
            activeLink={activeLink}
            icon={
              <HiOutlineChartBarSquare
                fontSize={24}
                className="text-gray-200 duration-150 group-hover:text-white"
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
