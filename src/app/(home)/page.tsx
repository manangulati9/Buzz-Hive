
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

export default async function Home() {
  return <div>Hello World
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
}
