import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";

type UsersOptionsProps = {
  isOpen: boolean;
  toggleEdit: () => void;
  toggleDelete: () => void;
};

function UsersOptions({ isOpen, toggleEdit, toggleDelete }: UsersOptionsProps) {
  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} flex-col gap-1 rounded-md bg-indigo-100 px-2 py-1 text-sm text-gray-700   dark:bg-slate-700 dark:text-gray-200`}
    >
      <span
        onClick={() => {
          toggleEdit();
        }}
        className="group flex cursor-pointer items-center gap-2 "
      >
        <HiOutlinePencil className="duration-100 group-hover:text-gray-900 dark:group-hover:text-gray-400" />
        <span className="duration-100 group-hover:text-gray-900 dark:group-hover:text-gray-400">
          Edit
        </span>
      </span>
      <span
        onClick={() => {
          toggleDelete();
        }}
        className="group flex cursor-pointer items-center gap-2"
      >
        <HiOutlineTrash className="duration-100 group-hover:text-gray-900 dark:group-hover:text-gray-400" />
        <span className="duration-100 group-hover:text-gray-900 dark:group-hover:text-gray-400">
          Delete
        </span>
      </span>
    </div>
  );
}

export default UsersOptions;
