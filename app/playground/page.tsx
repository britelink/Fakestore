"use client";

import { FormEvent, useState } from "react";

const endpointTemplates = [
  { label: "GET products", value: "/api/products", method: "GET" },
  { label: "POST product", value: "/api/products", method: "POST" },
  { label: "GET product by id", value: "/api/products/1", method: "GET" },
  { label: "PUT product by id", value: "/api/products/1", method: "PUT" },
  { label: "DELETE product by id", value: "/api/products/1", method: "DELETE" },
  { label: "GET carts", value: "/api/cart", method: "GET" },
  { label: "POST cart", value: "/api/cart", method: "POST" },
  { label: "GET cart by id", value: "/api/cart/1", method: "GET" },
  { label: "PUT cart by id", value: "/api/cart/1", method: "PUT" },
  { label: "DELETE cart by id", value: "/api/cart/1", method: "DELETE" },
  { label: "GET users", value: "/api/users", method: "GET" },
  { label: "POST user", value: "/api/users", method: "POST" },
  { label: "GET user by id", value: "/api/users/1", method: "GET" },
  { label: "PUT user by id", value: "/api/users/1", method: "PUT" },
  { label: "DELETE user by id", value: "/api/users/1", method: "DELETE" },
];

const defaultBodies: Record<string, string> = {
  "POST /api/products": JSON.stringify(
    {
      title: "Teaching Demo Product",
      price: 29.99,
      description: "A product created from the BriteStore API Playground",
      category: "electronics",
      image: "https://i.pravatar.cc",
    },
    null,
    2,
  ),
  "PUT /api/products/1": JSON.stringify(
    {
      title: "Updated Demo Product",
      price: 19.99,
      description: "Updated by the BriteStore API Playground",
      category: "electronics",
      image: "https://i.pravatar.cc",
    },
    null,
    2,
  ),
  "POST /api/cart": JSON.stringify(
    {
      userId: 2,
      date: "2026-04-29",
      products: [{ productId: 1, quantity: 1 }],
    },
    null,
    2,
  ),
  "PUT /api/cart/1": JSON.stringify(
    {
      userId: 2,
      date: "2026-04-29",
      products: [{ productId: 1, quantity: 2 }],
    },
    null,
    2,
  ),
  "POST /api/users": JSON.stringify(
    {
      email: "demo@britestore.com",
      username: "brite_demo_user",
      password: "demopass123",
    },
    null,
    2,
  ),
  "PUT /api/users/1": JSON.stringify(
    {
      email: "updated@britestore.com",
      username: "updated_demo_user",
      password: "updatedpass123",
    },
    null,
    2,
  ),
};

export default function PlaygroundPage() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/products");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function loadTemplate(nextMethod: string, nextEndpoint: string) {
    setMethod(nextMethod);
    setEndpoint(nextEndpoint);
    setBody(defaultBodies[`${nextMethod} ${nextEndpoint}`] ?? "");
  }

  async function runRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setResponseText("");

    try {
      const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (["POST", "PUT"].includes(method)) {
        options.body = body || "{}";
      }

      const response = await fetch(endpoint, options);
      const text = await response.text();
      setStatus(`${response.status} ${response.statusText}`);
      setResponseText(text);
    } catch (error) {
      setStatus("Request failed");
      setResponseText(error instanceof Error ? error.message : "Unknown network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900">BriteStore API Playground</h1>
      <p className="mt-2 text-slate-600">
        Test all Fake Store proxy endpoints from one screen. Login first so protected routes work.
      </p>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold">Quick templates</h2>
        <div className="flex flex-wrap gap-2">
          {endpointTemplates.map((template) => (
            <button
              key={`${template.method}-${template.value}-${template.label}`}
              type="button"
              onClick={() => loadTemplate(template.method, template.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100"
            >
              {template.label}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={runRequest} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="rounded-md border border-slate-300 p-2"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="rounded-md border border-slate-300 p-2 font-mono text-sm"
            placeholder="/api/products"
          />
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-56 w-full rounded-md border border-slate-300 p-3 font-mono text-sm"
          placeholder="JSON body for POST/PUT requests"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Running..." : "Run Request"}
        </button>
      </form>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Response</h2>
        <p className="mt-2 text-sm text-slate-600">Status: {status || "No request yet"}</p>
        <pre className="mt-3 overflow-x-auto rounded-md bg-slate-900 p-4 text-xs text-slate-100">
          {responseText || "Response body will appear here..."}
        </pre>
      </section>
    </main>
  );
}
