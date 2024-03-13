import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Logo } from "@/components/Logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ClientRating from "@/components/Rating"

const testimonials = [
  {
    content: "Buzz Hive is my go-to platform for connecting with like-minded individuals and staying updated on the latest trends. The user-friendly interface and seamless navigation make it a breeze to engage with content and build meaningful connections. Highly recommended!",
    title: "Emily Johnson, Social Media Enthusiast",
    src: "/lady-1.jpeg",
  },
  {
    content: "As a professional in the digital marketing industry, Buzz Hive has been instrumental in expanding my network and enhancing my brand presence. The vibrant community and diverse discussions have provided valuable insights and opportunities for collaboration. Thank you, Buzz Hive!",
    title: "Sarah Smith, Digital Marketer",
    src: "/lady-2.webp",
  },
  {
    content: "Buzz Hive has revolutionized the way I consume news and stay informed about current events. With its real-time updates and personalized feed, I can easily discover relevant content and join conversations that matter to me. It's more than just a social platform; it's a hub for knowledge-sharing and community engagement.",
    title: "John Doe, News Enthusiast",
    src: "/man-1.jpg",
  },
  {
    content: "Buzz Hive has redefined my social media experience, offering a refreshing blend of connection and inspiration. From thought-provoking discussions to creative collaborations, Buzz Hive fosters a vibrant community where every voice is valued. Joining Buzz Hive has been a game-changer for me!",
    title: "David Brown, Content Creator",
    src: "/man-2.jpg",
  },
];

const features = [
  {
    title: "Real-Time Feed Updates",
    desc: "Stay informed and engaged with real-time updates on the Buzz Hive feed. Whether it's new posts from your connections, trending topics, or personalized recommendations, never miss out on the latest buzz."
  },
  {
    title: "Interactive Polls and Surveys",
    desc: "Engage your audience and gather valuable insights with interactive polls and surveys. Create polls on various topics, gather feedback from your followers, and foster meaningful conversations around the results."
  },
  {
    title: "Advanced Search and Discovery",
    desc: "Discover new connections, topics, and content with Buzz Hive's advanced search and discovery features. Easily find users, hashtags, or trending discussions to explore and engage with."
  },
  {
    title: "Customizable Profile and Preferences",
    desc: "Personalize your Buzz Hive experience with customizable profiles and preferences. Tailor your feed, notification settings, and privacy options to suit your preferences and interests."
  },
  {
    title: "Integrated Messaging and Collaboration",
    desc: "Seamlessly communicate and collaborate with other users through integrated messaging features. Start private conversations, create group chats, and share content with ease, all within the Buzz Hive platform."
  },
  {
    title: "Analytics and Insights Dashboard",
    desc: "Gain valuable insights into your activity, audience engagement, and content performance with Buzz Hive's analytics dashboard. Track metrics such as post reach, profile views, and audience demographics to optimize your social media strategy."
  },
]

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="p-4 lg:px-6 flex items-center">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/login">
            Login
          </Link>
          <Link className="text-sm font-medium flex gap-2 hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium flex gap-2 hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 flex justify-center items-center">
          <div className="flex items-center px-10 w-fit">
            <div className="lg:w-[45rem] md:w-[25rem] hidden md:block">
              <AspectRatio ratio={1 / 1}>
                <Image src="/social_media.svg" fill alt="img" />
              </AspectRatio>
            </div>
            <div className="container p-0 md:px-2 flex flex-col justify-center items-center lg:min-h-[20rem] text-center space-y-8">
              <div className="space-y-2 md:max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to BuzzHive!
                </h1>
                <p className="text-start text-muted-foreground md:px-10">
                  Enter the new era of social media - Share moments, chat with friends, and discover new interests.
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Link
                  className={buttonVariants({ variant: 'secondary' })}
                  href="/auth/sign-up"
                >
                  Sign Up
                </Link>
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-foreground">
          <div className="container items-center gap-6 flex">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-primary-foreground tracking-tighter sm:text-4xl md:text-5xl">Share your Story</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Connect with friends and family. Post photos, videos, and updates. Let your personality shine.
                </p>
              </div>
              <div className="grid gap-2">
                <Link
                  className={buttonVariants({ variant: "default", className: "w-fit" })}
                  href="#"
                >
                  Create Account
                </Link>
              </div>
            </div>
            <div className="w-[40rem] hidden md:block">
              <AspectRatio ratio={10 / 7}>
                <Image
                  alt="Image"
                  src="/dashboard.png"
                  className="rounded-2xl"
                  fill
                />
              </AspectRatio>
            </div>
          </div>
        </section>
        <section className="w-full py-6 sm:py-12 md:py-24 flex flex-col gap-14 justify-center items-center" id="features">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            What makes us different
          </h1>
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:flex flex-wrap gap-4 lg:gap-4">
            {features.map(item => (
              <Card key={item.title} className="max-w-sm transition-all hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl tracking-tighter font-bold">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent className="hidden md:flex justify-center items-center">
                  <div className="w-[200px]">
                    <AspectRatio ratio={1 / 1}>
                      <Image src="/features.svg" alt="" fill />
                    </AspectRatio>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="w-full text-background bg-foreground flex items-center justify-center py-4">
          <div className="flex flex-col items-center py-10 px-4 lg:min-h-[20rem] text-center space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Here's what our users say
            </h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {testimonials.map(item => (
                <Card key={item.title} className="transition-all hover:scale-105 max-w-lg">
                  <CardHeader className="flex flex-col text-start md:flex-row gap-4 items-center">
                    <div className="w-[100px] md:w-[350px]">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          quality={50}
                          className="object-center object-cover rounded-full"
                        />
                      </AspectRatio>
                    </div>
                    <CardTitle className="font-normal tracking-normal text-sm">
                      &quot;{item.content}&quot;
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="block font-semibold">
                    <p>{item.title}</p>
                    <ClientRating />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t" id="contact">
          <div className="container grid items-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Never miss an update from us
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sign up for our newsletter
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted space-x-1">
                <span>
                  By clicking you agree to our
                </span>
                <Link className="underline underline-offset-2" href="#">
                  terms & conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs">&copy; 2024 Buzz Hive. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

