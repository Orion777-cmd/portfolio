# Google Analytics Setup Guide

## Overview

Your portfolio now has Google Analytics 4 (GA4) integrated to track user interactions, page views, and engagement metrics.

## 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** (gear icon in the bottom left)
4. Click **Create Property**
5. Enter your property details:
   - **Property name**: "Portfolio Website"
   - **Time zone**: Your timezone
   - **Currency**: Your currency
6. Click **Next** and complete the setup

## 2. Create a GA4 Data Stream

1. After creating the property, click **Data Streams**
2. Click **Add stream** → **Web**
3. Enter your website URL (e.g., `https://yourportfolio.com`)
4. Enter a stream name (e.g., "Portfolio Main Site")
5. Click **Create stream**

## 3. Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

## 4. Add to Environment Variables

Create or update your `.env` file in the project root:

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Cloudinary (if using)
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# Supabase
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 5. What's Being Tracked

### Automatic Tracking:

- ✅ **Page Views**: Every route change is tracked
- ✅ **Initial Load**: First visit to the portfolio

### Custom Events Tracked:

#### Project Interactions:

- **GitHub Link Clicks**: Tracks when users click "Code" button

  - Event: `click_github`
  - Category: `Projects`
  - Label: Project title

- **Live Demo Clicks**: Tracks when users click "Live Demo" button
  - Event: `click_live`
  - Category: `Projects`
  - Label: Project title

#### Theme Changes:

- **Theme Type Change**: Tracks theme changes (Default/Matrix/Cyberpunk)

  - Event: `theme_change`
  - Category: `UI`
  - Label: `theme-variant` (e.g., "matrix-dark")

- **Variant Change**: Tracks light/dark mode changes
  - Event: `theme_change`
  - Category: `UI`
  - Label: Current theme combination

#### Section Views:

- **Projects Section**: Tracked when users view the projects section
  - Event: `view_section`
  - Category: `Navigation`
  - Label: `Projects`

## 6. View Your Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Navigate to **Reports** → **Realtime** to see live visitors
4. Check **Reports** → **Engagement** → **Events** to see tracked events

## 7. Custom Dashboards

You can create custom dashboards in GA4 to monitor:

- Most viewed projects
- Popular theme choices
- User engagement patterns
- Traffic sources
- Device types
- Geographic distribution

## 8. Testing

To test if analytics is working:

1. **Open your portfolio** in a browser
2. **Open Developer Console** (F12)
3. **Navigate around** your portfolio
4. **Check Network tab** for requests to `google-analytics.com`
5. **Check GA4 Realtime** reports (takes 1-2 minutes to appear)

## 9. Privacy Considerations

Consider adding a cookie consent banner if you're serving EU users (GDPR compliance):

- Use libraries like `react-cookie-consent`
- Allow users to opt-out of tracking
- Update privacy policy

## 10. Advanced Tracking (Optional)

You can track additional events by importing the analytics functions:

```typescript
import {
  trackEvent,
  trackProjectView,
  trackEmailSignup,
} from "./lib/analytics";

// Track custom events
trackEvent("button_click", "Engagement", "Download Resume");

// Track project card impressions
trackProjectView("Project Name");

// Track email signups
trackEmailSignup("newsletter");
```

## Troubleshooting

### Analytics not showing data:

- Verify your Measurement ID is correct
- Check browser console for errors
- Ensure `.env` file is in the project root
- Restart your development server after adding env variables

### AdBlockers:

- Some users may have ad blockers that prevent analytics
- This is expected and not an error
- Analytics will work for users without ad blockers

## Security Note

Your Google Analytics Measurement ID is safe to expose in client-side code. It's designed to be public and doesn't pose a security risk.
