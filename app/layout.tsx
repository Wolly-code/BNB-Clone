"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import Modal from "./components/model/Modal";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/model/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar></Navbar>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
