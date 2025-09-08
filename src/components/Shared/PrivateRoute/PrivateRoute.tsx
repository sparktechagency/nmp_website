"use client";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userCurrentToken } from "@/redux/features/auth/authSlice";
import { Skeleton } from "antd";
import "antd/dist/reset.css";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const token = useSelector(userCurrentToken);
  const pathname = usePathname();
  const router = useRouter();

  // Define which routes are public & protected
  const publicRoutes = ["/", "/products", "/sign-in", "/register"];
  const protectedRoutes = ["/cart", "/orders"];

  useEffect(() => {
    // If route is protected but no token → redirect
    if (protectedRoutes.includes(pathname) && !token) {
      router.replace("/sign-in");
      return;
    }

    // If route is public → always allow
    setLoading(false);
  }, [token, pathname, router]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 px-4 py-6">
        <Skeleton active paragraph={{ rows: 4 }} title={{ width: "80%" }} />
        <Skeleton active paragraph={{ rows: 2 }} title={{ width: "60%" }} />
        <Skeleton active paragraph={{ rows: 3 }} title={{ width: "75%" }} />
      </div>
    );
  }

  return <>{children}</>;
}
