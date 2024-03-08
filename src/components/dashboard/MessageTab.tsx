import { CameraIcon, DotIcon, PhoneIcon, UserIcon } from "lucide-react";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ji3i6gLcGaw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
    return (
      <div className="flex flex-col h-[340px] border rounded-lg w-full max-w-sm dark:border-gray-800">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="w-4 h-4" />
            <div className="font-medium">Messages</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CameraIcon className="w-4 h-4" />
            <PhoneIcon className="w-4 h-4" />
            <DotIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-auto grid gap-4 text-sm dark:bg-gray-950">
          <div className="flex items-start gap-4">
            <div className="rounded-full overflow-hidden w-10 h-10">
              <img
                alt="@shadcn"
                className="border border-gray-200 dark:border-gray-800"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
            </div>
            <div className="grid gap-1 text-xs">
              <div className="font-semibold">Olivia Davis</div>
              <div className="text-sm">
                Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have
                some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's
                success. Please come prepared with any questions or insights you may have. Looking forward to our meeting!
                Best, Olivia
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full overflow-hidden w-10 h-10">
              <img
                alt="@shadcn"
                className="border border-gray-200 dark:border-gray-800"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
            </div>
            <div className="grid gap-1 text-xs">
              <div className="font-semibold">Max Leiter</div>
              <div className="text-sm">
                Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to
                all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="rounded-full overflow-hidden w-10 h-10">
              <img
                alt="@shadcn"
                className="border border-gray-200 dark:border-gray-800"
                height={40}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width={40}
              />
            </div>
            <div className="grid gap-1 text-xs">
              <div className="font-semibold">Jared Palmer</div>
              <div className="text-sm">
                I'm excited to announce the release of Remix 1.0! 🎉 After months of hard work, the team has created a
                fantastic framework for building web apps. Check it out and let us know what you think! #remixrun
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  

  