import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const DashboardLayout: React.FC = () => {
    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Products", path: "/dashboard/products" },
        { label: "Settings", path: "/dashboard/settings" },
    ];
    const { theme, toggleTheme } = useTheme();
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
    }, [theme]);
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-200">
                    My Dashboard
                </div>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg font-medium ${isActive
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <header className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-700">Welcome!</h1>
                    <div className="text-gray-500">Admin</div>
                </header>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md min-h-[400px]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
