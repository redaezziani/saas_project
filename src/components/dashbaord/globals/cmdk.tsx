import { Button } from "@/components/ui/button"
import {
    Action,
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarResults,
    KBarSearch,
    useMatches,
} from "kbar"
import {
    CornerDownLeft,
    MoveDown,
    MoveLeft,
    MoveUp,
    Search,
    X,
} from "lucide-react"
import React, { HTMLAttributes } from "react"

interface CommandBarProps extends HTMLAttributes<HTMLElement> {
    actions: Action[]
}

const CommandBar: React.FC<CommandBarProps> = ({ actions, children }) => {
    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner className="z-[99] bg-black/50 backdrop-blur-sm">
                    <KBarAnimator className="flex w-[35rem] flex-col gap-4 overflow-hidden rounded-xl bg-white shadow-xl">
                        <div className="w-full">
                            <KBarSearch className="w-full border-none px-6 py-4 text-slate-800 outline-none ring-transparent focus:border-none focus:outline-none focus:ring-transparent" />
                            <Search
                                className="absolute right-3 top-4 text-slate-500"
                                size={18}
                            />
                        </div>
                        <SearchResults />
                        <KbarFooter />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    )
}

const SearchResults = () => {
    const { results } = useMatches()

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === "string" ? (
                    // Section header
                    <div className="px-4 pb-1 pt-3 text-sm font-semibold uppercase text-slate-500">
                        {item}
                    </div>
                ) : (
                    // Single action
                    <div
                        className={`flex px-4 py-3 text-sm text-slate-800 ${
                            active ? "bg-[#eeeeee]" : "bg-transparent"
                        }`}
                    >
                        {item.name}
                    </div>
                )
            }
        />
    )
}

const KbarFooter = () => {
    return (
        <div className="flex items-center justify-start gap-6 border-t border-slate-400/35 bg-white px-4 py-3 text-black">
            <div className="flex items-center justify-start gap-1">
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="size-5 p-1">
                        <MoveDown className="size-3" size={16} />
                    </Button>
                    <Button variant="outline" size="sm" className="size-5 p-1">
                        <MoveUp className="size-3" size={16} />
                    </Button>
                </div>
                <p className="text-sm text-slate-400">to navigate</p>
            </div>

            <div className="flex items-center justify-start gap-1">
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="size-5 p-1">
                        <CornerDownLeft className="size-3" size={16} />
                    </Button>
                </div>
                <p className="text-sm text-slate-400">to select</p>
            </div>

            <div className="flex items-center justify-start gap-1">
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="size-5 p-1">
                        <X className="size-3" size={16} />
                    </Button>
                </div>
                <p className="text-sm text-slate-400">to cancel</p>
            </div>
        </div>
    )
}

export default CommandBar
