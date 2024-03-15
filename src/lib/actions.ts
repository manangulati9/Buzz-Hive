'use server'

import { revalidatePath } from "next/cache"

export async function revalidateRoute(path: string | string[]) {
  if (typeof path === "string") {
    revalidatePath(path)
    return;
  }

  path.forEach(async (p) => revalidatePath(p))
}
