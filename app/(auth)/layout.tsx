import type React from "react";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
