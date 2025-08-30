"use client";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { userCurrentToken } from "@/redux/features/auth/authSlice";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const token = useSelector(userCurrentToken);
//   console.log("token", token)
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!token && pathname !== "/sign-in" && pathname !== "/register") {
      router.replace("/sign-in");
    }
  }, [token, pathname, router]);

  return <>{children}</>;
}
