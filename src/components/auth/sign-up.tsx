'use client';
import SubmitButton from '@/components/auth/submit';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpSchema } from '@/lib/types/auth';
import { SignUp } from '@/(auth)/user-actions';
import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { CheckCircle, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import AlertMessage from '@/components/auth/alert-message';
import { ResErrType } from '@/lib/types/help';

const SignUpForm = () => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [resErr, setResErr] = useState<ResErrType>({
    status: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({
      email: '',
      password: '',
      name: '',
    });

    try {
      const form = Object.fromEntries(formData.entries());
      const result = await SignUpSchema.parseAsync(form);
      console.log(result);
      if (result.password !== formData.get('passwordConfirm') as string) {
        setErrors((prev) => ({
          ...prev,
          password: 'Passwords do not match',
        }));
        return;
      }

      const res = await SignUp(result) as any;
      setResErr({
        status: res.status,
        message: res.message,
      });
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: z.ZodIssue) => {
          setErrors((prev) => ({
            ...prev,
            [err.path[0]]: err.message,
          }));
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex relative w-full max-w-lg justify-center items-center flex-col">
      <form
        onSubmit={(event) => handleSubmit(event, new FormData(event.currentTarget))}
        className="w-full lg:max-w-[33rem] flex justify-start items-start flex-col gap-5"
      >
        <div className="flex justify-start items-start flex-col">
          {resErr?.status === 'error' && (
            <AlertMessage
              title="Error"
              className="bg-red-500/10 text-red-500"
              icon={<ShieldAlert className="text-red-500" size={20} />}
              description={resErr.message ?? ''}
            />
          )}
          {resErr?.status === 'success' && (
            <AlertMessage
              title="Success"
              className="bg-green-500/10 text-green-500"
              icon={<CheckCircle className="text-green-500" size={20} />}
              description={resErr.message ?? ''}
            />
          )}
        </div>
        <div className="flex mt-7 w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold" htmlFor="name">
            Name
          </Label>
          <Input className="w-full" type="text" placeholder="Enter your name" autoComplete="name" name="name" />
          <p className="text-red-600 text-sm font-normal">{errors.name}</p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            className="w-full"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            name="email"
          />
          <p className="text-red-600 text-sm font-normal">{errors.email}</p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold" htmlFor="password">
            Password
          </Label>
          <div className="flex relative w-full justify-start items-center">
            <Input
              className="w-full z-10"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              name="password"
            />
            <div
              onClick={togglePasswordVisibility}
              className="flex cursor-pointer z-30 right-3 absolute h-[90%] aspect-square bg-background justify-center items-center"
            >
              {showPassword ? (
                <EyeOff className="text-pretty" size={18} />
              ) : (
                <Eye className="text-slate-300" size={18} />
              )}
            </div>
          </div>
          <p className="text-red-600 text-sm font-normal">{errors.password}</p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold" htmlFor="passwordConfirm">
            Confirm Password
          </Label>
          <Input
            className="w-full"
            type="password"
            placeholder="Confirm your password"
            autoComplete="current-password"
            name="passwordConfirm"
          />
          <p className="text-red-600 text-sm font-normal">{errors.password}</p>
        </div>
        
        <SubmitButton ispending={isLoading} >Sign Up</SubmitButton>
        <div className="w-full flex justify-center items-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
