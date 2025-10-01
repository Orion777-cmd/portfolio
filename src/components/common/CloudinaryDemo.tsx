import React, { useState } from "react";
import {
  uploadImage,
  getOptimizedImageUrl,
  extractPublicId,
} from "../../lib/cloudinary";
import { useTheme } from "../../context/theme.context";

const CloudinaryDemo: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [optimizedUrl, setOptimizedUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { isDark, isMatrix, isCyberpunk } = useTheme();

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const imageUrl = await uploadImage();
      setUploadedImage(imageUrl);

      // Extract public ID and create optimized URL
      const publicId = extractPublicId(imageUrl);
      if (publicId) {
        const optimized = getOptimizedImageUrl(publicId, {
          width: 300,
          height: 200,
          crop: "fill",
          gravity: "auto",
          quality: "auto",
          fetch_format: "auto",
        });
        setOptimizedUrl(optimized);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const getButtonStyles = () => {
    if (isMatrix) {
      return `bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 ${
        isDark
          ? "text-green-100 border-green-500"
          : "text-white border-green-600"
      }`;
    }
    if (isCyberpunk) {
      return `bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${
        isDark
          ? "text-purple-100 border-purple-500"
          : "text-white border-purple-600"
      }`;
    }
    return `bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 ${
      isDark ? "text-blue-100 border-blue-500" : "text-white border-blue-600"
    }`;
  };

  return (
    <div
      className={`p-6 rounded-lg border-2 ${
        isMatrix
          ? "border-green-500/50 bg-black/50"
          : isCyberpunk
          ? "border-purple-500/50 bg-black/50"
          : isDark
          ? "border-white/20 bg-gray-800/50"
          : "border-black/20 bg-white/50"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-4 ${
          isMatrix
            ? "text-green-400"
            : isCyberpunk
            ? "text-purple-400"
            : isDark
            ? "text-white"
            : "text-black"
        }`}
      >
        Cloudinary Upload Demo
      </h3>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 flex items-center space-x-2 mb-4 ${getButtonStyles()} ${
          isUploading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
        }`}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>Upload Image</span>
          </>
        )}
      </button>

      {uploadedImage && (
        <div className="space-y-4">
          <div>
            <h4
              className={`text-sm font-semibold mb-2 ${
                isMatrix
                  ? "text-green-400"
                  : isCyberpunk
                  ? "text-purple-400"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Original Image:
            </h4>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full max-w-sm rounded-lg border-2 border-gray-300 dark:border-gray-600"
            />
          </div>

          {optimizedUrl && (
            <div>
              <h4
                className={`text-sm font-semibold mb-2 ${
                  isMatrix
                    ? "text-green-400"
                    : isCyberpunk
                    ? "text-purple-400"
                    : isDark
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Optimized Image (300x200):
              </h4>
              <img
                src={optimizedUrl}
                alt="Optimized"
                className="w-full max-w-sm rounded-lg border-2 border-gray-300 dark:border-gray-600"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CloudinaryDemo;
