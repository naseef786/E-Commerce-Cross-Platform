import React, { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
}

const ProductList: React.FC = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Debounced search query → prevents too many API calls
  const debouncedQuery = useDebounce(query, 600);

  // API endpoint (search if query exists, else list all)
  const apiUrl = debouncedQuery
    ? `https://dummyjson.com/products/search?q=${debouncedQuery}`
    : `https://dummyjson.com/products?limit=100`;

  // Custom fetch hook
  const { data, loading, error } = useFetch<ProductResponse>(apiUrl);

  // Pagination logic
  const products = data?.products || [];
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = products.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
          🛍️ Product Search + Pagination
        </h1>

        {/* Search Box */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1); // reset to first page on new search
            }}
            className="w-full sm:w-1/2 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Loading & Error */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading products...</p>
        )}
        {error && (
          <p className="text-center text-red-500 py-10">Error: {error}</p>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <p className="text-center text-gray-400">No products found 😕</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {paginated.map((p) => (
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-1 border rounded-lg ${
                            page === currentPage
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}

                <p className="text-center text-sm text-gray-400 mt-3">
                  Page {currentPage} of {totalPages}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
