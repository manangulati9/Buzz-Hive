import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/server/auth";
import { cookies } from 'next/headers'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
    const cookieStore = cookies();
    const cookie = cookieStore.get('next-auth.session-token');

    if (cookie) return cookie.value; else return '';
  }

  if (req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
    return null;
  }

  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
