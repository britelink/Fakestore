import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">BriteStore Testing Docs</h1>
      <p className="mt-2 text-slate-600">
        Follow these steps to test login, products, and cart endpoints.
      </p>

      <section className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">1) Login</h2>
        <p className="text-slate-700">
          Open <code>/login</code> and use Fake Store test credentials:
        </p>
        <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-800">
          username: <strong>mor_2314</strong> | password: <strong>83r5^_</strong>
        </p>
      </section>

      <section className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">2) Browse products</h2>
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          <li>Go to <code>/products</code> after login.</li>
          <li>Filter by category.</li>
          <li>Open details page from &quot;More Details&quot;.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">3) Test API endpoints</h2>
        <ul className="list-disc space-y-1 pl-5 text-slate-700">
          <li><code>GET/POST /api/products</code></li>
          <li><code>GET/PUT/DELETE /api/products/:productId</code></li>
          <li><code>GET/POST /api/cart</code></li>
          <li><code>GET/PUT/DELETE /api/cart/:cartId</code></li>
          <li><code>GET/POST /api/users</code></li>
          <li><code>GET/PUT/DELETE /api/users/:userId</code></li>
        </ul>
      </section>

      <section className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">4) Use the in-app API Playground</h2>
        <p className="text-slate-700">
          Open <code>/playground</code> to run all endpoints with ready-made templates.
        </p>
      </section>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Back Home
        </Link>
        <Link
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go Login
        </Link>
        <Link
          href="/playground"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Open Playground
        </Link>
      </div>
    </main>
  );
}
