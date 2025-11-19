import { useState } from "react";
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } from "../features/productApi";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Manage() {
  const { data: products = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ name, description, price: Number(price) });
    setName(""); setDescription(""); setPrice("");
  };

  return (
    <ProtectedRoute requireAdmin>
      <h2>Manage Products</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      {products.map(p => (
        <div key={p._id}>
          {p.name} <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </ProtectedRoute>
  );
}
