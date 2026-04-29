import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Image
          src="/briteeducation-logo.png"
          alt="BriteStore logo"
          width={88}
          height={88}
          className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold text-slate-900">Welcome to BriteStore</h1>
        <p className="mt-3 text-slate-600">
          Demo e-commerce app powered by Fake Store API.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Go to Login
          </Link>
          <Link
            href="/docs"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            How to Test This App
          </Link>
        </div>
      </div>
    </main>
  );
}
