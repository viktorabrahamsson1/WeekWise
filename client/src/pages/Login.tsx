import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import * as apiClient from "../api/api-auth";
import toast from "react-hot-toast";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

export type SignInFormData = {
  email: string;
  password: string;
};

function Login() {
  const queryClient = useQueryClient();
  const naviate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      toast.success("Successfuly logged in");
      await queryClient.invalidateQueries("validateToken");
      naviate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <div className="flex min-h-screen flex-col bg-violet-50 duration-150 dark:bg-slate-900 ">
      <Header />
      <form
        onSubmit={onSubmit}
        className="container mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12"
      >
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email"
            className="rounded-md border border-gray-400 px-4 py-1 font-normal dark:border-none dark:bg-gray-700"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-sm text-red-400">{errors.email.message}</span>
          )}
        </label>
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Password
          <input
            type="password"
            className="rounded-md border border-gray-400 px-4 py-1 font-normal dark:border-none dark:bg-gray-700"
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
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/register"
              className="text-gray-700 underline duration-150 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400"
            >
              Dont have an account?
            </Link>
            <Link
              to="/forgotPassword"
              className="self-start underline dark:text-gray-300"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            className="ml-auto text-nowrap rounded-sm bg-indigo-400 px-2 py-1 text-white duration-150 hover:bg-indigo-500 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 "
          >
            Log in
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
