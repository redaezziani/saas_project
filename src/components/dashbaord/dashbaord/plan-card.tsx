"use client"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import { useRouter } from "next/navigation"
import usePlanStore from "@/lib/plan-store"
import { Button } from "@/components/ui/button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

const PlanCard = () => {
    const router = useRouter()
    const { isPlanActive } = usePlanStore()
    console.log(isPlanActive)

    const handelCheckout = async (priceId: string) => {
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        const stripe = await loadStripe(STRIPE_PK)
        // خطوة 3: قم بعمل استدعاء API من نوع POST إلى المعالج /checkout-session
        const result = await fetch("/api/stripe-check", {
            method: "post",
            body: JSON.stringify({ priceId }),
            headers: {
                "content-type": "application/json",
            },
        })

        // خطوة 4: احصل على البيانات وقم بتوجيه المستخدم إلى الخروج باستخدام sessionId
        const data: { status: string; session?: { id: string } } =
            await result.json()

        if (data.status === "error") {
            router.push("/auth/signin")
            return
        }
        const sessionId = data.session?.id ?? ""
        stripe?.redirectToCheckout({ sessionId })
    }
    return (
        <Drawer open={isPlanActive == false ? true : false}>
            <DrawerTrigger></DrawerTrigger>
            <DrawerContent className="min-h-64 focus-within:outline-none focus:border-none focus:outline-none">
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
                    <div className="flex w-full max-w-4xl flex-col items-start justify-start gap-2">
                        <h1 className="text-2xl font-semibold text-slate-700">
                            Upgrade your plan
                        </h1>
                        <p className="text-sm text-slate-500">
                            You are currently on a free plan. Upgrade your plan
                            to unlock more features.
                        </p>
                        <hr className="mt-4 w-full border border-dashed border-slate-400/35" />

                        <div className="mt-10 grid gap-10 px-8 text-zinc-800 lg:grid-cols-2">
                            <div className="hidden max-w-sm flex-col items-center rounded-lg border border-slate-400/35 bg-slate-100 p-8 md:flex">
                                <div>
                                    <h2 className="mb-2 text-center text-3xl font-extrabold">
                                        Free Plan
                                    </h2>
                                    <p className="text-center opacity-60">
                                        For the individual and small teams
                                    </p>
                                    <div className="my-8 flex flex-col items-center">
                                        <p className="text-4xl font-extrabold">
                                            $0
                                        </p>
                                        <p className="text-sm opacity-60">
                                            /month
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>Trending Dashboard</b>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="ml-1 h-4 w-4 fill-orange-300"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>10 Keywords</b>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>100 Accounts Tracking</b>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>3 Users</b>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>{" "}
                                        Basic Support
                                    </p>
                                </div>
                            </div>
                            <div className="relative flex max-w-sm flex-col items-center rounded-lg border border-orange-200 border-slate-400/35 bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="absolute -left-3 -top-5 h-8 w-8 fill-red-400"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="mono absolute -top-4 rounded bg-red-400 px-2 py-0.5 text-sm font-bold tracking-wider text-zinc-100">
                                    POPULAR
                                </p>
                                <div>
                                    <div className="flex justify-center gap-2">
                                        <p className="mb-2 text-3xl font-extrabold">
                                            Pro
                                        </p>
                                    </div>
                                    <p className="text-center opacity-60">
                                        For agencies and businesses
                                    </p>
                                    <p className="text-center opacity-60"></p>
                                    <div className="flex justify-center gap-2">
                                        <div className="my-8 flex flex-col items-center">
                                            <p className="text-4xl font-extrabold">
                                                $29
                                            </p>
                                            <p className="text-sm opacity-60">
                                                /month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>Advanced timesheets</b>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="ml-1 h-4 w-4 fill-orange-300"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>Unlimited project tracking</b>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>Unlimited employees</b>
                                    </p>
                                    <p className="flex items-center text-sm">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <b>Customizable reports</b>
                                    </p>

                                    <div className="mt-8 flex justify-center">
                                        <Button
                                            onClick={() =>
                                                handelCheckout(
                                                    "price_1PP6cEHDE7eZdLsNHjFyNpj2",
                                                )
                                            }
                                            className="bg-orange-400 hover:bg-orange-500"
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default PlanCard
