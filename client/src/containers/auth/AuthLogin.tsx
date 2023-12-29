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
import { END_POINTS } from '@/constants/end-points';
import { useRouter } from 'next/navigation';

export const formSchema = z.object({
  username: z.string().min(1, { message: 'Bu alanın doldurulması zorunludur.' }).email('This is not a valid email.'),
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
      if(!data.data.data) return;
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
      <CardHeader>
        <CardTitle>Giriş Yap</CardTitle>
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
            <Button type="submit">Giriş Yap</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AuthLogin;
