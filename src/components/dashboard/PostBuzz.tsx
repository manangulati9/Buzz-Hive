"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EarthIcon, Smile } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"

function PostBuzz() {
  const [inputVal, setinputVal] = useState("");
  return (
    <div>
      <Dialog>
        <div className='mx-auto w-[18rem]  md:w-full max-w-xl h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 my-10 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center text-center justify-start space-x-2'>
              <div className='relative w-14 h-14 rounded-full'>
                <Image src={'/logo.svg'} alt={''} fill />
              </div>
              <p className='font-bold text-base'>
                What&apos; Buzzin?
              </p>
            </div>

            <div className='md:pl-16 pl-8'>
              <Select>
                <SelectTrigger className="w-fit bg-yellow-400 text-[#322904] rounded-xl text-xs md:text-base hover:bg-yellow-500 transition-colors duration-500">
                  <SelectValue placeholder="Select privacy" className='placeholder:font-bold' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EveryOne" >
                    <div className='flex space-x-3 text-[#322904]  items-center'>

                      <EarthIcon className='text-[#322904]' />
                      <p className='font-bold'>
                        Everyone can comment

                      </p>
                    </div>
                  </SelectItem>
                  <SelectItem value="OnlyFollowers">
                    <div className='flex space-x-3 text-[#322904]  items-center'>

                      <EarthIcon className='text-[#322904]' />
                      <p className='font-bold'>
                        Only followers

                      </p>
                    </div>
                  </SelectItem>
                  <SelectItem value="OnlyYouFollow">
                    <div className='flex space-x-3 text-[#322904]  items-center'>

                      <EarthIcon className='text-[#322904]' />
                      <p className='font-bold'>
                        Only people you follow

                      </p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div className='flex justify-between md:pl-16 pl-10 items-center border-t-2 p-2 border-yellow-400 '>
              <div className='flex justify-evenly space-x-2'>
                <Image src={'/mediaicon.svg'} alt={'media'} width={23} height={23} className='hover:scale-110 transition-all duration-200 cursor-pointer' />
                <Smile className='text-primary hover:scale-110 transition-all duration-200 cursor-pointer' height={23} width={23} />
              </div>
              <DialogTrigger asChild>
                <div className='border-2 flex items-center justify-center w-fit h-fit bg-yellow-400 hover:bg-yellow-500 transition-colors duration-500 rounded-full px-4 py-1 cursor-pointer text-[#322904]'>
                  <p className='font-semibold text-sm md:text-base'>Buzz</p>
                </div>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="max-w-[24rem] sm:max-w-[425px] bg-[#030712] text-white border-primary rounded-lg">
            <DialogHeader>
              <DialogTitle>Buzz on BuzzHive</DialogTitle>
              <DialogDescription>
                Share what you want with users across BuzzHive!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4  py-4 border-t-2 border-b-2 rounded-xl p-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  New Post
                </Label>
                <Input id="name" value={inputVal} onChange={e => setinputVal(e.target.value)} className="col-span-3 border-muted-foreground" placeholder="Write something here!"/>
              </div>
              <div className="flex justify-center items-center">

              <CldUploadWidget uploadPreset="Preset">
  {({ open }) => {
    return (
        <div className='flex border-2 border-muted-foreground px-4 py-2 rounded-2xl hover:bg-muted-foreground space-x-2'>
        <Image src={'/mediaicon.svg'} alt={''} width={25} height={25}/>
      <button className="button" onClick={() => open()}>
        Add Image
      </button>
        </div>
    );
  }}
</CldUploadWidget>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">BUZZ</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}

export default PostBuzz
