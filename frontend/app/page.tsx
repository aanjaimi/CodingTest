import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils"
import BackButton from "@/components/auth/back-button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <div className="bg w-screen h-screen flex flex-col items-center justify-center">
      <h1 className={cn("text-[30px] sm:text-[40px] text-white font-bold", font.className)}>Welcome to my Q&A app</h1>
      <div className="flex flex-col sm:flex-row items-center justify-around w-[300px] h-[100px]">
        <BackButton label={ "Login" } href={ "/login" } variant="default"/>
        <BackButton label={ "Register" } href={ "/register" } variant="default"/>
      </div>
    </div>
  );
}
