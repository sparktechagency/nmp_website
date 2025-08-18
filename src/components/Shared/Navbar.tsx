"use client";

import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button, ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useGetProfileQuery } from "@/redux/features/profileApi/profileApi";
import Image from "next/image";
import { Tooltip } from "antd";
interface Label {
  name: string;
  link: string;
}

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data: profileData } = useGetProfileQuery(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const labels: Label[] = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const handleMobileMenuClick = () => {
    setDrawerVisible(!drawerVisible);
  };

  const select = (_index: number) => {
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const handleLogout = () => {
    // Clear token or profile data
    localStorage.removeItem("token"); // or however you store auth
    // Optionally reset Redux state
    // dispatch(resetProfile());
    // Redirect to sign-in
    window.location.href = "/sign-in";
  };

  const renderUserSection = () => {
    if (profileData?.data) {
      return (
        <div className="flex items-center gap-2">
          <Tooltip title={profileData.data.fullName || "User"}>
            <Link href="/profile">
              <Image
                src={profileData.data.profile_img}
                alt="profile"
                height={40}
                width={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
          </Tooltip>
          <button className="px-2 py-1 text-sm " onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <Link href="/sign-in">
          <FaRegUser className="text-2xl" />
        </Link>
      );
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSize: 20,
            paddingBlock: 10,
            borderRadius: 2,
          },
        },
      }}
    >
      <div className="w-full bg-[#0c0111] text-white">
        <div className="container mx-auto flex items-center justify-center py-4 px-6 lg:px-8">
          <div className="flex items-center w-full h-full">
            <Link href="/">
              <h1>Logo</h1>
              {/* <Image src={AllImages.logo} alt="logo" className="lg:h-11 h-16 w-auto rounded-full" /> */}
            </Link>

            {/* Mobile Hamburger */}
            <div className="lg:hidden ml-auto">
              <Button
                icon={<RxHamburgerMenu className="text-white" />}
                onClick={handleMobileMenuClick}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center ml-auto space-x-4 mb-0">
              {labels.map((item, index) => (
                <Link href={item.link} key={index}>
                  <button className="px-4 font-medium text-lg">
                    {item.name}
                  </button>
                </Link>
              ))}

              <div className="flex justify-between items-center gap-3">
                <Link href="/cart">
                  <IoCartOutline className="text-2xl" />
                </Link>
                {renderUserSection()}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title=""
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <div className="flex flex-col items-center space-y-4">
            {labels.map((item, index) => (
              <Link href={item.link} key={index}>
                <button
                  className="px-4 font-medium text-lg cursor-pointer w-full text-left"
                  onClick={() => select(index)}
                >
                  {item.name}
                </button>
              </Link>
            ))}
            <div className="flex justify-between items-center gap-3 mt-4">
              <Link href="/cart">
                <IoCartOutline className="text-2xl" />
              </Link>
              {renderUserSection()}
            </div>
          </div>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default NavBar;
