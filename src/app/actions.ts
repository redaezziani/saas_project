'use server';

import { signIn } from "@/auth";


export const CredentialsForm = async (formData) => {
 
  const { email, password } = formData;
  console.log(email, password);
  const data =  signIn("credentials", { email, password, redirectTo: "/" });
  return;
}