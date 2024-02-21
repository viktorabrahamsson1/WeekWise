import {
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
} from "react-icons/hi2";
import { useSignOut } from "../../hooks/useSignOut";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAppContext } from "../../contexts/AppContext";
import { useActiveLink } from "../../hooks/useActiveLink";

function User() {
  const { handleClick } = useSignOut();
  const { toggleDarkMode, isDark } = useDarkMode();
  const { userInfo } = useAppContext();
  const { handleSetActiveLink } = useActiveLink();

  return (
    <div className="flex items-center gap-6 md:ml-auto">
      <div className="flex items-center gap-2">
        <img
          src="/defaultUser.png"
          className="w-10 drop-shadow-sm"
          alt="Profilepicture"
        />
        <span className="font-semibold text-slate-700 dark:text-gray-300">
          {userInfo.firstName}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/user"
          onClick={() => {
            handleSetActiveLink("");
          }}
        >
          <HiOutlineUser
            fontSize={26}
            className="cursor-pointer text-slate-700 duration-150 hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
          />
        </Link>
        {isDark ? (
          <HiOutlineSun
            onClick={() => toggleDarkMode()}
            fontSize={26}
            className="cursor-pointer text-slate-700 duration-150 hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
          />
        ) : (
          <HiOutlineMoon
            onClick={() => toggleDarkMode()}
            fontSize={26}
            className="cursor-pointer text-slate-700 duration-150 hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
          />
        )}
        <HiArrowRightOnRectangle
          onClick={handleClick}
          fontSize={26}
          className="cursor-pointer text-slate-700 duration-150 hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
        />
      </div>
    </div>
  );
}

export default User;
