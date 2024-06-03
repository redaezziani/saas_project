'use client';
import SubmitButton from './submit';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInSchema } from '@/lib/types/auth';
import { SignIn } from '@/(auth)/user-actions';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';
import AlertMessage from './alert-message';
import { ResErrType } from '@/lib/types/help';

const SignInForm = () => {
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [resErr, setResErr] = useState<ResErrType>({ status: '', message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({ email: '', password: '' });

    try {
      const form = Object.fromEntries(formData.entries());
      const result = await SignInSchema.parseAsync(form);
      const res = await SignIn(result) as any;
      if (res.status === 'success') {
        router.refresh();
        return;
      } else if (res.status === 'error') {
        setResErr({ status: res.status, message: res.message });
      }
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: z.ZodIssue) => {
          setErrors((prev) => ({ ...prev, [err.path[0]]: err.message }));
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
    <div className="flex relative  w-full max-w-lg justify-center items-center flex-col">

      <form
        onSubmit={(event) => handleSubmit(event, new FormData(event.currentTarget))}
        className="w-full lg:max-w-[33rem] flex justify-start items-start flex-col gap-5"
      >
        <div className="flex w-full justify-start items-start flex-col">

          {resErr?.status === 'error' && (
            <AlertMessage
              title="Error"
              className=" border border-red-500/35 bg-red-400/10 text-red-500"
              icon={<ShieldAlert className="text-red-500" size={20} />}
              description={resErr.message ?? ''}
            />
          )}
        </div>
        <div className="flex mt-4 w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold text-slate-600" htmlFor="email">
            Email Address
          </Label>
          <Input
            className="w-full"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            name="email"
          />
          <p className="text-destructive text-sm font-normal">{errors.email}</p>
        </div>
        <div className="flex w-full justify-start items-start flex-col gap-3">
          <Label className="font-semibold text-slate-600" htmlFor="password">
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
          <p className="text-destructive text-sm font-normal">{errors.password}</p>
          <Link
            href="/auth/forgot-password"
            className="transition-all ease-in-out duration-300 text-slate-400 hover:text-slate-600 text-sm font-normal"
          >
            Forgot Password?
          </Link>
        </div>
        
        <SubmitButton ispending={isLoading}>Sign in</SubmitButton>
        <div className="w-full text-sm flex justify-center items-center">
          <p className="text-slate-300 flex gap-1">
            Don't have an account ?
            <Link href="/auth/signup" className="ml-1 text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
