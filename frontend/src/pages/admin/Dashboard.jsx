import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaThList, FaClipboardList, FaUsers } from "react-icons/fa";
import { products } from "../../data/products"; 
import { categories } from "../../data/categories";
import { orders } from "../../data/orders"; 
import { users } from "../../data/users"; 

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    setStats({
      products: products.length,
      categories: categories.length,
      orders: orders.length,
      users: users.length,
    });
  }, []);

  const dashboardItems = [
    {
      title: "Manage Products",
      description: "Add, edit, or remove products from your store.",
      icon: <FaBoxOpen className="h-8 w-8 text-yellow-900" />,
      link: "/admin/products",
      count: stats.products,
    },
    {
      title: "Manage Categories",
      description: "Organize your products into categories.",
      icon: <FaThList className="h-8 w-8 text-yellow-900" />,
      link: "/admin/categories",
      count: stats.categories,
    },
    {
      title: "Manage Orders",
      description: "View and process customer orders.",
      icon: <FaClipboardList className="h-8 w-8 text-yellow-900" />,
      link: "/admin/orders",
      count: stats.orders,
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts.",
      icon: <FaUsers className="h-8 w-8 text-yellow-900" />,
      link: "/admin/users",
      count: stats.users,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        {/* Hero Header */}
        <div
          className="w-full h-64 md:h-80 bg-center bg-cover flex flex-col justify-center items-center"
          style={{ backgroundImage: "url('/images/all.jpg')" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white shadow-lg">
            Admin Dashboard
          </h1>
          <p className="text-white mt-2 md:mt-4 text-lg md:text-xl shadow">
            Manage your store efficiently and easily
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {dashboardItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="p-6 rounded-lg shadow flex flex-col items-start gap-4 transition transform hover:-translate-y-1 hover:scale-105 bg-yellow-100 hover:bg-yellow-200"
              >
                <div className="p-3 bg-yellow-200 rounded-full">{item.icon}</div>
                <h2 className="text-xl font-bold text-yellow-900">{item.title}</h2>
                <p className="text-yellow-800 text-sm">{item.description}</p>
                <span className="mt-auto font-bold text-yellow-900 text-lg">
                  {item.count} {item.title.split(" ")[1]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
