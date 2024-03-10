import PostCard from "@/components/dashboard/PostCard";
import Image from "next/image";

export default function Component() {
    const posts = [
        {
          username: "Amazon Web Services",
          userlogo: "",
          userid: "aws-amazon",
          verified: true,
          feedtext: "lorem ipsum dolar",
          imageurl: "/bee.png",
          commentscount: 4,
          likescount: 4,
        },
        {
          username: "Manan Gulabi",
          userlogo: "",
          userid: "manan-ki-gulabi",
          verified: false,
          feedtext: `How alternative staffing solutions help organizations improve their #TalentSourcing: 👏Ability to scale business as needed 👏Access to qualified #RemoteWorkers globally 👏Improved productivity with faster hires and streamlined processes.`,
          imageurl: "/logo.svg",
          commentscount: 4,
          likescount: 4,
        },
      ]
  return (
    <div className="flex flex-col min-h-[100dvh] text-white">
      <main className="flex-1 p-10 space-y-10 container">
        <div className=" container grid  gap-6 px-4 text-center items-center lg:grid-cols-[200px_1fr] lg:gap-10 lg:px-6 xl:grid-cols-[250px_1fr] py-10">
          <div className="mx-auto flex items-center justify-center lg:justify-start">
            <div className="rounded-full overflow-hidden w-24 h-24 lg:w-32 lg:h-32 relative">
              <Image src={"/logo.svg"} alt={""} fill/>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Alice Johnson</h1>
              <p className="text-gray-500 dark:text-gray-400">UI Designer</p>
            </div>
          </div>
        </div>
        <div className="mx-auto container flex justify-between border-b-2 border-t-2 py-10 border-primary">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Bio</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Passionate about creating beautiful and intuitive user interfaces. I love the intersection of design and
                technology.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Skills</h2>
              <ul className="grid gap-2 md:grid-cols-2">
                <li>UI/UX Design</li>
                <li>Wireframing</li>
                <li>Prototyping</li>
                <li>Adobe XD</li>
                <li>Figma</li>
                <li>Sketch</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Experience</h2>
              <ul className="grid gap-2 list-disc">
                <li>
                  <div className="font-bold">Senior UI/UX Designer</div>
                  Acme Inc
                </li>
                <li>
                  <div className="font-bold ">UI Designer</div>
                  Example Corp
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Education</h2>
              <ul className="grid gap-2 list-disc">
                <li>
                  <div className="font-bold">BFA in Graphic Design</div>
                  University of Art & Design
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='w-[20rem]     h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold text-primary'>
          Buzzes
        </p>
        <Image src={"/bee.png"} alt={""} width={25} height={25}/>
      </div>
      <div className="flex flex-col space-y-14">{posts?.map((post) => (
        <PostCard key={post.username} post={post} />
      ))}</div>
      </main>
    </div>
  )
}

