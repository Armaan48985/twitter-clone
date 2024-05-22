'use client'
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const logout = async () => {
      await supabase.auth.signOut()

      router.refresh()
  }

  return (
    <>Lesss goooo
    
      <button className="bg-black text-white" onClick={logout}>log out</button>
    </>
  );
}
