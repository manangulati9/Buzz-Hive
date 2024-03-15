import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Logo } from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClientRating from "@/components/Rating";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { SessionProvider } from "next-auth/react";

const testimonials = [
  {
    content:
      "Buzz Hive is my go-to platform for connecting with like-minded individuals and staying updated on the latest trends. The user-friendly interface and seamless navigation make it a breeze to engage with content and build meaningful connections. Highly recommended!",
    title: "Emily Johnson, Social Media Enthusiast",
    src: "/lady-1.jpeg",
  },
  {
    content:
      "As a professional in the digital marketing industry, Buzz Hive has been instrumental in expanding my network and enhancing my brand presence. The vibrant community and diverse discussions have provided valuable insights and opportunities for collaboration. Thank you, Buzz Hive!",
    title: "Sarah Smith, Digital Marketer",
    src: "/lady-2.webp",
  },
  {
    content:
      "Buzz Hive has revolutionized the way I consume news and stay informed about current events. With its real-time updates and personalized feed, I can easily discover relevant content and join conversations that matter to me. It's more than just a social platform; it's a hub for knowledge-sharing and community engagement.",
    title: "John Doe, News Enthusiast",
    src: "/man-1.jpg",
  },
  {
    content:
      "Buzz Hive has redefined my social media experience, offering a refreshing blend of connection and inspiration. From thought-provoking discussions to creative collaborations, Buzz Hive fosters a vibrant community where every voice is valued. Joining Buzz Hive has been a game-changer for me!",
    title: "David Brown, Content Creator",
    src: "/man-2.jpg",
  },
];

const features = [
  {
    title: "Real-Time Feed Updates",
    desc: "Stay informed and engaged with real-time updates on the Buzz Hive feed. Whether it's new posts from your connections, trending topics, or personalized recommendations, never miss out on the latest buzz.",
    src: "/feed-updates.svg",
  },
  {
    title: "Interactive Polls and Surveys",
    desc: "Engage your audience and gather valuable insights with interactive polls and surveys. Create polls on various topics, gather feedback from your followers, and foster meaningful conversations around the results.",
    src: "/survery.svg",
  },
  {
    title: "Advanced Search and Discovery",
    desc: "Discover new connections, topics, and content with Buzz Hive's advanced search and discovery features. Easily find users, hashtags, or trending discussions to explore and engage with.",
    src: "/search.svg",
  },
  {
    title: "Customizable Profile and Preferences",
    desc: "Personalize your Buzz Hive experience with customizable profiles and preferences. Tailor your feed, notification settings, and privacy options to suit your preferences and interests.",
    src: "/customize.svg",
  },
  {
    title: "Integrated Messaging and Collaboration",
    desc: "Seamlessly communicate and collaborate with other users through integrated messaging features. Start private conversations, create group chats, and share content with ease, all within the Buzz Hive platform.",
    src: "/messaging.svg",
  },
  {
    title: "Analytics and Insights Dashboard",
    desc: "Gain valuable insights into your activity, audience engagement, and content performance with Buzz Hive's analytics dashboard. Track metrics such as post reach, profile views, and audience demographics to optimize your social media strategy.",
    src: "/analyze.svg",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="fixed z-50 flex w-full items-center justify-between bg-black px-4 py-2 lg:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="ml-auto hidden gap-4 sm:gap-6 md:flex">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="flex gap-2 text-sm font-medium underline-offset-4 hover:underline"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="flex gap-2 text-sm font-medium underline-offset-4 hover:underline"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
        <Popover>
          <PopoverTrigger className="block md:hidden">
            <Menu />
          </PopoverTrigger>
          <PopoverContent className="mr-3 flex w-fit flex-col items-center justify-center gap-4 bg-black px-8 py-4 font-semibold tracking-tight text-foreground">
            <Link
              className="underline-offset-4 hover:underline"
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className="flex gap-2 underline-offset-4 hover:underline"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="flex gap-2 underline-offset-4 hover:underline"
              href="#contact"
            >
              Contact
            </Link>
          </PopoverContent>
        </Popover>
      </header>
      <main className="flex-1">
        <section className="relative flex h-[30rem] w-full items-center justify-center bg-black bg-dot-white/[0.2] md:h-[50rem]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="flex w-fit items-center px-10">
            <div className="hidden md:block md:w-[25rem] lg:w-[45rem]">
              <AspectRatio ratio={1 / 1}>
                <Image src="/social_media.svg" fill alt="img" />
              </AspectRatio>
            </div>
            <div className="container flex flex-col items-center justify-center space-y-8 p-0 text-center md:px-2 lg:min-h-[20rem]">
              <div className="space-y-2 md:max-w-2xl">
                <h1 className="text-primary-foregroundxl sm:text-primary-foregroundxl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
                  Welcome to BuzzHive!
                </h1>
                <p className="text-start text-muted-foreground md:px-10">
                  Enter the new era of social media - Share moments, chat with
                  friends, and discover new interests.
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Link
                  className={buttonVariants({ variant: "secondary" })}
                  href="/auth/sign-up"
                >
                  Sign Up
                </Link>
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href="/dashboard"
                >
                  {true ? <p>Dashboard</p> : <p>SignIn</p>}
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-foreground py-12 md:py-24">
          <div className="container flex items-center gap-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-primary-foregroundxl sm:text-primary-foregroundxl font-bold tracking-tighter text-primary-foreground md:text-5xl">
                  Share your Story
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with friends and family. Post photos, videos, and
                  updates. Let your personality shine.
                </p>
              </div>
              <div className="grid gap-2">
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "w-fit",
                  })}
                  href="#"
                >
                  Create Account
                </Link>
              </div>
            </div>
            <div className="hidden w-[40rem] md:block">
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
        <section
          className="relative flex w-full flex-col items-center justify-center py-6 bg-grid-white/[0.2] sm:py-12 md:py-24"
          id="features"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="z-10 flex flex-col items-center justify-center gap-14">
            <h1 className="text-primary-foregroundxl sm:text-primary-foregroundxl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
              What makes us different
            </h1>
            <div className="container grid grid-cols-1 flex-wrap justify-center gap-4 md:grid-cols-2 lg:flex lg:gap-4">
              {features.map((item) => (
                <Card
                  key={item.title}
                  className="max-w-sm transition-all hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tighter">
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="hidden items-center justify-center md:flex">
                    <div className="w-[200px]">
                      <AspectRatio ratio={1 / 1}>
                        <Image src={item.src} alt="" fill />
                      </AspectRatio>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="flex w-full items-center justify-center bg-foreground py-4 text-background">
          <div className="flex flex-col items-center space-y-8 px-4 py-10 text-center lg:min-h-[20rem]">
            <h1 className="text-primary-foregroundxl sm:text-primary-foregroundxl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
              Here&apos;s what our users say
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <Card
                  key={item.title}
                  className="max-w-lg transition-all hover:scale-105"
                >
                  <CardHeader className="flex flex-col items-center gap-4 text-start md:flex-row">
                    <div className="w-[100px] md:w-[350px]">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={item.src}
                          alt=""
                          fill
                          quality={50}
                          className="rounded-full object-cover object-center"
                        />
                      </AspectRatio>
                    </div>
                    <CardTitle className="text-sm font-normal tracking-normal">
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
        <section
          className="w-full border-t py-12 md:py-24 lg:py-32"
          id="contact"
        >
          <div className="container grid items-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-2">
              <h2 className="text-primary-foregroundxl md:text-primary-foregroundxl/tight font-bold tracking-tighter">
                Never miss an update from us
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for our newsletter
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="space-x-1 text-xs text-muted">
                <span>By clicking you agree to our</span>
                <Link className="underline underline-offset-2" href="#">
                  terms & conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs">&copy; 2024 Buzz Hive. All rights reserved.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
