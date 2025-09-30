import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/theme.context";

interface SystemSettingsProps {
  onClose: () => void;
}

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  profile_image?: string;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ onClose }) => {
  const {
    theme,
    setThemeType,
    setThemeVariant,
    isDark,
    isMatrix,
    isCyberpunk,
  } = useTheme();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Abiy Bihonegn",
    title: "Full Stack Developer",
    bio: "Passionate developer creating amazing digital experiences",
    email: "abiy@example.com",
    location: "Addis Ababa, Ethiopia",
    profile_image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // For now, we'll use default data. In a real app, you'd fetch from your database
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setProfileData({ ...profileData, profile_image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save to your database
      // For now, we'll just simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Profile data saved:", profileData);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const themeTypes = [
    {
      id: "default" as const,
      name: "Default",
      description: "Clean and professional",
      icon: "🎨",
      lightPreview: "bg-white border-gray-300",
      darkPreview: "bg-gray-900 border-gray-700",
    },
    {
      id: "matrix" as const,
      name: "Matrix",
      description: "Futuristic hacker aesthetic",
      icon: "🔮",
      lightPreview: "bg-green-50 border-green-300",
      darkPreview: "bg-black border-green-500",
    },
    {
      id: "cyberpunk" as const,
      name: "Cyberpunk",
      description: "Neon-soaked futuristic cityscape",
      icon: "🌃",
      lightPreview:
        "bg-gradient-to-br from-pink-50 to-purple-50 border-pink-300",
      darkPreview:
        "bg-gradient-to-br from-purple-900 to-pink-900 border-pink-500",
    },
  ];

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${
          isMatrix ? "matrix-bg" : ""
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current text-white"></div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 ${
        isMatrix ? "matrix-bg" : isCyberpunk ? "cyberpunk-bg" : ""
      }`}
    >
      {/* Matrix Rain Effect */}
      {isMatrix && <MatrixRain />}

      {/* Cyberpunk Grid Effect */}
      {isCyberpunk && <CyberpunkGrid />}

      <div
        className={`w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl border-2 ${
          isMatrix
            ? "bg-black/90 border-green-500/50 shadow-2xl shadow-green-500/20"
            : isCyberpunk
            ? "bg-black/90 border-pink-500/50 shadow-2xl shadow-pink-500/20 cyberpunk-glow"
            : isDark
            ? "bg-gray-900/90 border-white/20"
            : "bg-white/90 border-black/20"
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 border-b-2 ${
            isMatrix
              ? "border-green-500/30"
              : isCyberpunk
              ? "border-pink-500/30"
              : isDark
              ? "border-white/20"
              : "border-black/20"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2
              className={`text-2xl sm:text-3xl font-bold tracking-wider ${
                isMatrix
                  ? "text-green-400 matrix-glow"
                  : isCyberpunk
                  ? "text-pink-400 neon-text"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              System Settings
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isMatrix
                  ? "text-green-400 hover:bg-green-500/20"
                  : isCyberpunk
                  ? "text-pink-400 hover:bg-pink-500/20"
                  : isDark
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-black/10"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-8">
          {/* Theme Selection */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 tracking-wider ${
                isMatrix
                  ? "text-green-400"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Theme Selection
            </h3>
            {/* Theme Type Selection */}
            <div className="mb-6">
              <h4
                className={`text-lg font-semibold mb-3 ${
                  isMatrix
                    ? "text-green-400"
                    : isCyberpunk
                    ? "text-pink-400"
                    : isDark
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Theme Style
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {themeTypes.map((themeType) => (
                  <div
                    key={themeType.id}
                    onClick={() => setThemeType(themeType.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      theme.type === themeType.id
                        ? isMatrix
                          ? "border-green-500 bg-green-500/20"
                          : isCyberpunk
                          ? "border-pink-500 bg-pink-500/20"
                          : isDark
                          ? "border-white bg-white/20"
                          : "border-black bg-black/20"
                        : isMatrix
                        ? "border-green-500/30 hover:border-green-500/50"
                        : isCyberpunk
                        ? "border-pink-500/30 hover:border-pink-500/50"
                        : isDark
                        ? "border-white/20 hover:border-white/40"
                        : "border-black/20 hover:border-black/40"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{themeType.icon}</span>
                      <h4
                        className={`font-bold ${
                          isMatrix
                            ? "text-green-400"
                            : isCyberpunk
                            ? "text-pink-400"
                            : isDark
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {themeType.name}
                      </h4>
                    </div>
                    <p
                      className={`text-sm mb-3 ${
                        isMatrix
                          ? "text-green-300"
                          : isCyberpunk
                          ? "text-pink-300"
                          : isDark
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      {themeType.description}
                    </p>
                    <div className="flex space-x-2">
                      <div
                        className={`w-8 h-6 rounded ${themeType.lightPreview}`}
                        title="Light Mode"
                      ></div>
                      <div
                        className={`w-8 h-6 rounded ${themeType.darkPreview}`}
                        title="Dark Mode"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Variant Selection */}
            <div>
              <h4
                className={`text-lg font-semibold mb-3 ${
                  isMatrix
                    ? "text-green-400"
                    : isCyberpunk
                    ? "text-pink-400"
                    : isDark
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Color Mode
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setThemeVariant("light")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    theme.variant === "light"
                      ? isMatrix
                        ? "border-green-500 bg-green-500/20"
                        : isCyberpunk
                        ? "border-pink-500 bg-pink-500/20"
                        : isDark
                        ? "border-white bg-white/20"
                        : "border-black bg-black/20"
                      : isMatrix
                      ? "border-green-500/30 hover:border-green-500/50"
                      : isCyberpunk
                      ? "border-pink-500/30 hover:border-pink-500/50"
                      : isDark
                      ? "border-white/20 hover:border-white/40"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">☀️</span>
                    <h4
                      className={`font-bold ${
                        isMatrix
                          ? "text-green-400"
                          : isCyberpunk
                          ? "text-pink-400"
                          : isDark
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      Light Mode
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      isMatrix
                        ? "text-green-300"
                        : isCyberpunk
                        ? "text-pink-300"
                        : isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    Clean and bright interface
                  </p>
                </div>
                <div
                  onClick={() => setThemeVariant("dark")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    theme.variant === "dark"
                      ? isMatrix
                        ? "border-green-500 bg-green-500/20"
                        : isCyberpunk
                        ? "border-pink-500 bg-pink-500/20"
                        : isDark
                        ? "border-white bg-white/20"
                        : "border-black bg-black/20"
                      : isMatrix
                      ? "border-green-500/30 hover:border-green-500/50"
                      : isCyberpunk
                      ? "border-pink-500/30 hover:border-pink-500/50"
                      : isDark
                      ? "border-white/20 hover:border-white/40"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🌙</span>
                    <h4
                      className={`font-bold ${
                        isMatrix
                          ? "text-green-400"
                          : isCyberpunk
                          ? "text-pink-400"
                          : isDark
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      Dark Mode
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      isMatrix
                        ? "text-green-300"
                        : isCyberpunk
                        ? "text-pink-300"
                        : isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    Sleek dark interface
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 tracking-wider ${
                isMatrix
                  ? "text-green-400"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Profile Picture
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-2xl border-2 overflow-hidden ${
                    isMatrix
                      ? "border-green-500/50"
                      : isCyberpunk
                      ? "border-pink-500/50 cyberpunk-glow"
                      : isDark
                      ? "border-white/30"
                      : "border-black/30"
                  }`}
                >
                  {previewImage || profileData.profile_image ? (
                    <img
                      src={previewImage || profileData.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        isMatrix
                          ? "bg-green-500/20 text-green-400"
                          : isCyberpunk
                          ? "bg-pink-500/20 text-pink-400"
                          : isDark
                          ? "bg-white/10 text-white"
                          : "bg-black/10 text-black"
                      }`}
                    >
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {isMatrix && (
                  <div className="absolute inset-0 rounded-2xl border border-green-500/30 animate-pulse"></div>
                )}
                {isCyberpunk && (
                  <div className="absolute inset-0 rounded-2xl border border-pink-500/30 animate-pulse"></div>
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-6 py-3 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 ${
                    isMatrix
                      ? "bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30"
                      : isCyberpunk
                      ? "bg-pink-500/20 text-pink-400 border border-pink-500/50 hover:bg-pink-500/30 cyberpunk-glow"
                      : isDark
                      ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
                      : "bg-black/10 text-black border border-black/30 hover:bg-black/20"
                  }`}
                >
                  Upload Image
                </button>
                <p
                  className={`text-sm mt-2 ${
                    isMatrix
                      ? "text-green-300"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  Recommended: 400x400px, JPG or PNG
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 tracking-wider ${
                isMatrix
                  ? "text-green-400"
                  : isCyberpunk
                  ? "text-pink-400"
                  : isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    isMatrix
                      ? "text-green-400"
                      : isCyberpunk
                      ? "text-pink-400"
                      : isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    isMatrix
                      ? "bg-black/50 border-green-500/50 text-green-400 placeholder-green-500/50 focus:border-green-500"
                      : isCyberpunk
                      ? "bg-black/50 border-pink-500/50 text-pink-400 placeholder-pink-500/50 focus:border-pink-500"
                      : isDark
                      ? "bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    isMatrix
                      ? "text-green-400"
                      : isCyberpunk
                      ? "text-pink-400"
                      : isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Job Title
                </label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) =>
                    setProfileData({ ...profileData, title: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    isMatrix
                      ? "bg-black/50 border-green-500/50 text-green-400 placeholder-green-500/50 focus:border-green-500"
                      : isCyberpunk
                      ? "bg-black/50 border-pink-500/50 text-pink-400 placeholder-pink-500/50 focus:border-pink-500"
                      : isDark
                      ? "bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Your job title"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    isMatrix
                      ? "text-green-400"
                      : isCyberpunk
                      ? "text-pink-400"
                      : isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    isMatrix
                      ? "bg-black/50 border-green-500/50 text-green-400 placeholder-green-500/50 focus:border-green-500"
                      : isCyberpunk
                      ? "bg-black/50 border-pink-500/50 text-pink-400 placeholder-pink-500/50 focus:border-pink-500"
                      : isDark
                      ? "bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    isMatrix
                      ? "text-green-400"
                      : isCyberpunk
                      ? "text-pink-400"
                      : isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Location
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    isMatrix
                      ? "bg-black/50 border-green-500/50 text-green-400 placeholder-green-500/50 focus:border-green-500"
                      : isCyberpunk
                      ? "bg-black/50 border-pink-500/50 text-pink-400 placeholder-pink-500/50 focus:border-pink-500"
                      : isDark
                      ? "bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="City, Country"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  className={`block text-sm font-bold tracking-wider uppercase mb-2 ${
                    isMatrix
                      ? "text-green-400"
                      : isCyberpunk
                      ? "text-pink-400"
                      : isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                    isMatrix
                      ? "bg-black/50 border-green-500/50 text-green-400 placeholder-green-500/50 focus:border-green-500"
                      : isCyberpunk
                      ? "bg-black/50 border-pink-500/50 text-pink-400 placeholder-pink-500/50 focus:border-pink-500"
                      : isDark
                      ? "bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-white"
                      : "bg-white/50 border-black/20 text-black placeholder-gray-500 focus:border-black"
                  }`}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 border-2 text-sm sm:text-base ${
                isMatrix
                  ? "border-green-500/50 text-green-400 hover:bg-green-500/20"
                  : isCyberpunk
                  ? "border-pink-500/50 text-pink-400 hover:bg-pink-500/20"
                  : isDark
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-black/30 text-black hover:bg-black/10"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-3 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 text-sm sm:text-base ${
                isMatrix
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                  : isCyberpunk
                  ? "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/50 cyberpunk-glow"
                  : isDark
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                  : "bg-black/10 text-black hover:bg-black/20 border border-black/30"
              } ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Matrix Rain Component
const MatrixRain: React.FC = () => {
  const [drops, setDrops] = useState<
    Array<{ id: number; x: number; delay: number }>
  >([]);

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
      }));
      setDrops(newDrops);
    };

    generateDrops();
    const interval = setInterval(generateDrops, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="matrix-rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-char"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {String.fromCharCode(0x30a0 + Math.random() * 96)}
        </div>
      ))}
    </div>
  );
};

// Cyberpunk Grid Component
const CyberpunkGrid: React.FC = () => {
  return <div className="cyberpunk-grid"></div>;
};

export default SystemSettings;
