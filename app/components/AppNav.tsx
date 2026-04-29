import Link from "next/link";

export default function AppNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      <Link href="/" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
        Home
      </Link>
      <Link href="/products" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
        Products
      </Link>
      <Link href="/docs" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
        Docs
      </Link>
      <Link href="/playground" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
        Playground
      </Link>
      <Link href="/api-lab" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
        API Lab
      </Link>
    </nav>
  );
}
