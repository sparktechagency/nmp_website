"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { Button, Input, Spin, message } from "antd";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profileApi/profileApi";
import toast from "react-hot-toast";

const ProfilePage: React.FC = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const profile = profileData?.data;

  const [updateProfile] = useUpdateProfileMutation();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        password: "********",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spin tip="Loading profile..." size="large" />
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.phone) {
      return message.error("Phone is required");
    }

    setLoadingUpdate(true);
    try {
      const data = {
        fullName: formData.fullName,
        phone: formData.phone,
      };
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className=" bg-gray-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
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
            <Button
              type="default"
              className="border border-blue-400 text-blue-600 hover:bg-blue-50"
            >
              Order History
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Spin size="small" /> : "Save changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Full Name</label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Email</label>
            <Input
              name="email"
              value={formData.email}
              disabled
              className="rounded-md bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Password</label>
            <Input.Password
              name="password"
              value={formData.password}
              disabled
              className="rounded-md bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
