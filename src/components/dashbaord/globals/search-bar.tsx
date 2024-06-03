'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CommandBar from './cmdk';

interface CommandBarProps {
   //  for the children
   children: React.ReactNode;
}


const SearchBar = ({ children }: CommandBarProps) => {
    const [activeTheme, setActiveTheme] = useState("light");
    const router = useRouter();
  
    const actions = [
      {
        id: "dashboard",
        name: "Dashboard",
        section: "navigation",
        shortcut: ["d"],
        keywords: "home, dashboard",
        perform: () => router.push("/dashboard"),
      },
      {
        id: "employees",
        name: "Employees",
        section: "navigation",
        shortcut: ["e"],
        keywords: "employees, staff",
        perform: () => router.push("/dashboard/employees"),
      }
    ];
  
  return (
    <CommandBar actions={actions}>
        {children}
    </CommandBar>
  )
}

export default SearchBar