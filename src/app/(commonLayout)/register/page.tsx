'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRegisterUserMutation } from "@/redux/api/authApi";

// Define the form data interface
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type ErrorData = {
  message?: string;
  errorSources?: { path: string; message: string }[];
};

const Register = () => {
  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, { isLoading, error, isSuccess }] =
    useRegisterUserMutation();

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await registerUser(data);
  };

  // Type guards
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error !== null && "data" in error;
  }

  function hasErrorData(data: unknown): data is ErrorData {
    return typeof data === "object" && data !== null;
  }

  return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account ✨
        </h2>

        {/* ✅ Error Messages */}
        {isFetchBaseQueryError(error) && hasErrorData(error.data) && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">
            {error.data.message && <p>{error.data.message}</p>}
            {error.data.errorSources?.map((err, idx) => (
              <p key={idx}>
                {err.path}: {err.message}
              </p>
            ))}
          </div>
        )}

        {/* ✅ Success Message */}
        {isSuccess && (
          <div className="mb-4 p-3 rounded bg-green-50 text-green-600 text-sm">
            Your registration is successful, please login.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
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

          {/* Password */}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isLoading && <Loader2 className="animate-spin" size={20} />}
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

