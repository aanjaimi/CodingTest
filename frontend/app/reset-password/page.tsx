import PasswordResetForm from "@/components/auth/password-reset-form";
import React from "react";

const ResetPasswordPage = ({
  email,
  token,
}: {
  email: string;
  token?: string;
}) => {
  return (
    <div className="bg w-screen h-screen flex items-center justify-center">
      <PasswordResetForm />
    </div>
  );
};

export default ResetPasswordPage;
