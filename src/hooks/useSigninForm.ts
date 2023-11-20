import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email").min(2, "Email is required"),
  password: z.string().min(8, "Password must be 8 characters"),
});

type FormData = z.infer<typeof schema>;

const useSigninForm = () => useForm<FormData>({ resolver: zodResolver(schema) });

export default useSigninForm;
  