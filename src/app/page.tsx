import Image from "next/image";
import logo from "@/assets/logo444.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default function Home() {
  const {userId} = auth()

 // if(userId) redirect("/notes")


  return(
    <main  className="flex flex-col h-screen items-center justify-center gap-5 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 animate-gradient-x text-coolGray-100">
        <img src="https://lh3.googleusercontent.com/proxy/lr18S7Fr_ZNKS0PxP4AoApO_nRj5L9th_APnBuGQZw5ZyK0_3xqwFdINGj1_XcbTyLVpCf9x1-9t5f1Vo7nSh3FEtkg69fPza4_TXu0XvXTFeg9Jw_N9pjKkCDzIHw" alt="Description of the image" />
      <div className="flex items-center gap-4">
        <Image src={logo} alt="logo" width={100} height={1000} />
        <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">
          AI Tutor
        </span>
    

      </div>
      <p className="max-w-prose text-center">
        Our AI platform transforms education by analyzing uploaded study materials, creating visuals, answering questions, and generating quizzes.
      </p>
       <Button size="lg" asChild>
        <Link href="/notes">
        Note AI
        </Link>
       </Button>

       {/* <Button size="lg" asChild>
        <Link href="/pdf">
        PDF Chat
        </Link>
       </Button> */}

       <Button size="lg" asChild>
        <Link href="/aiQuiz">
        AI Quiz
        </Link>
       </Button>

    </main>
  )
}
