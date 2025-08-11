"use client";

import { Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
import image from "../../../assets/image/cuate.png";
import { IoMdKey } from "react-icons/io";
interface FormValues {
  otp?: string;
}

const VerifyOtp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string>("");

  const onFinish = async (values: FormValues) => {
    const data = {
      email,
      resetCode: Number(otp),
    };
    try {
      // await verifyPassword(data).unwrap();
      message.success("Password changed successfully!");
      router.push(`/new-password?email=${email}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendotp = async () => {
    // await resendOtp(email).unwrap();
    message.success("Otp sent successfully!");
  };

  return (
    <div className=" h-[100vh]   container mx-auto flex items-center justify-center gap-20">
      <div className="w-full md:w-[50%]">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[#ffc071]  text-4xl font-bold mb-6">
            Forgot Password
          </h2>
          <div className="bg-[#ffc071] px-4 py-2 rounded-md cursor-pointer">
            <IoMdKey className="text-white h-8 w-10" />
          </div>
        </div>
        <div className=" border-4 p-5 rounded-md border-orange-100 flex justify-center items-center">
          <Form
            name="varify-password"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
            className=""
          >
            <div className="mb-4 text-center">
              <h2 className="text-center text-xl  mb-6">
                Check your email for the otp
              </h2>
            </div>

            <Form.Item name="otp" label="">
              <div className="flex justify-center items-center my-10">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="lg:w-5"> </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-8 h-8 bg-transparent border border-[#ffc071] rounded-md text-xl mx-1"
                    />
                  )}
                />
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <Link href="/new-password">
                <div className="text-white">
                  <button
                    type="submit"
                    className="text-center w-full font-bold text-2xl bg-[#ffc071]  px-10 py-2 rounded-md shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </Link>
            </Form.Item>

            <p className="my-5 text-center text-neutral-500">
              You have not received the email?{" "}
              <span
                onClick={handleResendotp}
                className="text-primary cursor-pointer"
              >
                Resend
              </span>
            </p>
          </Form>
        </div>
      </div>

      <div className="w-full md:w-[50%]">
        <Image src={image} alt="image" height={500} width={500}></Image>
      </div>
    </div>
  );
};

export default VerifyOtp;
