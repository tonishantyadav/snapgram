import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(255, "Name is to long"),
  username: z.string().min(2, "Username is to short").max(255, "Username is to long"),
  email: z.string().email("Invalid email").min(2, "Email is required"),
  password: z.string().min(8, "Password must be 8 characters"),
});

type FormData = z.infer<typeof schema>;

const useSignupForm = () => useForm<FormData>({ resolver: zodResolver(schema) });

export default useSignupForm;
