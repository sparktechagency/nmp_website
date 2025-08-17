"use client";

import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Button, ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useGetProfileQuery } from "@/redux/features/profileApi/profileApi";

interface Label {
  name: string;
  link: string;
}

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data: profileData } = useGetProfileQuery();
  console.log("profileData", profileData);
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
              {/* <Image
                src={AllImages.logo}
                alt="logo"
                className="lg:h-11 h-16 w-auto rounded-full"
              /> */}
            </Link>

            <div className="lg:hidden ml-auto">
              <Button
                icon={<RxHamburgerMenu className="text-white" />}
                onClick={handleMobileMenuClick}
              />
            </div>

            <div className="hidden lg:flex items-center ml-auto space-x-4 mb-0">
              {labels.map((item, index) => (
                <Link href={item.link} key={index}>
                  <button className="px-4 font-medium text-lg">
                    {item.name}
                  </button>
                </Link>
              ))}

              <div className="flex justify-between items-center gap-3">
                {/* <RiSearchLine /> */}
                <Link href="/cart">
                  <IoCartOutline />
                </Link>
                <Link href="/sign-in">
                  <FaRegUser />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          title=""
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-2 w-full">
              {labels.map((item, index) => (
                <Link href={item.link} key={index}>
                  <button
                    className="px-4 font-medium text-lg cursor-pointer "
                    onClick={() => select(index)}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
              <div className="flex justify-between items-center gap-3">
                {/* <RiSearchLine /> */}
                <Link href="/cart">
                  <IoCartOutline />
                </Link>
                <Link href="/sign-in">
                  <FaRegUser />
                </Link>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default NavBar;
