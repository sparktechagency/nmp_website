"use client";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userCurrentToken } from "@/redux/features/auth/authSlice";
import { Skeleton } from "antd"; // Import Ant Design's Skeleton
import "antd/dist/reset.css"; // Make sure to import Ant Design styles

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true); 
  const token = useSelector(userCurrentToken);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!token && pathname !== "/sign-in" && pathname !== "/register") {
      router.replace("/sign-in");
    } else {
      setLoading(false);
    }
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
