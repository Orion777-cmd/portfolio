import React, { useState } from "react";
import { uploadImage } from "../../lib/cloudinary";
import { useTheme } from "../../context/theme.context";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImageUrl?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImageUrl,
  placeholder = "Upload Image",
  className = "",
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { isDark, isMatrix, isCyberpunk } = useTheme();

  const handleUpload = async () => {
    if (disabled || isUploading) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage();
      onImageUpload(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to upload image: ${errorMessage}`);
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
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Display */}
      {currentImageUrl && (
        <div className="relative">
          <img
            src={currentImageUrl}
            alt="Current"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
              Current Image
            </span>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={disabled || isUploading}
        className={`
          w-full px-4 py-3 rounded-lg font-medium transition-all duration-200
          border-2 flex items-center justify-center space-x-2
          ${getButtonStyles()}
          ${
            disabled || isUploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg transform hover:scale-105"
          }
        `}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              className="w-5 h-5"
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
            <span>{placeholder}</span>
          </>
        )}
      </button>

      {/* Upload Info */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>• Supported formats: JPG, PNG, GIF, WebP</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Images will be automatically optimized</p>
      </div>
    </div>
  );
};

export default ImageUpload;
