
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from "./lib/types/auth"
import bcrypt from 'bcrypt';
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: 
  [Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        const { email, password } = await signInSchema.parseAsync(credentials)
      
        const hashedPassword = await bcrypt.hash(password, 10);

      
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with the their profile data
        return user
      },
    }),
  ],
})