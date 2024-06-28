'use client';

import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa6";

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const hasRunRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async () => {
    setMessage(null); // Reset message
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (error) {
        setMessage(`Login error: ${error.message}`);
      } else {
        setMessage('Login successful!');
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An unexpected error occurred during login.');
    }
  };

  const path = usePathname();

      if (path === '/username') {
        router.push('/username');
        router.refresh();
      }

  const loginWithGoogle = async () => {
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/username`
        }
      });

      if (error) {
        setMessage(`Google login error: ${error.message}`);
      }
    } catch (error) {
      console.error('OAuth login error:', error);
      setMessage('An unexpected error occurred during Google login.');
    }
  };

  return (
    <div className="w-full min-h-screen flex-center bg-[#000]">
      <div className="bg-[#1a1a1a] p-10 rounded-2xl shadow-lg shadow-gray-900 text-center px-16 flex flex-col">
        {message && (
          <div>
            <p className="text-md text-green-500">{message}</p>
          </div>
        )}

        <div className="mt-6">
          <h1 className="main_heading font-normal">Welcome!!</h1>
          <p className="gray_text">Please login to your account</p>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <input
            className="pl-3 pr-16 outline-none hover:scale-[1.03] duration-500 rounded-lg placeholder:text-gray-500 placeholder:text-sm text-start py-1 text-black"
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="example@gmail.com"
          />
          <input
            className="pl-3 pr-16 outline-none hover:scale-[1.03] duration-500 rounded-lg placeholder:text-gray-500 placeholder:text-sm text-start py-1 text-black"
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Enter Password"
          />
        </div>

        <button
          onClick={login}
          className="px-16 py-2 bg-red-400 text-xl duration-500 hover:scale-[1.03] font-bold mt-8 rounded-lg uppercase"
        >
          Login
        </button>
        <a href="/" className="gray_text hover:underline my-4">
          Forgot Password
        </a>

        <div className="flex-grow border-t border-gray-300 mt-4"></div>

        <p className="text-[12px] mt-10 text-red-400">*(google login preferred)</p>
        <button
          onClick={loginWithGoogle}
          className="bg-white hover:scale-[1.03] duration-500 text-gray-800 mt-2 px-16 py-2 font-bold rounded-2xl flex-center gap-3"
        >
          <span className="text-green-700 text-lg">
            <FaGoogle />
          </span>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
