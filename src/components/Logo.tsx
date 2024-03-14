import Image from "next/image"

export function Logo() {
  return <div className="inline-flex gap-4 items-center">
    <Image src="/logo.svg" height={50} width={50} alt="" />
    <h2 className="text-primary-foregroundxl font-bold">BuzzHive</h2>
  </div>
}
