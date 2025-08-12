"use client";

import { Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
import image from "../../../assets/image/cuate.png";
import { IoMdKey } from "react-icons/io";

interface FormValues {
  otp?: string;
}

const VerifyOtp: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");

  const onFinish = async (values: FormValues) => {
    const data = {
      // For example: email, otp or other necessary data
    };
    try {
      // Simulate an OTP verification API call
      message.success("Password changed successfully!");
      router.push(`/new-password`);
    } catch (error) {
      console.error(error);
      message.error("Failed to verify OTP, please try again.");
    }
  };

  const handleResendOtp = async () => {
    // Simulate resending OTP
    message.success("OTP sent successfully!");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row p-6 md:p-12">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900">Forgot Password</h2>
            {/* <div className="bg-[#ffc071] px-4 py-2 rounded-md">
              <IoMdKey className="text-white h-8 w-8" />
            </div> */}
          </div>

          <p className="text-center text-lg text-gray-600 mb-6">
            Check your email for the OTP
          </p>

          <Form
            name="verify-otp"
            initialValues={{ remember: true }}
            style={{ maxWidth: 450 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="otp"  className="mb-6">
              <div className="flex justify-center items-center my-6">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="lg:w-5"> </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-12 h-12 bg-transparent border border-[#ffc071] rounded-md text-xl mx-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                />
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
              >
                Submit
              </button>
            </Form.Item>

            <p className="my-5 text-center text-neutral-500">
              Didn’t receive the email?{" "}
              <span
                onClick={handleResendOtp}
                className="text-indigo-500 cursor-pointer"
              >
                Resend
              </span>
            </p>
          </Form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 p-6">
          <Image src={image} alt="Forgot Password Illustration" className="rounded-xl shadow-lg" height={500} width={500} />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
