import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
    const navigate = useNavigate();

    const selectRole = (role) => {
        localStorage.setItem("role", role);
        navigate("/location");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">

            <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-lg">

                <h1 className="text-2xl font-bold text-center">
                    Welcome to Digital Chok
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    What would you like to do?
                </p>

                <button
                    onClick={() => selectRole("customer")}
                    className="w-full flex items-center gap-4 p-5 border rounded-2xl mb-4 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                >
                    <span className="text-4xl">👤</span>

                    <div>
                        <h2 className="font-bold text-lg">
                            I'm a Customer
                        </h2>
                        <p className="text-sm text-gray-500">
                            I need a service near me
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => selectRole("provider")}
                    className="w-full flex items-center gap-4 p-5 border rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition text-left"
                >
                    <span className="text-4xl">🧑‍🔧</span>

                    <div>
                        <h2 className="font-bold text-lg">
                            I'm a Service Provider
                        </h2>
                        <p className="text-sm text-gray-500">
                            I want to provide my services
                        </p>
                    </div>
                </button>

            </div>
        </div>
    );
}

export default RoleSelection;