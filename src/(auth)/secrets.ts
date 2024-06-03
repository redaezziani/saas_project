import { env } from 'process'
import { PrismaClient } from '@prisma/client'
import { Knock } from "@knocklabs/node";
export const secret = {
    resend_api_key: env.RESEND_API_KEY,
    jwt_secret: env.JWT_SECRET,
    jwt_expiry: env.JWT_EXPIRY,
    stripe_publishable_key: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY??'',
    stripe_secret_key: env.STRIPE_SECRET_KEY,
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}


declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}
export const knock = new Knock(env.KNOCK_SECRET_API_KEY)
const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db


if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db