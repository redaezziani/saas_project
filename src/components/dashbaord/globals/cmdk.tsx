import { Button } from "@/components/ui/button";
import {
    Action,
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarResults,
    KBarSearch,
    useMatches,
  } from "kbar";
import { CornerDownLeft, MoveDown, MoveLeft, MoveUp, Search, X } from "lucide-react";
  import React, { HTMLAttributes } from "react";
  
  interface CommandBarProps extends HTMLAttributes<HTMLElement> {
    actions: Action[];
  }
  
  const CommandBar: React.FC<CommandBarProps> = ({ actions, children }) => {
    return (
      <KBarProvider actions={actions}>
        <KBarPortal
        
        >
          <KBarPositioner
          
          className="bg-black/50 z-[99] backdrop-blur-sm">
            <KBarAnimator className="bg-white rounded-xl shadow-xl flex flex-col gap-4 w-[35rem] overflow-hidden">
              <div className="w-full">
              <KBarSearch className="w-full outline-none px-6 py-4 text-slate-800" />
              <Search className="absolute top-4 right-3 text-slate-500" size={18} />
              </div>
              <SearchResults />
            <KbarFooter />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        {children}
        
      </KBarProvider>
    );
  };
  
  const SearchResults = () => {
    const { results } = useMatches();
  
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            // Section header
            <div className="text-sm uppercase px-4 pt-3 pb-1 text-slate-500 font-semibold">
              {item}
            </div>
          ) : (
            // Single action
            <div
              className={`text-slate-800 text-sm flex px-4 py-3 ${
                active ? "bg-[#eeeeee]" : "bg-transparent"
              }`}
            >
              {item.name}
            </div>
          )
        }
      />
    );
  };

const KbarFooter = () => {
    return (
        <div className="flex justify-start border-t border-slate-400/35 gap-6 items-center px-4 py-3 bg-white text-black">
          <div className="flex gap-1 justify-start items-center">
            <div className="flex gap-1">
            <Button
                variant="outline"
                size="sm"
                className="size-5 p-1"
                
            >
                <MoveDown
                className="  size-3"
                size={16} />
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="size-5 p-1"
                
            >
                <MoveUp
                className="  size-3"
                size={16} />
            </Button>
            </div>
            <p
            className="text-sm text-slate-400"
            >
             to navigate
            </p>
          </div>

          <div className="flex gap-1 justify-start items-center">
            <div className="flex gap-1">
            <Button
                variant="outline"
                size="sm"
                className="size-5 p-1"
                
            >
                <CornerDownLeft
                className="  size-3"
                size={16} />
            </Button>
           
            </div>
            <p
            className="text-sm text-slate-400"
            >
             to select
            </p>
          </div>

          <div className="flex gap-1 justify-start items-center">
            <div className="flex gap-1">
            <Button
                variant="outline"
                size="sm"
                className="size-5 p-1"
                
            >
                <X
                className="  size-3"
                size={16} />
            </Button>
           
            </div>
            <p
            className="text-sm text-slate-400"
            >
             to cancel 
            </p>
          </div>
          
        </div>
    )
}
  
  export default CommandBar;