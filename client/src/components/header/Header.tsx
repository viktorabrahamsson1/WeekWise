import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

import SignOutButton from "../SignOutButton";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../../hooks/useDarkMode";

function Header() {
  const { isLoggedIn } = useAppContext();
  const { toggleDarkMode, isDark } = useDarkMode();

  return (
    <header className="z-10 bg-blue-600 py-4 shadow-md duration-150 dark:bg-slate-800">
      <div className="mx-auto flex items-center justify-between px-3 sm:px-8 md:px-10 ">
        <Link to="/" className="cursor-pointer text-3xl font-bold text-white ">
          WeekWise
        </Link>

        <div className="flex items-center gap-2 text-nowrap sm:gap-4">
          <>
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
            {isLoggedIn && <SignOutButton />}
          </>
        </div>
      </div>
    </header>
  );
}

export default Header;
