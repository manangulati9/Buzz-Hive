import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email id"),
  password: z.string().min(8, "Password is too short").max(25, "Password length exceeded")
})

export const usernameSchema = z.string()
  .min(1, "Username must be at least 1 character long") // Error message for minimum length validation
  .max(25, "Username cannot exceed 25 characters") // Error message for maximum length validation
  .refine((value) => /^[a-z0-9_.]+$/.test(value), {
    message: 'Username must contain only lowercase letters, numbers, underscores, or periods' // Error message for regex validation
  })

export const signUpSchema = loginSchema.extend({
  name: z.string().min(1, "Name is too short"),
  username: usernameSchema,
  confirmPassword: z.string().min(8, "Password is too short").max(25, "Password length exceeded"),
}).refine((val) => val.password === val.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] })

