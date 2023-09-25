import React, { useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from 'react-router-dom'

const provider = new GoogleAuthProvider()

const Login = () => {
    const [email, setEmail] = React.useState("")
    const navigate = useNavigate()

    const login = () =>  {
        const auth = getAuth()
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential?.accessToken
            const user = result.user
            localStorage.setItem("email", user.email ?? "")
            localStorage.setItem("token", token ?? "")

            setEmail(user.email ?? "")
            console.log("login", token, user)
            // Navigate to the home page after successful login
            navigate('/home')
            loginApi({ access: token});

            
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
        });

    }

    useEffect(() => {
        setEmail(localStorage.getItem("email") ?? "")
    })

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (localStorage.getItem("token")) {
            if(currentPath !== '/profile') {
            navigate('/profile')
            }
        } else {
            if (currentPath !== 'login') {
            navigate('/login')
            }
        }
    }, [navigate])
    return (
        <div className='h-screen w-screen px-2 bg-gray-900 md:pt-84 pt-1 md:flex md:justify-center md:items-center'> 
            <div className='md:max-w-sm shadow-xl mx-auto bg-gray-700 dark:bg-gray-800 transform rounded-lg transition-transform ui-card p-4'> 
                <div className='flex items-center text-white'> 
                    <img
                        src="https://i.ibb.co/kgzKCRZ/autotask-logo-01.png"
                        height={48}
                        width={48}
                        alt=''
                    />
                    <p className='text-xl ml-2 font-semibold'>XLG.AI</p>
                </div>
                <p className='my-4 text-white'>Đăng nhập để tiếp tục</p> 
                {email ? 
                (
                    <p className='text-white'>{`Welcome back, ${email}`}</p>
                ) 
                : 
                (
                    <button
                    onClick={login}
                    className="block relative transition bg-input px-5 py-3 rounded-lg w-full auth-btn bg-white bg-opacity-5 hover:bg-opacity-10"
                    >
                        <span className="flex justify-left items-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                                height={24}
                                width={24}
                                className="mr-2"
                                alt=""
                            />
                            <span className="text-white">Tiếp tục với Google</span>  
                        </span>
                        
                    </button>
                )}
            </div>
        </div>
    )
}

export default Login

