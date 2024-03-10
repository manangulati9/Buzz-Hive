import Image from "next/image";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { Replyarea } from "./Replyarea";
import { ScrollArea } from "@/components/ui/scroll-area";




export default function Component({ message }: { message: { username: string, userlogo: string, text: string, verified: boolean, newmessage: boolean } }) {
    const { username, userlogo, text, verified, newmessage } = message;
    return (
        <div className="flex flex-col h-fit w-[80%] border rounded-lg hover:cursor-pointer hover:bg-muted-foreground transition-colors duration-300   dark:border-gray-800 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50">
            <Drawer>
                <DrawerTrigger>
                    <div className="flex p-4  text-sm dark:bg-gray-950 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className='relative w-10 h-10 rounded-full shrink-0'>
                                <Image src={userlogo} alt={''} fill />
                            </div>
                            <div className="grid gap-1 text-xs">
                                <div className="font-semibold text-lg">{username}</div>
                            </div>
                        </div>
                        {(newmessage) && (
                            <div className="text-primary">
                                <p>New message</p>
                            </div>)}
                    </div>
                </DrawerTrigger>
                <DrawerContent className="bg-current container h-[90%]">
                    <DrawerHeader>
                        <DrawerTitle className="text-primary">                        
                        <div className="flex items-center gap-4">
                            <div className='relative w-16 h-16 rounded-full shrink-0'>
                                <Image src={userlogo} alt={''} fill />
                            </div>
                            <div className="grid gap-1 text-xs">
                                <div className="font-semibold text-4xl md:text-7xl">{username}</div>
                            </div>
                        </div>
                        </DrawerTitle>
                        
                        <DrawerDescription className="text-foreground max-h-[350px] text-lg text-start md:text-3xl">
                        <ScrollArea className="h-full w-full px-3">{text}</ScrollArea></DrawerDescription>
                        
                    </DrawerHeader>
                    <DrawerFooter>
                        <Replyarea/>
                        <Button>Send</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}


