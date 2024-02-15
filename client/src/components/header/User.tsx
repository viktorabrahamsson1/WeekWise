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

function User() {
  const { handleClick } = useSignOut();
  const { toggleDarkMode, isDark } = useDarkMode();
  const { userInfo } = useAppContext();

  return (
    <div className="flex items-center gap-6 md:ml-auto">
      <div className="flex items-center gap-2">
        <img src="/defaultUser.png" className="w-10" />
        <span className="font-semibold text-gray-300">
          {userInfo?.firstName}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/user">
          <HiOutlineUser
            fontSize={26}
            className="cursor-pointer text-gray-300 duration-150 hover:text-white"
          />
        </Link>
        {isDark ? (
          <HiOutlineSun
            onClick={() => toggleDarkMode()}
            fontSize={26}
            className="cursor-pointer text-gray-300 duration-150 hover:text-white"
          />
        ) : (
          <HiOutlineMoon
            onClick={() => toggleDarkMode()}
            fontSize={26}
            className="cursor-pointer text-gray-300 duration-150 hover:text-white"
          />
        )}
        <HiArrowRightOnRectangle
          onClick={handleClick}
          fontSize={26}
          className="cursor-pointer text-gray-300 duration-150 hover:text-white"
        />
      </div>
    </div>
  );
}

export default User;
