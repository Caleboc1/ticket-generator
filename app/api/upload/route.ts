import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  if (!imageUrl || !imageUrl.startsWith("https://res.cloudinary.com/")) {
    return NextResponse.json({ error: "Invalid Cloudinary URL" }, { status: 400 });
  }

  return NextResponse.json({ message: "Upload successful", url: imageUrl });
}
