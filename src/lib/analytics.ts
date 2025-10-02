// Google Analytics 4 Integration
type GtagArgs =
  | [string, string | Date, Record<string, unknown>?]
  | [string, Record<string, unknown>];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || "";

// Initialize Google Analytics
export const initGA = () => {
  console.log("🔍 Analytics Debug - initGA called");
  console.log("🔍 Analytics Debug - GA_TRACKING_ID:", GA_TRACKING_ID);

  if (!GA_TRACKING_ID) {
    console.warn("❌ Google Analytics tracking ID not found");
    console.log("🔍 Available env vars:", import.meta.env);
    return;
  }

  console.log("✅ Loading Google Analytics script...");

  // Load Google Analytics script
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;

  script.onload = () => {
    console.log("✅ Google Analytics script loaded successfully");
    console.log("🔍 Script source:", script.src);
  };

  script.onerror = () => {
    console.error("❌ Failed to load Google Analytics script");
  };

  document.head.appendChild(script);

  // Add a small delay to ensure script is fully loaded
  setTimeout(() => {
    console.log("🔍 Checking gtag availability after delay...");
    console.log("🔍 window.gtag:", typeof window.gtag);
    console.log("🔍 dataLayer length:", window.dataLayer?.length);
  }, 1000);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: GtagArgs) {
    console.log("📊 Analytics Event:", args);
    window.dataLayer?.push(args);
  };

  console.log("✅ Initializing gtag...");
  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: false,
  });

  console.log("✅ Google Analytics initialized successfully");
};

// Track page views
export const trackPageView = (path: string) => {
  console.log("🔍 Analytics Debug - trackPageView called with path:", path);
  console.log("🔍 Analytics Debug - window.gtag exists:", !!window.gtag);

  if (!window.gtag) {
    console.warn("❌ window.gtag not available for page view tracking");
    return;
  }

  console.log("📊 Tracking page view:", path);
  window.gtag("config", GA_TRACKING_ID, {
    page_path: path,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track project views
export const trackProjectView = (projectTitle: string) => {
  trackEvent("view_project", "Projects", projectTitle);
};

// Track project link clicks
export const trackProjectClick = (
  projectTitle: string,
  linkType: "github" | "live"
) => {
  trackEvent(`click_${linkType}`, "Projects", projectTitle);
};

// Track theme changes
export const trackThemeChange = (theme: string, variant: string) => {
  trackEvent("theme_change", "UI", `${theme}-${variant}`);
};

// Track email signups
export const trackEmailSignup = (source: string) => {
  trackEvent("email_signup", "Engagement", source);
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  trackEvent("view_section", "Navigation", sectionName);
};
