import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6).max(30, { message: 'Password must be at least 6 characters long' }),
  send_emails: z.string().optional(),
});

export const SignUpSchema = z.object({
  name: z.string().min(3).max(30, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6).max(30, { message: 'Password must be at least 6 characters long' }),
});

export const ResetPasswordSchema = z.object({
 password : z.string().min(6).max(30, { message: 'Password must be at least 6 characters long' }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
