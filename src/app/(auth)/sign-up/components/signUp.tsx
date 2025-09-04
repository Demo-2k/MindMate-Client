"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // 👈 нэмсэн
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SignUpEmailPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "all",
  });


 
  const handleBudaa = async (username: string, email: string, password: string) => {
  try {
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`, {
      username, 
      email,
      password,
    });

    // Токен localStorage-д хадгалах
    localStorage.setItem("token", response?.data?.signUpUserAccessToken);

    return true;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const errorMessage = (axiosError.response.data as { message: string })
        .message;
      console.log("error message:", errorMessage);

      if (errorMessage === "User profile already created") {
        return false;
      } else {
        alert(`error: ${errorMessage}`);
        return false;
      }
      return false;
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isSuccess = await handleBudaa(
      values.username,
      values.email,
      values.password
    );

    if (!isSuccess) {
      alert("User profile already created");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
            {/* Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className=" text-white rounded-full p-2">
          <img src="logo2.png" className="w-20 h-20 object-cover rounded-full" alt="Logo" />
        </div>
      </div>

          <h1 className="text-xl font-semibold mb-6">Тавтай морилно уу</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Үргэлжлүүлэхийн тулд нэвтрэх эсвэл шинэ аккаунт үүсгэнэ үү
          </p>

          {/* Email + Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Username */}
            <div className="text-left">
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "focus:ring-red-400 border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "focus:ring-red-400 border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative text-left">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                {...register("password")}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 pr-10 ${
                  errors.password
                    ? "focus:ring-red-400 border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {isSubmitting ? "Loading..." : "Бүртгүүлэх"}
            </button>

            {/* Sign in link */}
            <p className="text-sm text-gray-500 mt-4">
              Бүртгэлтэй юу?{" "}
              <Link
                href="/sign-in"
                className="text-blue-500 hover:underline font-medium"
              >
                Нэвтрэх
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
