'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { registerUserFn } from '@/api/authQueryFns';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Bu alanın doldurulması zorunludur.' }),
    username: z.string().min(1, { message: 'Bu alanın doldurulması zorunludur.' }).email('Bu geçerli bir e-posta değil.'),
    password: z.string().min(4, { message: 'Minimum 4 karakter içermelidir' }),
    confirmPassword: z.string().min(4, { message: 'Minimum 4 karakter içermelidir' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Şifrelet eşleşmiyor.',
      });
    }
  });

const AuthRegister = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: registerUserFn,
    onSuccess: (data) => {
      router.push('/');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const reqBody = {
      name: values.name,
      username: values.username,
      password: values.password,
      role: 'user',
    };
    registerUser(reqBody);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Üye Ol</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Kullanıcı adı giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Parola giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola Tekrar</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Parola giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Üye Ol
            </Button>
          </form>
        </FormProvider>
        <p className="mt-2 text-xs text-center text-gray-700">
          Zaten hesabınız var mı?
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">Giriş Yap</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default AuthRegister;
