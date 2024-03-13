import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Footer from "../components/Footer";
import Header from "../components/header/Header";
import toast from "react-hot-toast";
import * as apiClinet from "../api/api-user";

export type ForgotPasswordData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const mutation = useMutation(apiClinet.forgotPassword, {
    onSuccess: () => {
      toast.success("Please verify with your email");
      navigate("/login");
    },
    onError: () => {
      toast.error("Problem changing password");
    },
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    mutation.mutate(formData);
  });
  return (
    <div className="flex min-h-screen flex-col bg-violet-50 duration-150 dark:bg-slate-900 ">
      <Header />
      <form
        onSubmit={onSubmit}
        className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12"
      >
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Forgot password
        </h2>
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email"
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-gray-700"
            {...register("email", { required: "This field is required" })}
          />
        </label>
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Password
          <input
            type="password"
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-gray-700"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-400">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Confirm password
          <input
            type="password"
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-gray-700"
            {...register("confirmPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
              validate: (val) => {
                return val === getValues().password || "Wrong Credentials";
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <div className="flex items-center justify-between">
          <Link
            to="/login"
            className="text-gray-700 underline duration-150 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Go back to login
          </Link>
          <button
            type="submit"
            className="ml-auto rounded-sm bg-indigo-400 px-2 py-1 text-white duration-150 hover:bg-indigo-500 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 "
          >
            Change password
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
