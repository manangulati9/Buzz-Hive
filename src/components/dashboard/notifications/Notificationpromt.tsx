import Image from "next/image";




export default function Component({ message }: { message: { logo: string, content : string ,newmessage: boolean } }) {
    const { logo, content , newmessage } = message;
    return (
        <div className="flex flex-col h-fit w-[80%] border rounded-lg hover:cursor-pointer hover:bg-muted-foreground transition-colors duration-300   dark:border-gray-800 md:backdrop-blur-3xl bg-[#1F2937] bg-opacity-50">
                    <div className="flex p-4  text-sm dark:bg-gray-950 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className='relative w-10 h-10 rounded-full shrink-0'>
                                <Image src={logo} alt={''} fill />
                            </div>
                            <div className="grid gap-1 text-xs">
                                <div className="font-semibold text-xs md:text-lg">{content}</div>
                            </div>
                        </div>
                        {(newmessage) && (
                            <div className="text-primary">
                                <p className="text-xs md:text-base">New</p>
                            </div>)}
                    </div>
        </div>
    )
}


