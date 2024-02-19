import { HiBars3 } from "react-icons/hi2";
import User from "./User";

type MainHeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MainHeader({ setIsOpen }: MainHeaderProps) {
  return (
    <header className="z-10  py-3 shadow-sm duration-150 dark:border-b-[1px] dark:border-b-gray-700 dark:bg-slate-800">
      <div className="flex items-center justify-between px-3 md:px-4 lg:px-6 ">
        <HiBars3
          onClick={() => setIsOpen((open) => !open)}
          fontSize={28}
          cursor="pointer"
          className="duration-150 hover:text-slate-600 dark:text-gray-300 dark:hover:text-gray-600 lg:hidden"
        />
        <User />
      </div>
    </header>
  );
}

export default MainHeader;
