import { createClient } from '@/server/auth/server'
import { db } from '@/server/db'
import { users } from '@/server/db/schema'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirectTo.searchParams.delete('next')

      const { user } = data;

      if (user) {
        const newUser = {
          name: user.user_metadata.name,
          email: user.email!,
          username: user.user_metadata.username,
          id: user.id,
        } satisfies typeof users.$inferInsert

        await db.insert(users).values(newUser)
      }
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
