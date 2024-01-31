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
    <div className="w-screen h-screen flex items-center justify-center">
      <PasswordResetForm token={token} email={email}/>
    </div>
  );
};

export default ResetPasswordPage;
