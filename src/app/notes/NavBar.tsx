"use client";

import Image from "next/image";
import Link from "next/link"
import logo from "@/assets/logo2.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNoteDialog from "@/components/AddNoteDialog";
import { ThemeProvider, useTheme } from "next-themes";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import { dark } from "@clerk/themes"
import AIChatButton from "@/components/AIChatButton";

export default function NavBar() {
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
    const {theme} = useTheme();


    return (
        <>
        <div className="p-4 shadow">
            <div className="max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between">
                <Link href="/notes" className="flex items-center gap-1">
                    <Image src={logo} alt="logo" width={40} height={40} />
                    <span className="font-bold"> FlowBrain</span>
                     </Link>
                <div className="flex items-center gap-2">
                    <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                       baseTheme: (theme === "dark" ? dark : undefined),
                       elements: {avatarBox:{width: "2.5rem", height: "2.5rem"}},
                    
                    }}
                    />
                    <ThemeToggleButton />
                 <Button onClick={()=>setShowAddNoteDialog(true)}>
                    <Plus size={20} className="mr-2" />
                    Add Note
                 </Button>
                 <AIChatButton />
                </div>

            </div>
        </div>

         <AddNoteDialog open={showAddNoteDialog} setOpen={setShowAddNoteDialog} />

        </>
    );
}