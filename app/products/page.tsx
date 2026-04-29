'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/products');
        if (response.status === 401) {
          router.replace('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Could not load products right now.');
        }

        const data = await response.json();
        setLoading(false);
        setProducts(data.products ?? []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, [router]);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory === 'All'
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory],
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/briteeducation-logo.png"
                alt="BriteStore logo"
                width={56}
                height={56}
                className="h-12 w-12 rounded-full object-cover"
              />
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">BriteStore</h1>
            </div>
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/login', { method: 'DELETE' });
                router.replace('/login');
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Browse all products and filter by category.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            Loading products...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">{error}</div>
        ) : (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Products</h2>
              <span className="text-sm text-slate-600">{filteredProducts.length} items</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                No products found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="mb-4 flex h-44 items-center justify-center rounded-xl bg-slate-100 p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full max-h-36 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="mb-2 line-clamp-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                      {product.category}
                    </p>
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900">{product.title}</h3>
                    <p className="mb-4 line-clamp-3 text-sm text-slate-600">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between text-lg font-bold text-slate-900">
                      <span>Price: ${product.price.toFixed(2)} </span>
                     

                      <button className="mt-auto text-lg bg-blue-500 text-white p-2 rounded-md" onClick={() => router.push(`/products/${product.id}`)}>More Details</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;