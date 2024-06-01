'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

export default function Login() {


  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const login = async () => {
    setMessage(null); // Reset message
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        setMessage(`Login error: ${error.message}`);
      } else {
        setMessage('Login successful!');
        console.log(dataUser);
        const {data:userdata, error} = await supabase.auth.getUser()
        insertUserdata(userdata.user?.user_metadata.full_name)
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An unexpected error occurred during login.');
    }
  };

  // const signUp = async () => { // Fixed function name typo
  //   setMessage(null); // Reset message
  //   try {
  //     const { data: dataUser, error } = await supabase.auth.signUp({
  //       email: data.email,
  //       password: data.password
  //     });

  //     if (error) {
  //       setMessage(`Signup error: ${error.message}`);
  //     } else {
  //       setMessage('Signup successful! Please check your email to confirm.');
  //       console.log(dataUser);
  //       supabase.from('users').insert({
  //           id: 'sdfsd',
  //           name: 'lskjdf',
  //           email: 'lskddddjf',
  //           username: 'sldkjf'
  //       })
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //     setMessage('An unexpected error occurred during signup.');
  //   }
  //   console.log('clicked')
  // };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


   const insertUserdata = async (namee:string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({ name: namee });

      if (error) {
        console.error('Error inserting user data:', error.message);
        setMessage('An error occurred while inserting user data.');
      } else {
        console.log('User data inserted:', data);
        setMessage('User data inserted successfully.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An unexpected error occurred.');
    }
  };


  const loginWithGoogle = async () => {
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        setMessage(`Google login error: ${error.message}`);
      }
      else{
        const {data:userdata, error} = await supabase.auth.getUser()
        insertUserdata(userdata.user?.user_metadata.full_name)
      }
    } catch (error) {
      console.error('OAuth login error:', error);
      setMessage('An unexpected error occurred during Google login.');
    }
  };

  return (
    <div className="w-full min-h-screen flex-center bg-[#333]">
        <div className="bg-black p-10 rounded-2xl shadow-xl text-center px-16 flex flex-col">

          {message && (
            <div>
              <p className="text-md text-green-500">{message}</p>
            </div>
          )}

          <div className="mt-10">
            <h1 className="main_heading font-normal">Welcome!!</h1>
            <p className="gray_text">Please login to your account</p>
          </div>  

          <div className="mt-10 flex flex-col gap-5">
            <input className="pl-3 pr-16 outline-none hover:scale-[1.03] duration-500 rounded-lg placeholder:text-gray-400 text-start py-1 text-black" type="email" name="email" onChange={handleChange} value={data.email} placeholder="Enter your mail"/>
            <input className="pl-3 pr-16 outline-none hover:scale-[1.03] duration-500 rounded-lg placeholder:text-gray-400 text-start py-1 text-black" type="password" name="password" onChange={handleChange} value={data.password} placeholder="*******"/>
          </div>

          <button onClick={login} className="px-16 py-2 bg-red-400 text-xl hover:scale-[1.03] font-bold mt-8 rounded-lg uppercase">Login</button>
          <a href="/" className="gray_text hover:underline my-4">Forgot Password</a>

          <div className="flex-grow border-t border-gray-300 mt-4"></div>
  
          <button onClick={loginWithGoogle} className="bg-white text-gray-800 mt-10 px-16 py-1 rounded-2xl flex-center gap-3"><FaGoogle/>Sign In with Google</button>

        </div>
    </div>
  );
}


