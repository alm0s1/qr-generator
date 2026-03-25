import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfIp = req.headers.get("cf-connecting-ip");

  const ip = cfIp || (forwarded ? forwarded.split(",")[0].trim() : null) || realIp || "Unknown";

  return NextResponse.json({ ip });
}
