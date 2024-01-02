import { useForm as useBaseUseForm, UseFormReturn } from 'react-hook-form';
import { z, ZodObject } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type DefaultValues<T> = {
  [K in keyof T]?: T[K] extends z.ZodTypeAny ? z.infer<T[K]> : unknown;
} & { file?: File[] };

function useForm<T extends ZodObject<any, any>>(
  schema: T
): UseFormReturn<z.infer<T>>;

function useForm<T extends ZodObject<any, any>>(
  schema: T,
  defaultValue: DefaultValues<z.infer<T>>
): UseFormReturn<z.infer<T>>;

function useForm<T extends ZodObject<any, any>>(
  schema: T,
  defaultValue?: DefaultValues<z.infer<T>>
): UseFormReturn<z.infer<T>> {
  const resolver = zodResolver(schema);

  if (defaultValue !== undefined) {
    return useBaseUseForm<z.infer<T>>({
      resolver,
      defaultValues: defaultValue as any,
    });
  } else {
    return useBaseUseForm<z.infer<T>>({ resolver });
  }
}

export default useForm;
