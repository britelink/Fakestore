import Link from "next/link";
import AppNav from "@/app/components/AppNav";

export default function ApiLabPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10">
      <AppNav />
      <h1 className="text-3xl font-bold text-slate-900">API Exploration Lab</h1>
      <p className="mt-2 text-slate-600">
        Structured flow for students to explore request methods, payloads, and responses.
      </p>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Phase 1: Read endpoints</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <li>Products: <code>/api/products</code>, <code>/api/products/:id</code></li>
          <li>Carts: <code>/api/carts</code>, <code>/api/carts/:id</code></li>
          <li>Users: <code>/api/users</code>, <code>/api/users/:id</code></li>
          <li>Auth: <code>/api/login</code></li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Phase 2: Start with GET</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
          <li>Run <code>GET /api/products</code></li>
          <li>Run <code>GET /api/products/1</code></li>
          <li>Run <code>GET /api/users</code></li>
          <li>Run <code>GET /api/carts</code></li>
        </ol>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Phase 3: Move to write operations</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-700">
          <li>Create product with <code>POST /api/products</code></li>
          <li>Update product with <code>PUT /api/products/:id</code></li>
          <li>Create cart with <code>POST /api/carts</code></li>
          <li>Create user with <code>POST /api/users</code></li>
        </ol>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Phase 4: Validate behavior</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          <li>Compare success status codes against docs.</li>
          <li>Send invalid payload and inspect validation errors.</li>
          <li>Observe shape of returned JSON for each method.</li>
          <li>Confirm cookie-protected endpoints require login.</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/playground"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Open API Playground
        </Link>
        <Link
          href="/docs"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Open Testing Docs
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Back to App
        </Link>
      </div>
    </main>
  );
}
