# QR Generator Prompt

You are an expert Full Stack developer.

I need you to design and develop a modern and professional website called:

QR Generator

🎯 Website Concept:

Users can:

1. Enter a URL and generate a QR code for it

2. Upload an image → upload it to storage → generate a public link → generate a QR code for that link

3. Upload a video → upload it to storage → generate a public link → generate a QR code for that link

⚠️ Very Important Requirements:

- The QR code must contain only a link
- Image or video data should not be placed directly inside the QR code
- When uploading a file, it must first be stored, then a public URL created, and then a QR code generated from it

---

🧩 Key Features:

- Modern and beautiful (responsive) interface
- Tabs: Link / Image / Video
- Link input field
- Drag & Drop file uploads
- "Generate QR" button
- Direct display of the generated QR code
- Button to download the QR code as a PNG image
- Button to copy the link
- Clear success and error messages
- Arabic language support
- Dark and light modes (Dark/Light Mode)

---

🔍 Validation:

- Link Verification
- Allowed Images: jpg, jpeg, png, webp
- Allowed Videos: mp4, mov, webm
- Set File Size Limit
- Display Loading Status

---

🎨 Design:

- Clean and Professional Design
- Rounded Cards
- Subtle Shadows
- Elegant Buttons
- Fast and Smooth User Experience

---

⚙️ Technologies:

- Next.js
- Tailwind CSS
- QR Code Library
- File Uploading
- Supabase Storage or Cloudinary Recommended

---

📄 Page Sections:

1. Heading + Description
2. QR Code Generator Section
3. How the Site Works
4. Footer

---

✨ Additional Features:

- Save the Last 5 QR Codes to Local Storage
- Reset Button (Reset)
- Display image preview
- Display video name
- Copy link button

---

📦 Required information:

- Complete code (Frontend + Backend)
- File organization
- .env.example file
- Operation steps
- Explanation of file uploading and storage

---

🚀 Important addition (external page after QR scan):

Add a second page (external page) that opens when the QR code is scanned.

🎯 Page purpose:

To display general information about the device securely and with user consent only.

⚠️ Very Important Rules:
-  access to contacts
-  access to photos and files
-  attempts to bypass or crack security

---

📱 External Page Features:

1. Automatic Information Display:
- Device Type (Mobile/Computer/Tablet)
- Browser
- Operating System
- Screen Resolution
- Date and Time

📷 Camera (Optional):
- Request User Permission
- Display Live Preview Only (No Capture or Storage)

🔐 Privacy:
- Display Clear Message:

  "We respect your privacy. No personal data such as photos or contacts is accessed."

⭐ Additional Features:
- Display IP Address (if available via API)
- Generate Session ID for Each User
- Beautiful and Simple Mobile-Friendly Design

📌 Ultimate Goal:

A professional, ready-to-use website, nearing production readiness.
