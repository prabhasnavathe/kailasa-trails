# Kailasa Trails — Gallery Task Notes

## Current task
User asked: add a photo gallery section as a review button where all the clients share their pics and experiences.

## Plan
Add "Trekkers' Gallery" section (id="gallery") in Home.tsx between About section (ends line ~493) and Contact section (id="contact", line 496).
- Masonry-style photo grid (portrait trekkers' photos)
- Each card: photo, trekker name, trek name, short experience quote
- "Share Your Experience" button → opens a dialog/form (name, email, phone, trek, story, photo upload or just WhatsApp submit)
  - Implementation: form fields; submit button opens WhatsApp wa.me/918978117089 with pre-filled text (no backend, static project)
  - Photo cannot be sent via WhatsApp link, so the form text includes "I will share my photo separately on WhatsApp"

## Key facts
- Project: /home/ubuntu/kailasa-trails (web-static), auto-publish enabled
- WhatsApp number (messaging): +91 89781 17089 → wa.me/918978117089
- Call numbers: +91 94406 50253 and +91 89781 17089
- Email: kailasatrails@gmail.com
- Instagram: https://www.instagram.com/kailasa.trails?igsh=dDNna3VkN3dicW1z
- Logo: /manus-storage/kailasa-logo-official_470ca57a.jpg
- Trek images: rajmachi-trek_1f2de8ba.png, harishchandragad-trek_baed03d0.png, abc-trek_ab5f154e.png, kedarkantha-trek_b82ed446.png
- Trek slugs: /trek/abc-trek, /trek/kedarkantha-trek, /trek/rajmachi-trek, /trek/harishchandragad-trek, /trek/sinhagad-trek
- Design: dark luxury editorial, primary = bronze/gold (text-primary), slate-900/white sections
- Font imports in client/index.html: Playfair Display, Lora, Inter
- Treks data: client/src/lib/treks.ts (5 treks: ABC, Kedarkantha, Rajmachi, Harishchandragad, Sinhagad)
- Testimonials data: client/src/lib/testimonials.ts (fake testimonials exist — DO NOT add more fake ones; gallery uses "featured trekker moments" generated images, not fake customer reviews)

## Gallery images to generate
4-5 trekker-style photos in /home/ubuntu/webdev-static-assets/ (trekker-celebration.png, trekker-group-sunrise.png, trekker-summit-flag.png, trekker-campfire.png), then copy to webdev-static-assets and upload via manus-upload-file --webdev.

## Home.tsx structure (line refs may shift)
- id="featured" = Featured Treks (has difficulty filter)
- id="about" = About Kailasa Trails (ends ~493)
- id="contact" = Start Your Journey form (~496-609)
- Footer has Company/Expeditions/Connect columns; add "Gallery" link → #gallery
## Progress update (backend upgrade done)
- Phase 1-2 COMPLETE: Project upgraded to web-db-user (tRPC + drizzle + Manus OAuth). dotenv installed after ERR_MODULE_NOT_FOUND. Tables created: gallery_submissions (id,name,email,phone,trek,story,photoUrl,photoKey,status enum pending/approved/rejected,createdAt,updatedAt) + users.
- server/db.ts: listApprovedSubmissions, listAllSubmissions, insertSubmission, updateSubmissionStatus, deleteSubmission
- server/routers.ts: gallery.listApproved (public), gallery.submit (public, accepts photoBase64/photoName/photoType, max 8MB, uploads via storagePut to `gallery/{name}.{ext}`), admin.listSubmissions/approve/reject/deleteSubmission (adminProcedure requires role='admin'; owner gets admin role automatically via upsertUser openId===ENV.ownerOpenId)
- TypeScript: 0 errors, dev server HTTP 200 at localhost:3000

## Phase 3 TODO (frontend)
1. Replace static gallery photo grid in Home.tsx (lines ~573-649) to render approved submissions from trpc.gallery.listApproved.useQuery, mixed with/keeping the 5 generated placeholder images (trekker-summit-celebration_7cdb949b.png etc. — keep as fallback "Kailasa Moments")
2. Replace WhatsApp-based handleGallerySubmit (lines 41-58) with real submission: file input → readAsDataURL → trpc.gallery.submit.mutation; toast on success; keep form fields name/email/phone/trek/story (photo optional)
3. Create admin page client/src/pages/GalleryAdmin.tsx using DashboardLayout: table of submissions with status, approve/reject/delete buttons; wire trpc.admin.*; route /admin in App.tsx, protected (redirect to login via trpc auth me check — use trpc.auth.me.useQuery; admin only if role==='admin')
4. Run pnpm test after (vitest exists: server/auth.logout.test.ts); add gallery test in server/gallery.test.ts
5. Checkpoint + deliver

## Other context
- Home.tsx gallery section id="gallery" (line ~547), share section id="share-experience" (line ~654)
- tRPC client: import { trpc } from "@/lib/trpc"
- Header nav links: Featured Treks #featured, Destinations #destinations, About #about, Gallery #gallery, Contact #contact; footer Expeditions has Trekkers' Gallery link
- Owner must sign in via Manus OAuth once to become admin (role auto-set admin). Add small "Admin" link in footer or /admin route only.
- Site URL: kailasatrail-b3nim5jm.manus.space, auto-publish enabled
