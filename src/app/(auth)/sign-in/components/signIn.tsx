"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { MessageSquareHeart } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email." }),
  password: z.string().min(2, { message: "Password must be at least 2 characters." }),
});

export default function SignIn() {
  const { push } = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const username = params.get("name");
    const avatar = params.get("avatar");

    if (email) {
      setUser({ email, username: username || undefined, avatar: avatar || undefined });
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");
    if (token && !user) {
      try {
        const parsed = JSON.parse(atob(token.split(".")[1]));
        setUser({
          email: parsed.data.email,
          username: parsed.data.username,
          avatar: parsed.data.avatar,
        });
      } catch {}
    }
  }, []);

  const submitLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:4001/auth/sign-in", { email, password });
      localStorage.setItem("token", res.data.accesstoken);
      setUser(res.data.user);
      toast.success("Login successful!");
      push("/");
    } catch {
      toast.error("Login failed");
    }
  };

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => submitLogin(values.email, values.password);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      {/* Header */}
      <header className="w-full bg-blue-200 p-4 flex items-center gap-3 justify-center shadow">
        <MessageSquareHeart className="w-8 h-8 text-pink-500" />
        <div className="flex flex-col leading-tight">
          <span className="text-4xl font-bold text-black">MindMate</span>
          <span className="text-lg font-medium text-black">Your daily vibe check ✨</span>
        </div>
      </header>
      
    
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center py-12">
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

          {/* Google login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            onClick={() => (window.location.href = "http://localhost:4001/auth/google")}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* OR divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

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
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-400 border-red-500"
                    : "focus:ring-blue-400"
                }`}
              />
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
              {isSubmitting ? "Loading..." : "Continue with Email"}
            </button>
          </form>

          {/* Signup link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
