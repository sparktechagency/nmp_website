/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import OtpInput from "react-otp-input";
import image from "../../../assets/image/cuate.png";
import {
  useResendOtpMutation,
  useVerifyOtpForgotMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

interface FormValues {
  otp: string;
}

const VerifyOtpForForgotPass: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log("Email:", email);

  const [verifyOtpForgot] = useVerifyOtpForgotMutation();
  const router = useRouter();
  const [form] = Form.useForm<FormValues>();
  const [otp, setOtp] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [resendOtp] = useResendOtpMutation();

  const onFinish = async () => {
    const clean = otp.replace(/\s/g, "");
    if (clean.length !== 6 || /\D/.test(clean)) {
      message.error("Enter the 6-digit code");
      return;
    }

    if (!email) {
      message.error("Email is missing. Please go back and try again.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await verifyOtpForgot({
        email,
        otp: clean,
      }).unwrap();

      toast.success(res?.message);
      router.push("/new-password");
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "object" && err && "data" in err) {
        const errorData = (err as any).data;
        toast.error(errorData?.message || "Failed to verify OTP. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing. Please go back and try again.");
      return;
    }

    try {
      const res = await resendOtp({ email }).unwrap();
      toast.success(res.message);
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "object" && err && "data" in err) {
        toast.error((err as any).data?.message || "Failed to resend OTP.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/70">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left – Form */}
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              {/* Badge */}
              <div className="mx-auto mb-5 h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <span className="text-white font-semibold">★</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
                Verify OTP
              </h2>
              <p className="mt-1 text-center text-sm text-gray-500">
                Enter the 6-digit code we sent to your email.
              </p>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <Form<FormValues>
                  form={form}
                  name="verify-otp"
                  layout="vertical"
                  requiredMark={false}
                  onFinish={onFinish}
                >
                  <Form.Item name="otp" className="mb-6">
                    <div className="flex justify-center items-center">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        shouldAutoFocus
                        inputType="tel"
                        renderSeparator={<span className="w-3 sm:w-4" />}
                        renderInput={(props) => (
                          <input
                            {...props}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="h-14 w-24 bg-transparent border border-indigo-300 rounded-md text-lg sm:text-xl text-center mx-1 sm:mx-1.5 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                          />
                        )}
                      />
                    </div>
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <div className="text-white">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 rounded-xl text-white font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-60 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700"
                      >
                        {submitting ? "Verifying..." : "Submit"}
                      </button>
                    </div>
                  </Form.Item>
                </Form>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Didn’t receive the email?{" "}
                  <button
                    onClick={handleResendOtp}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Resend
                  </button>
                </p>

                <p className="mt-2 text-center text-xs text-gray-500">
                  Wrong email?{" "}
                  <Link
                    href="/forgate-pass"
                    className="underline hover:text-gray-700"
                  >
                    Go back
                  </Link>
                </p>
              </div>
            </div>
          </div> 

          {/* Right – Illustration panel */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 p-8 sm:p-10 md:p-12 flex flex-col">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={image}
                  alt="Verify OTP illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-auto text-white/95">
                <div className="h-1 w-10 bg-white/70 rounded mb-4" />
                <h3 className="text-3xl font-semibold leading-tight">
                  Secure Verification
                </h3>
                <p className="mt-3 text-white/80 max-w-md text-sm">
                  Enter the one-time code to continue. Your code expires shortly;
                  you can request a new one if needed.
                </p>
              </div>
            </div>
            <div className="absolute inset-3 rounded-[22px] ring-1 ring-white/60 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpForForgotPass;
