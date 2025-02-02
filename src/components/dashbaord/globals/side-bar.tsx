"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Clock from "@/components/home/date-counter"
import { CalendarClock } from "lucide-react"
import {
    UsersRound,
    Notebook,
    Settings,
    Factory,
    CalendarDays,
    DollarSign,
    Briefcase,
    FileText,
    CreditCard,
    LifeBuoy,
    Scale,
} from "lucide-react"

const variants = {
    hidden: { x: -200, opacity: 0 },
    enter: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -200, opacity: 0, transition: { duration: 0.2 } },
}

const navLinksSupport = [
    {
        label: "Invoices",
        path: "/dashboard/invoices",
        icon: <FileText size={18} />,
    },
    {
        label: "Subscriptions",
        path: "/dashboard/subscriptions",
        icon: <CreditCard size={18} />,
    },
    {
        label: "Payments",
        path: "/dashboard/payments",
        icon: <DollarSign size={18} />,
    }, // Using consistent icon
    {
        label: "Support",
        path: "/dashboard/support",
        icon: <LifeBuoy size={18} />,
    },
    {
        label: "Settings",
        path: "/dashboard/settings",
        icon: <Settings size={18} />,
    },
]

const navLinksDashboard = [
    {
        label: "Employees",
        path: "/dashboard/employees",
        icon: <UsersRound size={18} />,
    },
    {
        label: "Company",
        path: "/dashboard/company",
        icon: <Factory size={18} />,
    },
    {
        label: "Projects",
        path: "/dashboard/projects",
        icon: <Briefcase size={18} />,
    },
    {
        label: "Timesheets",
        path: "/dashboard/timesheets",
        icon: <CalendarDays size={18} />,
    },
    {
        label: "Expenses",
        path: "/dashboard/expenses",
        icon: <DollarSign size={18} />,
    },
    { label: "Notes", path: "/dashboard/notes", icon: <Notebook size={18} /> },
]

function Sidebar() {
    const currentPath = usePathname()

    return (
        <AnimatePresence initial={false}>
            <motion.div
                className="sticky z-20 col-span-2 hidden h-screen w-full flex-col items-start justify-start gap-3 border-r border-border bg-white md:flex"
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
            >
                <div className="flex h-14 w-full items-center justify-center gap-x-2 border-b border-dashed border-border p-1">
                    <CalendarClock size={18} />
                    <Clock />
                </div>
                <SidebarSectionHeader title={"Dashboard"} />
                <div className="px-6">
                    <motion.div className="flex flex-col gap-5 border-l border-slate-400/35 py-2 pl-6">
                        {navLinksDashboard.map((link, index) => (
                            <SidebarLink key={index} link={link} />
                        ))}
                    </motion.div>
                </div>
                <SidebarSectionHeader title={"Support & Help"} />
                <div className="px-6">
                    <motion.div className="flex flex-col gap-5 border-l border-slate-400/35 py-2 pl-6">
                        {navLinksSupport.map((link, index) => (
                            <SidebarLink key={index} link={link} />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

interface SidebarLinkProps {
    link: {
        label: string
        path: string
        icon: React.ReactNode
    }
}

function SidebarLink({ link }: SidebarLinkProps) {
    const currentPath = usePathname()
    return (
        <Link
            href={link.path}
            className={`${currentPath === link.path ? "text-custom-blue-500" : "text-slate-500"}`}
        >
            <motion.div className="flex w-full transform cursor-pointer items-center justify-start gap-2 p-2 px-3 text-sm duration-500 ease-in-out hover:scale-105">
                {link.icon} {link.label}
            </motion.div>
        </Link>
    )
}

interface SidebarSectionHeaderProps {
    title: string
}

function SidebarSectionHeader({ title }: SidebarSectionHeaderProps) {
    return (
        <div className="mt-10 flex w-full items-center justify-start gap-2 px-3 font-semibold text-slate-500">
            {title}
        </div>
    )
}

export default Sidebar
