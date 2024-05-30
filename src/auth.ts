
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from "./lib/types/auth"
import bcrypt from 'bcrypt';
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: 
  [Google,GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        const { email, password } = await signInSchema.parseAsync(credentials)

        if (!email || !password) {
          return { status: 400, message: "Email and password are required" }
        }




      
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        })
        if (!existingUser) {
          return  null
        }

        const passwordsMatch = await bcrypt.compare(password, existingUser.password)
        if (!passwordsMatch) {
          return null
        }
        user = {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        }
        // return user object with the their profile data
        return user
      },
    }),
  ],
})