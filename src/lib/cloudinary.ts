import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

/**
 * Sanitize a filename into a safe Cloudinary public_id segment.
 * Removes the file extension, replaces spaces/dots with dashes, strips non-alphanumeric chars.
 */
function sanitizeFilename(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^.]+$/, ""); // strip extension
  return nameWithoutExt
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 60) || "upload";
}

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  resourceType: "image" | "video" | "raw" = "image"
): Promise<{ url: string; publicId: string }> {
  // Re-read env vars every call so they are always fresh
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      `Missing Cloudinary credentials. ` +
      `CLOUDINARY_CLOUD_NAME=${cloudName ?? "MISSING"}, ` +
      `CLOUDINARY_API_KEY=${apiKey ? "set" : "MISSING"}, ` +
      `CLOUDINARY_API_SECRET=${apiSecret ? "set" : "MISSING"}`
    );
  }

  const safeName = sanitizeFilename(filename);
  const publicId = `qr-generator/${Date.now()}-${safeName}`;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        public_id: publicId,
        overwrite: false,
        unique_filename: false,
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary] Upload error:", JSON.stringify(error));
          const hint =
            error.http_code === 401
              ? " — Check that CLOUDINARY_CLOUD_NAME matches your account's actual cloud name (visible on your Cloudinary dashboard)."
              : "";
          reject(new Error(`Cloudinary error: ${error.message} (HTTP ${error.http_code})${hint}`));
          return;
        }
        if (!result) {
          reject(new Error("Cloudinary returned no result"));
          return;
        }
        console.log("[Cloudinary] Upload success:", result.secure_url);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    // Pipe buffer through a readable stream → upload stream
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}
