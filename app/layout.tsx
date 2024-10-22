import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

// export const metadata: Metadata = {
//   title: "trading app",
//   description: "trading app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar/>
        <main className="">
        {children}
      </main>
     </>
     
  );
}
