import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { User } from "../../routes/admin routes/Users";
import UsersOptions from "./UsersOptions";

interface UserRowProps {
  user: User;
  isOpen: boolean;
  onToggleOptions: (userId: string) => void;
}

function UserRow({ user, isOpen, onToggleOptions }: UserRowProps) {
  return (
    <div className="relative flex items-center gap-10 overflow-visible py-3 pl-4 pr-10 xs:justify-between ">
      <p className="w-1/4">{user.firstName}</p>
      <p className="hidden w-1/4 md:block">{user.isVerified ? "Yes" : "No"}</p>
      <p className="hidden w-1/4 xs:block">{user.role}</p>
      <p className="w-56 truncate xs:w-1/4">{user.email}</p>

      <HiOutlineEllipsisVertical
        onClick={() => onToggleOptions(user.email)}
        className=" absolute right-0 h-10 w-8 cursor-pointer pr-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700"
      />
      <UsersOptions isOpen={isOpen} />
    </div>
  );
}

export default UserRow;
