import { CameraIcon, DotIcon, PhoneIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { MessageProps } from "@/types";

interface MessageTabProps{
  message : MessageProps ; 
}

export default function Component({message} : MessageTabProps) {
  const {username, userlogo, text, verified} = message;
    return (
      <div className="flex flex-col h-fit border rounded-lg w-[20rem] md:w-full max-w-sm  dark:border-gray-800 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50">
        <div className="flex-1 p-4 grid gap-4 text-sm dark:bg-gray-950">
          <div className="flex items-start gap-4">
          <div className='relative w-10 h-10 rounded-full shrink-0'>
                <Image src={userlogo} alt={''} fill/>
            </div>
            <div className="grid gap-1 text-xs">
              <div className="font-semibold text-lg">{username}</div>
              <div className="text-sm">
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  