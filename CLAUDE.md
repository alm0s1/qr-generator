# Project Instructions: QR Generator

## Goal
Build a production-near website called **QR Generator** using **Next.js** and **Tailwind CSS**.

## Core Product Requirements
Implement a modern, professional, responsive site where users can:
1. Enter a URL and generate a QR code for it.
2. Upload an image, store it, create a public URL, then generate a QR code for that URL.
3. Upload a video, store it, create a public URL, then generate a QR code for that URL.

## Critical Rules
- The QR code must contain **only a link**.
-   image or video data directly in the QR code.
- For uploaded files: **store file -> generate public URL -> generate QR code**.
- access contacts, photos, files, or bypass device/browser security.


## Required Tech
- Next.js
- Tailwind CSS
- QR code generation library
- File upload support
- Prefer Supabase Storage or Cloudinary for public file URLs

## Main UI Requirements
- Responsive, modern, professional interface
- Arabic-friendly and support Arabic content/layout
- Dark and light mode
- Rounded cards, subtle shadows, elegant buttons
- Smooth UX

## Main Features
- Tabs: Link / Image / Video
- URL input field
- Drag & drop file upload
- Generate QR button
- QR preview
- Download QR as PNG
- Copy generated link
- Clear success/error states
- Reset button
- Save last 5 generated QR results in localStorage
- Image preview when image uploaded
- Show video file name when video uploaded

## Validation
- Validate URLs
- Allowed image types: jpg, jpeg, png, webp
- Allowed video types: mp4, mov, webm
- Enforce file size limits
- Show loading state during upload/generation

## Required Page Sections
1. Heading + description
2. QR generator section
3. How it works
4. Footer

## External Scan Page
Add a second page opened by the QR code.

### Purpose
Display general device/session information securely and only with user consent where required.

### Show Automatically
- Device type (mobile / computer / tablet)
- Browser
- Operating system
- Screen resolution
- Date and time
- Session ID
- IP address if available via a safe API

### Optional Camera
- Ask permission first
- Show live preview only
- No capture
- No storage

### Privacy Notice
Display this clearly:
"We respect your privacy. No personal data such as photos or contacts is accessed."

## Deliverables
Provide:
- Complete frontend and backend code
- Clean file organization
- `.env.example`
- Setup and run steps
- Explanation of file upload and storage flow

## Working Style
- Do not skip requirements.
- Do not replace required features with placeholders unless explicitly labeling them.
- Keep code clean, production-oriented, and reusable.
- Prefer clear folder structure and maintainable components.
