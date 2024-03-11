'use client'

import { Button } from "@/components/ui/button";
import { createClient } from "@/server/auth/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return <div>
    <Button onClick={handleSignOut}>Sign out</Button>
    <Button onClick={() => router.push('/api/auth/callback')}>Callback</Button>
  </div>
}
