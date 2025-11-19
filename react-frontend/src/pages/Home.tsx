import { useGetProductsQuery } from "../features/productApi";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
  const { data: products = [], isLoading } = useGetProductsQuery();

  return (
    <ProtectedRoute>
      <h2>Products</h2>
      {isLoading ? <p>Loading...</p> : products.map(p => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>
        </div>
      ))}
    </ProtectedRoute>
  );
}
