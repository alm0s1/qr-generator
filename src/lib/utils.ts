export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Image must be smaller than 10 MB.";
  }
  return null;
}

export function validateVideoFile(file: File): string | null {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return "Only MP4, MOV, and WebM videos are allowed.";
  }
  if (file.size > MAX_VIDEO_SIZE) {
    return "Video must be smaller than 100 MB.";
  }
  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type QRHistoryItem = {
  id: string;
  type: "link" | "image" | "video";
  url: string;
  label: string;
  createdAt: string;
};

export function getQRHistory(): QRHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("qr_history") || "[]");
  } catch {
    return [];
  }
}

export function saveQRHistory(item: QRHistoryItem): void {
  const history = getQRHistory();
  const updated = [item, ...history.filter((h) => h.id !== item.id)].slice(0, 5);
  localStorage.setItem("qr_history", JSON.stringify(updated));
}

export function clearQRHistory(): void {
  localStorage.removeItem("qr_history");
}
