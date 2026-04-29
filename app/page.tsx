import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white/90 shadow-xl shadow-blue-100">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr,1fr] lg:p-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-900">
                BRITEEDUCATION SCHOOL OF TECHNOLOGY
              </div>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                BriteStore API Demo
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
                Academic full-stack demo using Next.js, Fake Store API, protected routes, and
                a PostgreSQL-ready data layer.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="rounded-xl bg-[#1e2a78] px-5 py-3 font-semibold text-white transition hover:bg-[#17215f]"
                >
                  Login to Start
                </Link>
                <Link
                  href="/docs"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  View Demo Guide
                </Link>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">API First</p>
                  <p className="mt-1">Structured methods, validation, and status handling.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">Student Friendly</p>
                  <p className="mt-1">Built for class demos, labs, and practical exercises.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
              <Image
                src="/briteeducation-logo.png"
                alt="BRITEEDUCATION logo"
                width={320}
                height={320}
                priority
                className="mx-auto h-auto w-full max-w-[240px] object-contain"
              />
              <p className="mt-5 text-center text-sm font-medium text-slate-600">
                Powered by Fake Store API and modern Next.js architecture.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-700">
                <span className="rounded-lg bg-white p-2">Auth</span>
                <span className="rounded-lg bg-white p-2">Products</span>
                <span className="rounded-lg bg-white p-2">DB Ready</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-3 sm:grid-cols-3">
          <Link
            href="/playground"
            className="rounded-xl border border-slate-200 bg-white p-4 text-center font-medium text-slate-700 transition hover:border-slate-300 hover:shadow-sm"
          >
            API Playground
          </Link>
          <Link
            href="/api-lab"
            className="rounded-xl border border-slate-200 bg-white p-4 text-center font-medium text-slate-700 transition hover:border-slate-300 hover:shadow-sm"
          >
            API Lab
          </Link>
          <Link
            href="/challenges"
            className="rounded-xl border border-slate-200 bg-white p-4 text-center font-medium text-slate-700 transition hover:border-slate-300 hover:shadow-sm"
          >
            Challenges
          </Link>
        </div>
      </section>
    </main>
  );
}
