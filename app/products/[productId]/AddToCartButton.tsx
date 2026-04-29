"use client";

import { useState } from "react";

type AddToCartButtonProps = {
  productId: number;
  className?: string;
};

export default function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleAddToCart() {
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      // Fake Store demo user id that is known to exist.
      const demoUserId = 2;
      const today = new Date().toISOString().slice(0, 10);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: demoUserId,
          date: today,
          products: [{ productId, quantity: 1 }],
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data?.message ?? "Could not add product to cart.");
        return;
      }

      setMessage("Added to cart successfully.");
    } catch {
      setError("Network error while adding to cart.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add to Cart"}
      </button>
      {message ? <p className="mt-2 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
