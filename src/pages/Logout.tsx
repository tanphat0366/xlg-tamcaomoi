import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("email");
            navigate('/login');
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        const email = localStorage.getItem("email")
        if (!email) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">Bạn muốn đăng xuất ?</h1>
                <div className="mt-6">
                    <button
                        onClick={logout}
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Logout
