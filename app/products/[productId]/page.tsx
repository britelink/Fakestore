import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const cookieStore = await cookies();
  const headerStore = await headers();
  const token = cookieStore.get("fakeStoreToken")?.value;

  if (!token) {
    redirect("/login");
  }

  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const host = headerStore.get("host");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";

  const response = await fetch(
    `${origin}/api/products/${productId}`,
    {
      headers: {
        Cookie: `fakeStoreToken=${token}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
          Could not load product details right now.
        </p>
      </main>
    );
  }

  const data = (await response.json()) as { product?: Product };
  const product = data.product;
  if (!product) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p className="rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
          Product not found.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <Image
          src="/briteeducation-logo.png"
          alt="BriteStore logo"
          width={48}
          height={48}
          className="h-11 w-11 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold text-slate-900">BriteStore Product Details</h1>
      </div>
      <article className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg bg-slate-100 p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={320}
            className="max-h-72 w-auto object-contain"
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {product.category}
          </p>
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">{product.title}</h2>
          <p className="mb-4 text-slate-600">{product.description}</p>
          <p className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
        </div>
      </article>
    </main>
  );
};

export default ProductPage;