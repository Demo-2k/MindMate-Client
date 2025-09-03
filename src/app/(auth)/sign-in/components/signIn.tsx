"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { MessageSquareHeart, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/provider/userProvider";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }), 
});

type UserType = {
  email: string;
  username?: string;
  avatar?: string;
};

export default function SignIn() {
  const { push } = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [showPassword, setShowPassword] = useState(false); 

  const { getCurrentUserByAccessToken } = useContext(UserContext);

  // JWT-аас user state авах
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get("token");
    const token = tokenFromQuery
      ? decodeURIComponent(tokenFromQuery)
      : localStorage.getItem("token");

    if (!token) return;

    try {
      const parsed = JSON.parse(atob(token.split(".")[1]));
      setUser({
        email: parsed.data.email,
        username: parsed.data.username,
        avatar: parsed.data.avatar,
      });

      if (tokenFromQuery) localStorage.setItem("token", tokenFromQuery);
      window.history.replaceState({}, document.title, "/");
    } catch (e) {
      console.error("JWT parse error:", e);
    }
  }, []);

  const submitLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        { email, password }
      );
      localStorage.setItem("token", res.data.accesstoken);
      setUser(res.data.user);
      toast.success("Login successful!");

      await getCurrentUserByAccessToken();
      push("/");
    } catch {
      toast.error("Login failed");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) =>
    submitLogin(values.email, values.password);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gray-800 text-white rounded-full p-3">
              <span className="text-lg font-bold">AI</span>
            </div>
          </div>

          <h1 className="text-xl font-semibold mb-6">Тавтай морилно уу</h1>
          <p className="text-gray-600 mb-6 text-sm">
            Үргэлжлүүлэхийн тулд нэвтрэх эсвэл шинэ аккаунт үүсгэнэ үү
          </p>

        

         

          {/* Email/password form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-left">
            <div>
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

            <div className="relative">
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
              {isSubmitting ? "Loading..." : "Нэвтрэх"}
            </button>
          </form>

          {/* Signup link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Шинэ аккаунт үүсгэх үү?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 hover:underline font-medium">
              Бүртгэл үүсгэх
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
