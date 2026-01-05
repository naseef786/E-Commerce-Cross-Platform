import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Manage from "./pages/Management";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import TodoApp from "./pages/TodoApp";
import PaginatedProducts from "./pages/PaginatedProducts";
import InfiniteProductList from "./pages/InfiniteProductList";
import HomePage from "./pages/dashboard/HomePage";
import ProductsPage from "./pages/dashboard/Products";
import SettingsPage from "./pages/dashboard/Settings";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/manage" element={<Manage />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Other pages */}
        <Route path="/to-do" element={<TodoApp />} />
        <Route path="/pagination" element={<PaginatedProducts />} />
        <Route path="/infinite" element={<InfiniteProductList />} />
      </Routes>

      {/* Optional: Navbar on all pages except login/signup */}
      <Navbar />
    </BrowserRouter>
  );
}
