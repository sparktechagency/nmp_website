"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { Button, Input } from "antd";
import { useGetProfileQuery } from "@/redux/features/profileApi/profileApi";

const ProfilePage: React.FC = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const profile = profileData?.data;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (profile) {
      const [firstName, ...rest] = profile.fullName.split(" ");
      const lastName = rest.join(" ");
      setFormData({
        firstName,
        lastName,
        email: profile.email,
        password: "********",
      });
    }
  }, [profile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: call API to update profile
    console.log("Saved profile:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src={profile.profile_img}
                alt="Profile Avatar"
                fill
                className="rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.fullName}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
            <FaEdit className="text-gray-400 ml-2 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="flex gap-2">
            <Button type="default" className="border border-blue-400 text-blue-600 hover:bg-blue-50">
              Order History
            </Button>
            <Button type="primary" onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Password</label>
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
