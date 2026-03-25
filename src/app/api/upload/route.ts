import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "@/lib/utils";

// App Router route handler — no Pages Router "export const config" needed here.
// formData() handles multipart/form-data natively.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (parseErr) {
      console.error("[upload] Failed to parse form data:", parseErr);
      return NextResponse.json({ error: "Could not parse request body. Ensure you are sending multipart/form-data." }, { status: 400 });
    }

    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file field found in request." }, { status: 400 });
    }

    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error: `File type "${file.type}" not allowed. Accepted: JPG, PNG, WebP, MP4, MOV, WebM.`,
        },
        { status: 422 }
      );
    }

    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max: ${isImage ? "10 MB" : "100 MB"}.` },
        { status: 422 }
      );
    }

    console.log(`[upload] Uploading ${file.name} (${file.type}, ${file.size} bytes)`);

    const buffer = Buffer.from(await file.arrayBuffer());
    const resourceType = isImage ? "image" : "video";

    const { url } = await uploadToCloudinary(buffer, file.name, resourceType);

    return NextResponse.json({ url, type: resourceType });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload] Unhandled error:", message);
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 }
    );
  }
}
