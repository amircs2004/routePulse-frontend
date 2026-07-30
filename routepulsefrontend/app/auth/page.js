"use client";

import { useState, useTransition } from "react";
import { register } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      try {
        const result = await register(formData);

        if (result && result.token) {
            console.log(result);

            console.log(result.token);
            sessionStorage.setItem("token", result.token);
         router.push("/dashboard");
        } else {
          setErrorMessage(result?.msg || "Registration failed. Please try again.");
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
  <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-950">
      Create an Account
    </h2>

    {errorMessage && (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
        {errorMessage}
      </div>
    )}

    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Email Address</label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Password</label>
        <input
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-black"
        >
          <option value="Customer">Customer</option>
          <option value="Driver">Driver</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
</div>
  );
}