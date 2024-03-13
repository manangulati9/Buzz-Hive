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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EarthIcon, Smile } from "lucide-react"
import Image from "next/image"
import { type ChangeEvent, useRef, useState } from "react"
import { Textarea } from "../ui/textarea"

function PostBuzz() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (selectedFiles.length + files.length > 5) {
        // Display an error message or take appropriate action
        setError(true);
      } else {
        const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length); // Limit to remaining slots
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        setError(false)
      }
    }
  };

  const handleSubmit = () => {
    // Here you can perform actions with the selected files, such as uploading them to a server
    if (selectedFiles.length > 0) {
      console.log('Selected files:', selectedFiles);
      // Perform upload or other operations with the files
    } else {
      console.log('No files selected');
    }
    setShowModal(false)
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    inputRef.current?.click();
  } 

  return (
    <div>
      <Dialog open={showModal} onOpenChange={()=> {setShowModal((prev) => !prev)}}>
        <div className='mx-auto w-[18rem]  md:w-full max-w-xl h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 my-10 md:backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
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
                <SelectTrigger className="w-fit bg-primary text-[#322904] rounded-xl text-xs md:text-base hover:bg-yellow-500 transition-colors duration-500">
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
                <DialogTrigger><Image src={'/mediaicon.svg'} alt={'media'} width={23} height={23} className='hover:scale-110 transition-all duration-200 cursor-pointer' /></DialogTrigger>
                <DialogTrigger><Smile className='text-primary hover:scale-110 transition-all duration-200 cursor-pointer' height={23} width={23} /></DialogTrigger>
              </div>
              <DialogTrigger asChild>
                <div className='border-2 flex items-center justify-center w-fit h-fit bg-primary hover:bg-yellow-500 transition-colors duration-500 rounded-full px-4 py-1 cursor-pointer text-[#322904]'>
                  <p className='font-semibold text-sm md:text-base Buzz'>Buzz</p>
                </div>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="max-w-[24rem] sm:max-w-[425px] bg-[#030712] text-foreground border-primary rounded-lg">
            <DialogHeader>
              <DialogTitle>Buzz on BuzzHive</DialogTitle>
              <DialogDescription>
                Share what you want with users across BuzzHive!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4  py-4  rounded-xl md:p-4">
              <div className="">
                <Textarea className="border-muted-foreground border-2" />
              </div>
              <div  className="flex justify-center items-center">
              
              <Button className="text-foreground bg-transparent border-muted-foreground border-2 hover:bg-muted-foreground w-fit h-fit" onClick={handleInputClick}> 
            
               Upload
              
              </Button>
              <input type="file" accept="image/*,video/mp4" multiple onChange={handleFileChange} ref={inputRef} className="hidden"/>
              </div>
            {error && <p className="text-center text-destructive text-sm">You can only upload up to five files. Try again</p> }
            {selectedFiles.length>0 && <p className="text-center text-primary text-sm">{`${selectedFiles.length} files uploaded`}</p> }
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} disabled={error}>Buzz</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>  
  )
}

export default PostBuzz
