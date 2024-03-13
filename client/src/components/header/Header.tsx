import { Link } from "react-router-dom";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../../hooks/useDarkMode";

function Header() {
  const { toggleDarkMode, isDark } = useDarkMode();

  return (
    <header className="z-10 bg-white py-4 shadow-sm duration-150 dark:bg-slate-800">
      <div className="mx-auto flex items-center justify-between px-3 sm:px-8 md:px-10 ">
        <Link
          to="/"
          className="cursor-pointer text-3xl font-bold text-gray-600 dark:text-gray-200 "
        >
          WeekWise
        </Link>

        <div className="flex items-center gap-2 text-nowrap sm:gap-4">
          <>
            {isDark ? (
              <HiOutlineSun
                onClick={() => toggleDarkMode()}
                fontSize={26}
                className="cursor-pointer text-gray-200 duration-150 hover:text-white"
              />
            ) : (
              <HiOutlineMoon
                onClick={() => toggleDarkMode()}
                fontSize={26}
                className="cursor-pointer text-gray-600 duration-150 hover:text-gray-800"
              />
            )}
          </>
        </div>
      </div>
    </header>
  );
}

export default Header;
