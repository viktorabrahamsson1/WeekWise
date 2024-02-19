import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";

export type ChangeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function ChangeUserInfo() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm<ChangeFormData>();
  const { userInfo } = useAppContext();

  const mutation = useMutation(apiClient.editUserInfo, {
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries("validateToken");
      resetField("password");
      resetField("confirmPassword");
    },
    onError: () => {
      toast.error("Problem updating user info");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 divide-y-[1px] divide-gray-200 text-gray-600 transition-all duration-150 dark:divide-gray-800 dark:text-gray-300"
    >
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <div className="flex flex-col py-2">
        <h3 className="text-lg font-bold">Personal info</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Update your photo and personal details here
        </span>
      </div>

      <label className="flex flex-col justify-between gap-2 py-4 sm:flex-row">
        <h3 className="text-md flex-1 font-bold">Name</h3>
        <div className="flex flex-1 flex-col flex-wrap gap-4 sm:flex-row ">
          <div className="flex flex-1  flex-col gap-1">
            <input
              defaultValue={userInfo.firstName}
              placeholder="first name"
              {...register("firstName", {
                minLength: {
                  value: 2,
                  message: "at least 2 characters",
                },
              })}
              className="rounded-md border px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
            />
            {errors.firstName && (
              <span className="text-sm text-red-300">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <input
              defaultValue={userInfo.lastName}
              placeholder="last name"
              {...register("lastName", {
                minLength: {
                  value: 2,
                  message: "at least 2 characters",
                },
              })}
              className=" rounded-md border px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
            />
            {errors.lastName && (
              <span className="text-sm text-red-300">
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
            defaultValue={userInfo.email}
            type="email"
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
            className="flex-auto rounded-md border px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
          />
          {errors.email && (
            <span className="text-sm text-red-300">{errors.email.message}</span>
          )}
        </div>
      </label>

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
            className="rounded-md border px-3 py-1 duration-150 dark:bg-slate-700 dark:placeholder:text-gray-200"
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
            className="rounded-md border px-3 py-1 duration-150 focus:outline-1 focus:outline-offset-1 dark:bg-slate-700 dark:placeholder:text-gray-200"
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
        className=" self-end rounded-md bg-blue-600 px-4 py-1 text-gray-100 duration-150 hover:bg-blue-700 dark:bg-slate-600 dark:hover:bg-slate-700"
      >
        Save
      </button>
    </form>
  );
}

export default ChangeUserInfo;
