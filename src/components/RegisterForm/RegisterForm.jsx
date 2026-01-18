"use client";
import { postUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import SocialButton from "../Buttons/SocialButton";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const params = useSearchParams();

  const router = useRouter();

  const callBackUrl = params.get("callback") || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postUser(form);

    if (result?.acknowledged) {
      const loginResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callBackUrl,
      });

      if (loginResult?.ok) {
        Swal.fire("Success", "Registered successfully", "success");
        router.push(callBackUrl);
      }
    } else {
      Swal.fire("Error", "Sorry, registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-2">Sign up to get started</p>
        <SocialButton></SocialButton>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gmail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
