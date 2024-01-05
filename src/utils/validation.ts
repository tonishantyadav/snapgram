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
  caption: z.string().max(2200, 'Caption is too long'),
  location: z.string().max(2200, 'Location is too long'),
  tags: z.string().max(2200, 'Tags are too long'),
});

export const ProfileUpdateSchema = z.object({
  username: z
    .string()
    .min(0, 'Username is too short')
    .max(2200, 'Username is too long'),
  bio: z.string().max(2200, 'Bio is too long'),
});
