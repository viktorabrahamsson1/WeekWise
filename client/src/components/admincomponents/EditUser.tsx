import { HiXMark } from "react-icons/hi2";
import { User } from "../../routes/admin routes/Users";
import { useForm } from "react-hook-form";
import { ChangeFormData } from "../../routes/ChangeUserInfo";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";

import toast from "react-hot-toast";
import * as apiClient from "../../api/api-admin";

type EditUserProps = {
  editOpen: boolean;
  toggleEdit: () => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type adminChangeFormData = ChangeFormData & {
  role?: string;
};

export type AdminChangeFormDataExtra = ChangeFormData & {
  role?: string;
  originalEmail: string | undefined;
};

function EditUser({
  toggleEdit,
  editOpen,
  setCurrentUser,
  currentUser: user,
  setEditOpen,
}: EditUserProps) {
  const { userInfo } = useAppContext();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<adminChangeFormData>();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const mutation = useMutation(apiClient.adminEditUserInfo, {
    onSuccess: () => {
      resetField("password");
      resetField("confirmPassword");
      queryClient.invalidateQueries("users");
      setEditOpen(false);
      toast.success("Successfully changed info");
    },
    onError: () => {
      toast.error("Failed to change info");
    },
  });

  const onSubmit = handleSubmit((data) => {
    const newData = { ...data, originalEmail: user?.email };
    mutation.mutate(newData);
    setCurrentUser(null);
  });

  if (user === null) return;

  if (user.email === userInfo.email) {
    setCurrentUser(null);
    toast.error("You cant edit your own account here");
    return;
  }

  return (
    <div
      className={`${editOpen ? "block" : "hidden"} absolute top-0 z-30 w-full rounded-sm bg-indigo-100 px-6 py-4 dark:bg-slate-800`}
    >
      <header className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-semibold">Edit User</h2>
        <HiXMark
          onClick={() => {
            setCurrentUser(null);
            toggleEdit();
          }}
          className="h-8 w-7 cursor-pointer hover:text-gray-900 dark:hover:text-gray-600"
        />
      </header>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 divide-y-[1px] divide-gray-200 text-gray-600 transition-all duration-150 dark:divide-gray-700 dark:text-gray-300"
      >
        <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
          <h3 className="text-md flex-1 font-bold">Name</h3>
          <div className="flex flex-1 flex-col flex-wrap gap-4 sm:flex-row ">
            <div className="flex flex-1  flex-col gap-1">
              <input
                placeholder="first name"
                defaultValue={user.firstName}
                {...register("firstName", {
                  minLength: {
                    value: 2,
                    message: "at least 2 characters",
                  },
                })}
                className="rounded-md border border-gray-400 px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
              />
              {errors.firstName && (
                <span className=" text-sm text-red-400">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <input
                placeholder="last name"
                defaultValue={user.lastName}
                {...register("lastName", {
                  minLength: {
                    value: 2,
                    message: "at least 2 characters",
                  },
                })}
                className=" rounded-md border border-gray-400 px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
              />
              {errors.lastName && (
                <span className=" text-sm text-red-400">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
        </label>

        <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
          <h3 className="text-md flex-1 font-bold">Email adress</h3>
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="email"
              defaultValue={user.email}
              {...register("email", {
                minLength: {
                  value: 5,
                  message: "at least 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "To many characters",
                },
              })}
              className="flex-auto rounded-md border border-gray-400 px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
            />
            {errors.email && (
              <span className=" text-sm text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>
        </label>

        {userInfo.userRole === "superAdmin" && (
          <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
            <h3 className="text-md flex-1 font-bold">Role</h3>
            <div className="flex flex-1 flex-col gap-2">
              <select
                defaultValue="user"
                {...register("role")}
                className="flex-auto rounded-md border border-gray-400 px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">SuperAdmin</option>
              </select>
            </div>
          </label>
        )}

        <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
          <h3 className="text-md flex-1 font-bold">Password</h3>
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "at lesat 6 characters",
                },
              })}
              className=" rounded-md border border-gray-400 px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
            />
            {errors.password && (
              <span className=" text-sm text-red-400">
                {errors.password.message}
              </span>
            )}
          </div>
        </label>
        <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
          <h3 className="text-md flex-1 font-bold">Confirm password</h3>
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (val) => {
                  return val === getValues().password || "Wrong Credentials";
                },
              })}
              className="rounded-md border border-gray-400 px-3 py-1 duration-150 focus:outline-1 focus:outline-offset-1 dark:bg-slate-700 dark:placeholder:text-gray-200"
            />
            {errors.confirmPassword && (
              <span className=" text-sm text-red-400">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </label>

        <button
          type="submit"
          className=" self-end rounded-md bg-indigo-400 px-4 py-1 text-gray-100 duration-150 hover:bg-indigo-500 dark:bg-slate-600  dark:hover:bg-slate-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
