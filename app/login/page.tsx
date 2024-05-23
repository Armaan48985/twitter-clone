'use client';

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An unexpected error occurred during login.');
    }
  };

  const signUp = async () => { // Fixed function name typo
    setMessage(null); // Reset message
    try {
      const { data: dataUser, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (error) {
        setMessage(`Signup error: ${error.message}`);
      } else {
        setMessage('Signup successful! Please check your email to confirm.');
        console.log(dataUser);
        supabase.from('users').insert({
            id: 'sdfsd',
            name: 'lskjdf',
            email: 'lskddddjf',
            username: 'sldkjf'
        })
        router.refresh();
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('An unexpected error occurred during signup.');
    }
    console.log('clicked')
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


   const insertUserdata = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .insert({ id: "hellyeah" });

      if (error) {
        console.error('Error inserting user data:', error.message);
        setMessage('An error occurred while inserting user data.');
      } else {
        console.log('User data inserted:', data);
        setMessage('User data inserted successfully.');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
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
        // const a = supabase.auth.getUser()
        insertUserdata()
      }
    } catch (error) {
      console.error('OAuth login error:', error);
      setMessage('An unexpected error occurred during Google login.');
    }
  };

  return (
    <div className="container grid gap-4 bg-black">
      <div className="grid mt-16">
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="text-black"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          // type="password" // Fixed input type
          name="password"
          className="text-black"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-500 rounded cursor-pointer" onClick={signUp}>Sign Up</button> {/* Fixed function name */}
        <button className="bg-white text-black p-2 rounded-lg mt-10" onClick={loginWithGoogle}>Sign In with Google</button>
      </div>
      {message && (
        <div className="my-4 px-2 py-1 bg-red-100 text-red-600">
          {message}
        </div>
      )}
    </div>
  );
}
