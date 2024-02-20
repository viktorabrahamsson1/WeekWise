import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import toast from "react-hot-toast";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      toast.success("Please verify your email then log in");
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex min-h-screen flex-col bg-indigo-50 dark:bg-slate-900">
      <Header />
      <form
        onSubmit={onSubmit}
        className="container mx-auto flex max-w-6xl flex-col gap-6  px-4 py-12 "
      >
        <div className="flex flex-col gap-6  sm:flex-row">
          <label className="flex flex-1 flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
            First Name
            <input
              className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-slate-700"
              {...register("firstName", { required: "This field is required" })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-400">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="flex flex-1 flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
            Last Name
            <input
              className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-slate-700"
              {...register("lastName", { required: "This field is required" })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-400">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label className="flex flex-col gap-1 font-bold text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email"
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-slate-700"
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
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-slate-700"
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
          Confirm Password
          <input
            type="password"
            className="rounded-md border px-4 py-1 font-normal dark:border-none dark:bg-slate-700 "
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (val) => {
                return val === getValues().password || "Wrong Credentials";
              },
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <span className="flex">
          <Link
            to="/login"
            className="text-gray-700 underline duration-150 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-400"
          >
            Already have an account?
          </Link>
          <button
            type="submit"
            className="ml-auto rounded-sm bg-indigo-400 px-2 py-1 text-white duration-150 hover:bg-indigo-500 hover:text-gray-100 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
          >
            Create Account
          </button>
        </span>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
