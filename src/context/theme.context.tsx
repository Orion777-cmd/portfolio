import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ThemeVariant = "light" | "dark";
export type ThemeType = "default" | "matrix" | "cyberpunk";

export interface Theme {
  type: ThemeType;
  variant: ThemeVariant;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeType: (type: ThemeType) => void;
  setThemeVariant: (variant: ThemeVariant) => void;
  isDark: boolean;
  isMatrix: boolean;
  isCyberpunk: boolean;
  isDefault: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: { type: "default", variant: "light" },
  setTheme: () => {},
  setThemeType: () => {},
  setThemeVariant: () => {},
  isDark: false,
  isMatrix: false,
  isCyberpunk: false,
  isDefault: true,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback for old format
        return { type: "default", variant: (saved as ThemeVariant) || "light" };
      }
    }
    return { type: "default", variant: "light" };
  });

  const isDark = theme.variant === "dark";
  const isMatrix = theme.type === "matrix";
  const isCyberpunk = theme.type === "cyberpunk";
  const isDefault = theme.type === "default";

  const setThemeType = (type: ThemeType) => {
    setTheme({ ...theme, type });
  };

  const setThemeVariant = (variant: ThemeVariant) => {
    setTheme({ ...theme, variant });
  };

  useEffect(() => {
    localStorage.setItem("portfolio-theme", JSON.stringify(theme));

    // Apply theme classes to document
    const themeClass = `${theme.type}-${theme.variant}`;
    document.documentElement.className = themeClass;

    // Remove existing theme styles
    const existingStyle = document.getElementById("dynamic-theme");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add theme-specific styles
    let styleContent = "";

    if (theme.type === "matrix") {
      styleContent = `
        @keyframes matrix-rain {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes matrix-glow {
          0%, 100% { 
            text-shadow: 0 0 5px #1AA06D, 0 0 10px #1AA06D, 0 0 15px #1AA06D, 0 0 20px #0B3221;
            filter: brightness(1.2);
          }
          25% { 
            text-shadow: 0 0 8px #135E3D, 0 0 15px #135E3D, 0 0 25px #135E3D, 0 0 35px #0B3221;
            filter: brightness(1.4);
          }
          50% { 
            text-shadow: 0 0 10px #1AA06D, 0 0 20px #1AA06D, 0 0 30px #1AA06D, 0 0 40px #0B3221;
            filter: brightness(1.6);
          }
          75% { 
            text-shadow: 0 0 8px #135E3D, 0 0 15px #135E3D, 0 0 25px #135E3D, 0 0 35px #0B3221;
            filter: brightness(1.4);
          }
        }
        
        .matrix-bg::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${
            theme.variant === "dark"
              ? "linear-gradient(135deg, #09110D 0%, #0B3221 25%, #135E3D 50%, #0B3221 75%, #09110D 100%)"
              : "linear-gradient(135deg, #f0fff0 0%, #e0ffe0 25%, #d0f0d0 50%, #e0ffe0 75%, #f0fff0 100%)"
          };
          z-index: -1;
        }
        
        .matrix-rain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }
        
        .matrix-char {
          position: absolute;
          color: ${theme.variant === "dark" ? "#1AA06D" : "#135E3D"};
          font-family: 'Courier New', monospace;
          font-size: 14px;
          animation: matrix-rain 3s linear infinite;
          opacity: 0.8;
          text-shadow: 0 0 5px ${
            theme.variant === "dark" ? "#1AA06D" : "#135E3D"
          };
        }
        
        .matrix-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(${
              theme.variant === "dark"
                ? "rgba(26, 160, 109, 0.1)"
                : "rgba(19, 94, 61, 0.1)"
            } 1px, transparent 1px),
            linear-gradient(90deg, ${
              theme.variant === "dark"
                ? "rgba(26, 160, 109, 0.1)"
                : "rgba(19, 94, 61, 0.1)"
            } 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          z-index: -1;
        }
        
        .matrix-glow {
          /* Removed glow animation */
        }
      `;
    } else if (theme.type === "cyberpunk") {
      styleContent = `
        @keyframes cyberpunk-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px #C231C9, 0 0 40px #C231C9, 0 0 60px #C231C9, 0 0 80px #260B68;
            border-color: #C231C9;
            filter: brightness(1.2);
          }
          33% { 
            box-shadow: 0 0 25px #4C5DD7, 0 0 50px #4C5DD7, 0 0 75px #4C5DD7, 0 0 100px #260B68;
            border-color: #4C5DD7;
            filter: brightness(1.4);
          }
          66% { 
            box-shadow: 0 0 30px #68A2EB, 0 0 60px #68A2EB, 0 0 90px #68A2EB, 0 0 120px #260B68;
            border-color: #68A2EB;
            filter: brightness(1.6);
          }
        }
        
        @keyframes neon-flicker {
          0%, 100% { 
            opacity: 1; 
            text-shadow: 0 0 10px #C231C9, 0 0 20px #C231C9, 0 0 30px #C231C9;
          }
          10% { opacity: 0.9; }
          20% { opacity: 1; }
          30% { opacity: 0.8; }
          40% { opacity: 1; }
          50% { 
            opacity: 0.7; 
            text-shadow: 0 0 15px #4C5DD7, 0 0 25px #4C5DD7, 0 0 35px #4C5DD7;
          }
          60% { opacity: 1; }
          70% { opacity: 0.9; }
          80% { opacity: 1; }
          90% { opacity: 0.8; }
        }
        
        @keyframes cyber-grid {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
        
        .cyberpunk-bg::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${
            theme.variant === "dark"
              ? "linear-gradient(135deg, #1D0225 0%, #260B68 25%, #4C5DD7 50%, #260B68 75%, #1D0225 100%)"
              : "linear-gradient(135deg, #faf0ff 0%, #e0f0ff 25%, #ffe0f0 50%, #e0f0ff 75%, #faf0ff 100%)"
          };
          z-index: -1;
        }
        
        .cyberpunk-grid {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(${
              theme.variant === "dark"
                ? "rgba(194, 49, 201, 0.1)"
                : "rgba(194, 49, 201, 0.05)"
            } 1px, transparent 1px),
            linear-gradient(90deg, ${
              theme.variant === "dark"
                ? "rgba(104, 162, 235, 0.1)"
                : "rgba(104, 162, 235, 0.05)"
            } 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
          z-index: -1;
          animation: cyber-grid 20s linear infinite;
        }
        
        .neon-text {
          /* Removed neon animation */
        }
      `;
    }

    // Add the style element if there's content
    if (styleContent) {
      const style = document.createElement("style");
      style.id = "dynamic-theme";
      style.textContent = styleContent;
      document.head.appendChild(style);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        setThemeType,
        setThemeVariant,
        isDark,
        isMatrix,
        isCyberpunk,
        isDefault,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
