"use client";

import { AuthContext, SignIdData } from "@/context/AuthContext";
import { useForm } from 'react-hook-form';
import { useContext } from "react";

const Login = ({}) => {
    const {register, handleSubmit} = useForm<SignIdData>();
    const { login, authError } = useContext(AuthContext);

    const handleLogin = (data : SignIdData) => {
         login(data);
    }

    return (
        <div className="flex justify-center items-center h-screen">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit(handleLogin)}>
        
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Usuário:</label>
            <input 
                {...register('username')}
                type="text" 
                name="username" 
                id="username" 
                placeholder="Seu usuário" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
            <input 
                {...register('password')}
                type="password" 
                name="password" 
                id="password" 
                placeholder="Sua senha" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div className="flex items-center justify-between">
            <input 
                type="submit" 
                value="Login" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            />
        </div>

    </form>
    {authError && <p className="text-red-500 text-sm">{authError}</p>}
</div>

    );
}

export default Login;