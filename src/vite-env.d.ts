/// <reference types="vite/client" />

// Cloudinary types
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        config: any,
        callback: (error: any, result: any) => void
      ) => any;
    };
  }
}
