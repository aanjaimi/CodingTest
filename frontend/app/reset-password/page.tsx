import PasswordResetForm from "@/components/auth/password-reset-form";
import React from "react";

const ResetPasswordPage = ({ token }: { token?: string }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PasswordResetForm token={token}/>
    </div>
  );
};

export default ResetPasswordPage;
