import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ['400', '600']
   });


export const metadata: Metadata = {
  title: "X",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <body className={`w-full flex justify-center bg-black text-white ${poppins.className}`}>
            <Providers>
              {children}
            </Providers>
          </body>
    </html>
  );
}
