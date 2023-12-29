'use client';
import React from 'react';
import { loginUserFn } from '@/api/authQueryFns';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cookie from 'js-cookie';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const formSchema = z.object({
  username: z.string().min(1, { message: 'Bu alanın doldurulması zorunludur.' }).email('Bu geçerli bir e-posta değil.'),
  password: z.string().min(1, { message: 'Bu alanın doldurulması zorunludur.' }),
});

const AuthLogin = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      if (!data.data.data) return;
      cookie.set('token', data.data.data, {
        expires: 1,
        sameSite: 'none',
        secure: true,
      });
      router.push('/dashboard');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values);
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Giriş Yap</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </FormProvider>
        <p className="mt-2 text-xs text-center text-gray-700">
          Hesabın yok mu?
          <Link href="/register">
            <span className="text-blue-600 hover:underline cursor-pointer">Üye Ol</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default AuthLogin;
