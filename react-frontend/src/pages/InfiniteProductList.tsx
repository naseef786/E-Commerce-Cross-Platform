import React, { useState, useCallback } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const InfiniteProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const limit = 10;
            const skip = page * limit;
            const res = await fetch(
                `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
            );
            const data = await res.json();

            // Append new products
            setProducts((prev) => [...prev, ...data.products]);
            setPage((prev) => prev + 1);

            if (data.products.length < limit) setHasMore(false);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // Use our custom hook
    const bottomRef = useInfiniteScroll<HTMLDivElement>(() => {
        if (!loading && hasMore) fetchProducts();
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    ♾️ Infinite Scroll Products
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={p.thumbnail}
                                alt={p.title}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h2 className="font-semibold text-gray-800 line-clamp-1">
                                {p.title}
                            </h2>
                            <p className="text-blue-600 font-bold">${p.price}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom sentinel for infinite scroll */}
                <div ref={bottomRef} className="h-10 flex justify-center items-center">
                    {loading ? (
                        <p className="text-gray-500 text-sm">Loading more...</p>
                    ) : !hasMore ? (
                        <p className="text-gray-400 text-sm">No more products 😄</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default InfiniteProductList;
