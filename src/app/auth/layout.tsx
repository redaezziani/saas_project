import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "nexsus",
    description: "Saas Image to Text Converter",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main
            className={
                "relative flex h-screen w-full flex-col items-center justify-start gap-3 overflow-hidden bg-white"
            }
        >
            {children}
        </main>
    )
}
