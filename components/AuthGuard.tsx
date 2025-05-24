"use client";

import { usePathname } from "next/navigation";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import Loading from "@/app/loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname();
  // const isAuthPage = pathname.includes("login");

  // const { loading, authenticated } = useAuthBootstrap();

  // console.log(loading, authenticated, isAuthPage);

  // if (loading) return <Loading />;

  // if (!authenticated && !isAuthPage) {
  //   // You can also redirect if needed
  //   return null;
  // }

  return <>{children}</>;
}
