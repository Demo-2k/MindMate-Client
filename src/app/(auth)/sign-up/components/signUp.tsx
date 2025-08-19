"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Zod schema
const formSchema = z.object({
  email: z.string().email({ message: "Зөв email оруулна уу" }),
  password: z.string().min(6, { message: "Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // real-time validation
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  useEffect(() => {
    if (emailValue !== "") trigger("email");
  }, [emailValue, trigger]);

  useEffect(() => {
    if (passwordValue !== "") trigger("password");
  }, [passwordValue, trigger]);

  const onSubmit = async (data: FormData) => {
    try {
      // Backend руу signup хүсэлт илгээх
      await axios.post("/api/signup", data);

      // Амжилттай signup бол HomePage руу чиглүүлэх
      router.push("/"); // HomePage-ийн route
    } catch (error: any) {
      console.error(error);
      alert("Бүртгэл амжилтгүй боллоо");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gray-800 text-white rounded-full p-3">
            <span className="text-lg font-bold">AI</span>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-6">Welcome</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Sign in or create an account to continue
        </p>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-2 mt-3 border py-2 rounded-lg font-medium hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          Start writing with Google
        </button>

        {/* OR */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email + Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="text-left">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="text-left">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            {isSubmitting ? "Loading..." : "Start writing with Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
