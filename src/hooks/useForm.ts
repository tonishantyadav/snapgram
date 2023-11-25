import { useForm as useBaseUseForm, UseFormReturn } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Generic useForm that takes a schema
const useForm = <T extends ZodObject<any, any>>(
  schema: T
): UseFormReturn<z.infer<T>> => {
  return useBaseUseForm<z.infer<T>>({ resolver: zodResolver(schema) });
};

export default useForm;
