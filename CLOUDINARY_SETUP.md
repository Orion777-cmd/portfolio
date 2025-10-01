# Cloudinary Setup Guide

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get Your Cloud Name

1. Log into your Cloudinary dashboard
2. Your cloud name is displayed at the top of the dashboard
3. Copy this value (e.g., `your-cloud-name`)

## 3. Create an Upload Preset

1. In your Cloudinary dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `portfolio-upload` (or any name you prefer)
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `portfolio` (optional, for organization)
   - **Use filename**: Check this option
   - **Public ID**: Leave empty (auto-generated)
   - **Resource Type**: `Image`
   - **Access Mode**: `Public`
5. Click **Save**

## 4. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio-upload
```

Replace:

- `your-cloud-name` with your actual Cloudinary cloud name
- `portfolio-upload` with your actual upload preset name

## 5. Install Required Packages

```bash
npm install cloudinary @cloudinary/react @cloudinary/url-gen
```

## 6. Usage

The Cloudinary integration is now ready to use in your portfolio:

- **Profile Pictures**: Upload directly in System Settings
- **Project Images**: Upload when creating/editing projects
- **Automatic Optimization**: Images are automatically optimized for web delivery
- **Responsive Images**: Cloudinary provides responsive image URLs

## Features Included

- ✅ Direct upload to Cloudinary
- ✅ Image optimization
- ✅ Responsive design support
- ✅ Theme-aware upload components
- ✅ Loading states and error handling
- ✅ File type and size validation

## Troubleshooting

- **Upload fails**: Check your cloud name and upload preset
- **Images not displaying**: Verify your environment variables are set correctly
- **Permission errors**: Ensure your upload preset is set to "Unsigned"

## Security Note

The current setup uses unsigned uploads for simplicity. For production applications, consider implementing signed uploads for better security.
