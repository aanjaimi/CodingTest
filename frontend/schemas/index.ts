import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is not valid" }),
    password: z.string().min(1, { message: "Password is required" }),
    ConfirmPassword: z.string().min(1, { message: "Passwords didn't match" }),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Passwords didn't match",
    path: ["ConfirmPassword"],
  });

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
  ConfirmPassword: z.string().min(1, { message: "Passwords didn't match" }),
})
.refine((data) => data.password === data.ConfirmPassword, {
  message: "Passwords didn't match",
  path: ["ConfirmPassword"],
});
