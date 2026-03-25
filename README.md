# QR Generator

A production-ready Next.js application for generating QR codes from links, images, and videos.

## Features

- **Link QR**: Enter any URL and generate a QR code instantly
- **Image QR**: Upload JPG/PNG/WebP → stored on Cloudinary → QR code with public URL
- **Video QR**: Upload MP4/MOV/WebM → stored on Cloudinary → QR code with public URL
- Drag & drop file upload with live image preview
- QR code download as PNG
- Copy generated link to clipboard
- Save last 5 QR results in localStorage (with history panel)
- Dark / Light mode
- Responsive and Arabic-friendly UI
- **Scan Page** (`/scan`): Shows device info, browser, OS, IP, session ID, and optional live camera preview

## File Upload & Storage Flow

```
User selects file
     │
     ▼
/api/upload (POST)
     │
     ▼
Validate type + size (server-side)
     │
     ▼
Upload to Cloudinary → returns secure_url
     │
     ▼
secure_url returned to client
     │
     ▼
QR code generated around secure_url (link only, never raw data)
```

## Setup

### 1. Clone and install
```bash
cd qr
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Get free Cloudinary credentials at https://cloudinary.com (free tier: 25 GB storage)

### 3. Run
```bash
npm run dev       # development
npm run build     # production build
npm start         # production server
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout with ThemeProvider
│   ├── page.tsx              # Home page (hero + generator + how it works)
│   ├── globals.css
│   ├── scan/
│   │   └── page.tsx          # Device info scan page
│   └── api/
│       ├── upload/route.ts   # Cloudinary upload endpoint
│       └── ip/route.ts       # IP address endpoint
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── QRGenerator.tsx       # Main generator with tab state
│   ├── QRPreview.tsx         # QR display + download + copy
│   ├── QRHistory.tsx         # localStorage history (last 5)
│   ├── HowItWorks.tsx
│   ├── tabs/
│   │   ├── LinkTab.tsx
│   │   ├── ImageTab.tsx      # With drag & drop + preview
│   │   └── VideoTab.tsx      # With drag & drop + filename
│   └── scan/
│       ├── ScanPageClient.tsx
│       ├── DeviceInfo.tsx    # Browser/OS/IP/session detection
│       └── CameraPreview.tsx # Permission-gated live preview
└── lib/
    ├── utils.ts              # Validation, history helpers
    └── cloudinary.ts         # Cloudinary upload wrapper
```

## Validation Rules

| Type  | Allowed Formats       | Max Size |
|-------|-----------------------|----------|
| Image | JPG, JPEG, PNG, WebP  | 10 MB    |
| Video | MP4, MOV, WebM        | 100 MB   |
| URL   | http:// or https://   | —        |

## Scan Page

The `/scan` page displays:
- Device type (Mobile / Tablet / Computer)
- Browser name
- Operating System
- Screen resolution
- Date and time
- Session ID (persisted in sessionStorage)
- IP address (via `/api/ip`)
- Language & timezone
- Optional live camera preview (permission required, no capture/storage)
- QR code to share the scan page itself
