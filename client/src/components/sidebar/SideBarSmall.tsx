import {
  HiOutlineEnvelope,
  HiOutlinePaperAirplane,
  HiXMark,
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUsers,
  HiOutlineChartBarSquare,
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
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 z-50 flex h-full flex-col gap-16 border-r-[1px] border-blue-800 bg-blue-700 px-6 py-4 transition-all duration-300 ease-in-out dark:border-r-gray-700 dark:bg-slate-800 lg:hidden  `}
    >
      <div className="relative flex items-center gap-6 ">
        <Link
          to="/"
          className="pt-8 text-3xl font-bold text-white dark:text-gray-300"
        >
          WeekWise
        </Link>
        <HiXMark
          onClick={() => setIsOpen((open) => !open)}
          fontSize={28}
          cursor="pointer"
          className="absolute right-[-10px] top-0 duration-150 hover:text-white dark:text-gray-300 dark:hover:text-gray-600"
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
    </div>
  );
}

export default SideBarSmall;
