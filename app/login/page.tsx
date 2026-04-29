"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message ?? "Login failed.");
        return;
      }

      router.push("/products");
    } catch {
      setError("Could not login right now. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 font-sans dark:bg-black">
      <div className="flex w-full max-w-sm flex-col items-center justify-center">
        <Image
          src="/briteeducation-logo.png"
          alt="BriteStore logo"
          width={96}
          height={96}
          className="mb-3 h-20 w-20 rounded-full object-cover"
        />
        <h1 className="text-center text-4xl font-bold">BriteStore</h1>
        <p className="mt-1 text-center text-sm font-medium text-slate-600">Sign in</p>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Use Fake Store test user:
          <br />
          <span className="font-medium">mor_2314 / 83r5^_</span>
        </p>
        <form
          className="m-5 flex w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-gray-300 p-4 shadow-md"
          onSubmit={handleLoginSubmit}
        >
          <input
            className="w-full rounded-md border border-gray-300 p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full rounded-md border border-gray-300 p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="w-full text-sm text-red-600">{error}</p> : null}

          <button
            className="w-full cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;