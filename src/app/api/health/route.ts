import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
	try {
		const dbResponse = await db.select().from(posts);
		const successMessage =
			dbResponse != null && dbResponse?.length > 0 ? "Success" : "Fail";
		return NextResponse.json({ status: successMessage, error: null });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ status: "Fail", error: e });
	}
}
