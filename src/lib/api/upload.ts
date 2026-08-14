import { apiClient } from "./client";
import { MediaUploadResponse, MediaDeleteResponse } from "./types";

export const uploadApi = {
  /**
   * Upload a binary File or Blob to FastAPI backend
   */
  async uploadFile(
    file: File | Blob,
    folder: string = "foundation-erp",
    filename?: string,
    token?: string
  ): Promise<MediaUploadResponse> {
    const formData = new FormData();
    formData.append("file", file, filename || (file as File).name || "upload");
    formData.append("folder", folder);
    formData.append("resource_type", "auto");

    return apiClient.post<MediaUploadResponse>("/api/v1/upload", formData, { token });
  },

  /**
   * Upload a base64 encoded data URI string to FastAPI backend
   */
  async uploadBase64(
    base64Data: string,
    folder: string = "foundation-erp",
    filename?: string,
    token?: string
  ): Promise<MediaUploadResponse> {
    return apiClient.post<MediaUploadResponse>(
      "/api/v1/upload/base64",
      {
        data: base64Data,
        folder,
        filename,
      },
      { token }
    );
  },

  /**
   * Delete a media asset from Cloudinary via FastAPI backend
   */
  async deleteFile(
    publicId: string,
    resourceType: string = "image",
    token?: string
  ): Promise<MediaDeleteResponse> {
    return apiClient.delete<MediaDeleteResponse>(
      `/api/v1/upload/${encodeURIComponent(publicId)}`,
      {
        params: { resource_type: resourceType },
        token,
      }
    );
  },
};
