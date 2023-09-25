import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/logout');
    }

    return (
        <div className="flex flex-col h-screen justify-between items-center bg-gray-900">
            <div className="text-left self-start ml-8 mt-8">
                <h1 className="text-4xl font-semibold text-gray-300">Home</h1>
            </div>
            <button 
                onClick={handleLogout} 
                className="w-1/4 flex justify-center py-3 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
                Logout
            </button>
            <div></div>
        </div>
    )
}

export default Home;
