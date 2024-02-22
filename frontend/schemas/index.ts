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

export const PostSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export const EditProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  bio: z.string(),
  location: z.string(),
  birthday: z.date().optional(),
});
