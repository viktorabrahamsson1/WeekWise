import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

type UsersOptionsProps = {
  isOpen: boolean;
};

function UsersOptions({ isOpen }: UsersOptionsProps) {
  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} absolute right-5 top-10 z-10 flex-col gap-1 rounded-md bg-indigo-100 px-2 py-1 text-sm text-gray-700   dark:bg-slate-700 dark:text-gray-200`}
    >
      <span className="flex cursor-pointer items-center gap-2">
        <HiOutlinePencil />
        Edit
      </span>
      <span className="flex cursor-pointer items-center gap-2">
        <HiOutlineTrash />
        Delete
      </span>
    </div>
  );
}

export default UsersOptions;
