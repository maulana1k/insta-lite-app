import { apiClient } from "@/lib/api-client";

type MediaContext = "post_image" | "avatar" | "cover_photo" | "story";
type MimeType = "image/jpeg" | "image/png" | "image/webp" | "image/gif" | "video/mp4";

export interface UploadUrlResponse {
  media_id: string;
  upload_url: string;
}

export interface ConfirmResponse {
  media_id: string;
  public_url: string;
}

export function requestUploadUrl(
  context: MediaContext,
  mime_type: MimeType,
  size_bytes: number,
): Promise<UploadUrlResponse> {
  return apiClient.post<UploadUrlResponse>("/media/upload-url", {
    context,
    mime_type,
    size_bytes,
  });
}

export function confirmMedia(media_id: string): Promise<ConfirmResponse> {
  return apiClient.post<ConfirmResponse>("/media/confirm", { media_id });
}

/** Upload the file directly to the GCS signed URL (no auth header). */
export async function uploadToGcs(upload_url: string, file: File): Promise<void> {
  const res = await fetch(upload_url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) {
    throw new Error(`GCS upload failed: ${res.status}`);
  }
}

/**
 * Full 3-step upload for a given context:
 *   1. POST /media/upload-url → signed URL + media_id
 *   2. PUT file directly to GCS
 *   3. POST /media/confirm → confirms upload, returns public_url
 */
export async function uploadMedia(
  file: File,
  context: MediaContext = "post_image",
): Promise<ConfirmResponse> {
  const mime_type = file.type as MimeType;
  const { media_id, upload_url } = await requestUploadUrl(context, mime_type, file.size);
  await uploadToGcs(upload_url, file);
  return confirmMedia(media_id);
}
