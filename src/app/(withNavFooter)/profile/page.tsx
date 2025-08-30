/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { Button, Input, Spin, message } from "antd";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/redux/features/profileApi/profileApi";
import toast from "react-hot-toast";
import Link from "next/link";

const ProfilePage: React.FC = () => {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const profile = profileData?.data;

  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setData({
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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!data.phone) {
      return message.error("Phone is required");
    }

    setLoadingUpdate(true);
    try {
      const updatedData = {
        fullName: data.fullName,
        phone: data.phone,
      };
      await updateProfile(updatedData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileImageUpdate = async () => {
    if (!selectedImage) {
      return toast.error("Please select an image first");
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoadingImage(true);
    try {
      await updateProfileImage(formData).unwrap();
      toast.success("Profile image updated successfully!");
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile image");
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center py-12 px-4 md:h-[70vh]">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex  items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src={previewImage || profile.profile_img}
                alt="Profile Avatar"
                fill
                className="rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.fullName}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
            {/* <FaEdit className="text-gray-400 ml-2 cursor-pointer hover:text-gray-600" /> */}
          </div>
          <div className="flex gap-2">
            <Link href="/orders">
              <Button
                type="default"
                className="border border-blue-400 text-blue-600 hover:bg-blue-50"
              >
                Order History
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={handleSave}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Spin size="small" /> : "Save changes"}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Choose Image
          </label>
          <Button
            type="primary"
            onClick={handleProfileImageUpdate}
            disabled={loadingImage || !selectedImage}
          >
            {loadingImage ? <Spin size="small" /> : "Upload"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Full Name</label>
            <Input
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Phone</label>
            <Input
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Email</label>
            <Input
              name="email"
              value={data.email}
              disabled
              className="rounded-md bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Password</label>
            <Input.Password
              name="password"
              value={data.password}
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
