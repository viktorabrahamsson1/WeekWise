import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { User } from "../../routes/admin routes/Users";

import * as apiClient from "../../api/api-admin";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

type DeleteUserProps = {
  currentUser: User | null;
  deleteOpen: boolean;
  toggleDelete: () => void;
};

function DeleteUser({
  deleteOpen,
  toggleDelete,
  currentUser,
}: DeleteUserProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.adminDeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toggleDelete();
      toast.success("User deleted");
    },
    onError: () => {
      toast.error("Problem deleting user");
    },
  });

  const deleteUser = (user: User) => {
    mutation.mutate(user);
  };

  if (currentUser === null) return;

  return (
    <div
      className={`${deleteOpen ? "flex" : "hidden"} absolute left-0 top-0 z-40 h-[70dvh] w-full items-center justify-center backdrop-blur-sm`}
    >
      <div className="z-50 flex flex-col items-center gap-4 rounded-sm bg-indigo-100 px-6 py-6 dark:bg-slate-700 xs:px-10">
        <HiOutlineExclamationCircle className="h-24 w-24" />
        <h2 className="text-2xl font-semibold">Are you sure?</h2>
        <div className="flex items-center gap-2 text-gray-200">
          <button
            onClick={() => toggleDelete()}
            className="rounded-md bg-gray-600 px-4 py-1  hover:bg-gray-700 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteUser(currentUser)}
            className="text-nowrap rounded-md  bg-red-400 px-4 py-1 hover:bg-red-500"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser;
