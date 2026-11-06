# Milwaukee Masonry Repair — Website redesign (2026-11-06)

A responsive, static website featuring the supplied MMR logo, a fixed brick-wall image, a categorized horizontal gallery, and a contact form that collects **the customer's project-site address**.

## Preview

Open `index.html` in a browser. For local web testing, you can run `python -m http.server 8000` in this folder and open `http://localhost:8000`. Hosting is not required for the visual design, but external gallery images and map lookup require internet access.

## Publishing

Upload `index.html`, `styles.css`, `script.js`, and the entire `assets` folder to the site's web host. Keep the same relative paths. The existing domain is currently a Google Sites site; using these standalone files requires hosting that serves static HTML/CSS/JS and connecting the domain to that host.

## Contact-form behavior

- Customer enters the **street address of the requested work**, city, optional ZIP code.
- Clicking **Verify project address** performs **one user-initiated OpenStreetMap/Nominatim geocoding search**. The customer selects a result. The form only marks it **matched** if the house number matches and the mapped state is Wisconsin. This is geocoding, not legal/property ownership or deliverability verification; it can miss valid addresses.
- A **Google Maps link** opens the chosen matched coordinates or performs a search for the typed address. Google's map URL by itself does not mean the address was verified.
- No business street address is shown or implied. The service area is Milwaukee, Waukesha and surrounding areas.
- Static form **prepares a `mailto:` email** to `milwaukeemasonryrepair@gmail.com`. The visitor must review and send it in their mail client. The website does not send the message itself. For a production-ready web submission, integrate a form service/backend, spam protection, and a privacy statement; never use a public static JavaScript secret.
- Nominatim may be unavailable or rate limited. Its usage policy does **not** permit autocomplete; this implementation searches only when the customer clicks Verify, with attribution. High-traffic commercial deployment should use a paid address API such as Google Places or a contracted geocoding provider, with appropriate provider terms and quotas.

## Gallery note

The gallery uses nine image URLs from the business's original website (Google Sites / Googleusercontent). These are not stored in this ZIP, and external hosting may block or remove them at any time. The site displays a branded fallback if a photo fails to load. Category assignments are **provisional** because the original site doesn't label the photos by service. **Before publishing, confirm category-to-photo matches and store approved images locally in `assets/projects/`, updating `ORIGINAL_PROJECT_PHOTOS` in `script.js`.** The gallery filtering and full-screen viewer are fully implemented.

## Content provenance

Original service descriptions and email: https://www.milwaukeemasonryrepair.com/  
Phone and business logo: supplied MMR image (`414-213-2098`).  
Service area: supplied MMR logo.  
Snow removal: requested as an option in the contact form; not asserted as a masonry trade.  
Brick-wall background: generated texture to match the business's branding.  
No fabricated physical address, customer reviews, license numbers, warranties, or performance claims.

## Important prelaunch checklist

1. Verify the phone number and mailbox are staffed for new inquiries.
2. Replace externally hosted project images with approved local files and confirm category assignments.
3. Connect a real form submission service if visitors must submit directly without their own email client.
4. Check geocoding provider terms/limits for production traffic; switch to Google Places API or similar if address lookup volume or coverage requires it.
5. Add the business's approved privacy policy and any legally required notices, then test on mobile and desktop.

## Draft deployment notes (2026-11-06)
- Navigation: six service cards now link to the six corresponding portfolio category filters.
- Gallery: earlier Google Sites image URLs did not reliably hotlink on GitHub Pages. They are not used by the deployed gallery. Six clearly labeled photo slots lead to the original source website until actual, reviewed photos are supplied. **Do not represent these as published project photographs.** To add a verified photo, place it under `assets/projects` and set the `image` field in `galleryItems` in `script.js` to its local path.
- Assets: `assets/brand-logo.webp` (optimized from the supplied logo), `assets/dark-brick-wall.webp` (local background). Both must be committed to GitHub.
- Contact: static mailto workflow, not a backend submission. The address matching flow uses the external Nominatim service and is not a guarantee of delivery or authoritative address verification.
- Publish: repository must be public for free GitHub Pages and Pages Source must be `main` / root.