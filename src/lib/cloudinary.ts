// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  uploadPreset:
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your-upload-preset",
};

// Upload configuration
export const uploadConfig = {
  cloudName: cloudinaryConfig.cloudName,
  uploadPreset: cloudinaryConfig.uploadPreset,
  sources: ["local", "url", "camera"],
  multiple: false,
  cropping: true,
  croppingAspectRatio: 1,
  croppingShowDimensions: true,
  maxImageFileSize: 5000000, // 5MB
  maxImageWidth: 2000,
  maxImageHeight: 2000,
  resourceType: "image",
  folder: "portfolio", // Optional: organize uploads in a folder
};

// Cloudinary widget result interface
interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
  };
}

// Function to upload image using Cloudinary Upload Widget
export const uploadImage = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create upload widget
    const widget = (
      window as Window & {
        cloudinary?: {
          createUploadWidget: (
            config: Record<string, unknown>,
            callback: (error: unknown, result: CloudinaryResult) => void
          ) => { open: () => void };
        };
      }
    ).cloudinary?.createUploadWidget(
      uploadConfig,
      (error: unknown, result: CloudinaryResult) => {
        if (!error && result && result.event === "success") {
          resolve(result.info.secure_url);
        } else if (error) {
          reject(error);
        }
      }
    );

    if (widget) {
      widget.open();
    } else {
      reject(new Error("Cloudinary widget not available"));
    }
  });
};

// Function to get optimized image URL
export const getOptimizedImageUrl = (
  publicId: string,
  options: Record<string, unknown> = {}
) => {
  const defaultOptions = {
    quality: "auto",
    fetch_format: "auto",
    width: 400,
    height: 400,
    crop: "fill",
    gravity: "face",
  };

  const finalOptions = { ...defaultOptions, ...options };

  // Build Cloudinary URL manually since we removed the Cloudinary SDK dependency
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  const params = Object.entries(finalOptions)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");

  return `${baseUrl}/${params}/${publicId}`;
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (url: string): string | null => {
  const matches = url.match(/\/v\d+\/(.+)\.(jpg|jpeg|png|gif|webp)$/i);
  return matches ? matches[1] : null;
};
