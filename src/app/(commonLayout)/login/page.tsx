'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "@/redux/feature/hook";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/feature/auth/authSlice";

// Define the form data interface
interface FormData {
  email: string;
  password: string;
  remember: boolean;
}
type ErrorData = {
  message?: string;
};

const Login = () => {
  // Initialize useForm hook
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await loginUser(data);
    const user = verifyToken(res?.data?.data?.accessToken) as TUser;
    dispatch(setUser({ user: user, token: res?.data?.data?.accessToken }));
  };
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error !== null && "data" in error;
  }

  function hasMessage(data: unknown): data is ErrorData {
    return (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as ErrorData).message === "string"
    );
  }

  return (
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {isFetchBaseQueryError(error) && hasMessage(error.data) && (
              <p className="text-red-500 text-sm mt-1">{error.data.message}</p>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("remember")}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isLoading && <Loader2 className="animate-spin" size={20} />}
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;