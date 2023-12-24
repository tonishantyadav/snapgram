import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(255, 'Name is to long'),
  username: z
    .string()
    .min(2, 'Username is too short')
    .max(255, 'Username is to long'),
  email: z.string().email('Invalid email').min(2, 'Email is required'),
  password: z.string().min(8, 'Password must be 8 characters'),
});

export const SigninFormSchema = z.object({
  email: z.string().email('Invalid email').min(2, 'Email is required'),
  password: z.string().min(8, ''),
});

export const PostFormSchema = z.object({
  caption: z
    .string()
    .min(2, 'Caption is too short')
    .max(255, 'Caption is too long'),
  location: z
    .string()
    .min(2, 'Location is too short')
    .max(255, 'Location is too long'),
  tags: z.string().max(255, 'Tags are too long'),
});
