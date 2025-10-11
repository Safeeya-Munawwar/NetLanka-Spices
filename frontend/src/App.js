import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import CategoryProducts from "./components/CategoryProducts";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import CategoriesPage from "./pages/admin/CategoriesPage";
import OrdersPage from "./pages/admin/OrdersPage";
import UsersPage from "./pages/admin/UsersPage";
import CategoryFormPage from "./components/admin/CategoryForm";
import ProductPage from "./pages/admin/ProductPage";
import ProductFormPage from "./components/admin/ProductFormPage";
import SearchResults from "./pages/SearchResults";
import BulkOrders from "./pages/admin/BulkOrdersPage";
import BulkOrderForm from "./pages/BulkOrderForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Layout>
                <Products />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <Layout>
                <ProductDetail />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Layout>
                <Categories />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
  path="/search"
  element={
    <PrivateRoute>
      <Layout>
        <SearchResults/>
      </Layout>
    </PrivateRoute>
  }
/>

        <Route
          path="/categories/:category"
          element={
            <PrivateRoute>
              <Layout>
                <CategoryProducts />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Layout>
                <Contact />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <PrivateRoute>
              <Layout>
                <OrderConfirmation />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
  path="/bulk-order/:id"
  element={
    <PrivateRoute>
      <Layout>
        <BulkOrderForm />
      </Layout>
    </PrivateRoute>
  }
/>

       
        {/* Admin Pages */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductPage />} />
        <Route path="/admin/products/form" element={<ProductFormPage />} />
        <Route path="/admin/products/edit/:id" element={<ProductFormPage />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/categories/new" element={<CategoryFormPage />} />
        <Route
          path="/admin/categories/edit/:id"
          element={<CategoryFormPage />}
        />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/bulk-orders" element={<BulkOrders />} />
        <Route path="/admin/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;