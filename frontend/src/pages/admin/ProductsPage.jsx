import React, { useState } from "react";
import { products as mockProducts } from "../../data/products";
import AdminCard from "../../components/admin/AdminCard";

export default function Products() {
  const [products, setProducts] = useState(mockProducts);

  const handleDelete = (id) => setProducts(products.filter(p => p.id !== id));

  const handleAdd = () => {
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      price: "1000",
      image: "/images/products-header.jpg",
    };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      {/* Header */}
      <div
        className="w-full h-64 md:h-80 bg-center bg-cover flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/12.jpg')" }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Manage Products</h1>
      </div>

      <div className="container mx-auto px-6 py-12">
        <button
          onClick={handleAdd}
          className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Add Product
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <AdminCard
              key={p.id}
              title={p.name}
              image={p.image}
              details={`Price: LKR ${p.price}`}
              actions={
                <>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
