import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is not valid" }),
    username: z.string().min(1, { message: "Username is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
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

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    ConfirmPassword: z.string().min(1, { message: "Passwords didn't match" }),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: "Passwords didn't match",
    path: ["ConfirmPassword"],
  });
