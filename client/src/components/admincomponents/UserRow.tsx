import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { User } from "../../routes/admin routes/Users";
import { useEffect, useRef } from "react";

import UsersOptions from "./UsersOptions";

interface UserRowProps {
  user: User;
  isOpen: boolean;
  onToggleOptions: (userId: string) => void;
  toggleEdit: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  toggleDelete: () => void;
}

function UserRow({
  user,
  isOpen,
  onToggleOptions,
  toggleEdit,
  setCurrentUser,
  toggleDelete,
}: UserRowProps) {
  const optionsRef = useRef<HTMLDivElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node) &&
        iconWrapperRef.current &&
        !iconWrapperRef.current?.contains(event.target as Node)
      ) {
        onToggleOptions(user.email);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggleOptions, user.email]);

  return (
    <div className="relative flex items-center gap-10 overflow-visible py-3 pl-4 pr-10 xs:justify-between ">
      <p className="w-1/4">{user.firstName}</p>
      <p className="hidden w-1/4 md:block">{user.isVerified ? "Yes" : "No"}</p>
      <p className="hidden w-1/4 xs:block">{user.role}</p>
      <p className="w-56 truncate xs:w-1/4">{user.email}</p>

      <div
        ref={iconWrapperRef}
        onClick={(e) => {
          e.stopPropagation();
          onToggleOptions(user.email);
        }}
        className="absolute right-0 flex items-center justify-center"
      >
        <HiOutlineEllipsisVertical className="h-10 w-8 cursor-pointer pr-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700" />
      </div>
      <div className="absolute right-5 top-9 z-10" ref={optionsRef}>
        <UsersOptions
          user={user}
          isOpen={isOpen}
          setCurrentUser={setCurrentUser}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
        />
      </div>
    </div>
  );
}

export default UserRow;
