import React, { useState } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

// ✅ Define Todo Type
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>("");

    // ➕ Add new todo
    const addTodo = (): void => {
        if (!input.trim()) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };

        setTodos((prev) => [...prev, newTodo]);
        setInput("");
    };

    // 🗑 Delete todo
    const deleteTodo = (id: number): void => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // ✅ Toggle complete
    const toggleTodo = (id: number): void => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 text-gray-700">
                    📝 Todo App
                </h1>

                {/* Input */}
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        placeholder="Add a new task..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add
                    </button>
                </div>

                {/* Todo List */}
                <ul className="space-y-2">
                    {todos.length === 0 ? (
                        <p className="text-center text-gray-400">No todos yet 😊</p>
                    ) : (
                        todos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 ${todo.completed ? "opacity-70" : ""
                                    }`}
                            >
                                <span
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`flex-1 cursor-pointer ${todo.completed
                                            ? "line-through text-gray-400"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {todo.text}
                                </span>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`text-xl ${todo.completed ? "text-green-500" : "text-gray-400"
                                            } hover:text-green-600`}
                                    >
                                        <FiCheckCircle />
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-xl text-red-400 hover:text-red-600"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoApp;
