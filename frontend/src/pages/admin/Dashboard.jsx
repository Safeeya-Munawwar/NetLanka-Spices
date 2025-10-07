import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaThList, FaClipboardList, FaUsers } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });

  const [visible, setVisible] = useState(false);
  const dashboardRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, [token]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    const currentRef = dashboardRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        {/* Hero Header */}
        <section
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-center bg-cover bg-no-repeat bg-fixed flex flex-col justify-center items-center"
          style={{ backgroundImage: "url('/images/all.jpg')" }}
        >
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold shadow-lg">
            ADMIN DASHBOARD
          </h1>
          <p className="text-white mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-extralight">
            Manage your store efficiently and easily
          </p>
        </section>
        {/* Dashboard Section */}
        <section
          ref={dashboardRef}
          className="container mx-auto px-6 py-16 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-yellow-800 font-semibold text-lg mb-2">
              Overview
            </h2>
            <h1 className="text-3xl sm:text-4xl font-bold mb-12">
              Manage Your Store
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {dashboardItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className={`p-6 rounded-lg shadow-lg flex flex-col items-start gap-4 bg-yellow-100 hover:bg-yellow-200 transition transform duration-700 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="p-3 bg-yellow-200 rounded-full shadow">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-bold text-yellow-900">
                    {item.title}
                  </h2>
                  <p className="text-yellow-800 text-sm">{item.description}</p>
                  <span className="mt-auto font-bold text-yellow-900 text-lg">
                    {item.count} {item.title.split(" ")[1]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
