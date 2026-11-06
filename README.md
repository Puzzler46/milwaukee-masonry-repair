# Milwaukee Masonry Repair — Website redesign (2026-11-06)

A responsive, static website featuring the supplied MMR logo, a fixed brick-wall image, a categorized horizontal gallery, and a contact form that collects **the customer's project-site address**.

## Preview

Open `index.html` in a browser. For local web testing, you can run `python -m http.server 8000` in this folder and open `http://localhost:8000`. The project gallery uses local image files. The address lookup requires internet access.

## Publishing

Upload `index.html`, `styles.css`, `script.js`, and the entire `assets` folder to the site's web host. Keep the same relative paths. The existing domain is currently a Google Sites site; using these standalone files requires hosting that serves static HTML/CSS/JS and connecting the domain to that host.

## Contact-form behavior

- Customer enters the **street address of the requested work**, city, optional ZIP code.
- Clicking **Verify project address** performs **one user-initiated OpenStreetMap/Nominatim geocoding search**. The customer selects a result. The form only marks it **matched** if the house number matches and the mapped state is Wisconsin. This is geocoding, not legal/property ownership or deliverability verification; it can miss valid addresses.
- A **Google Maps link** opens the chosen matched coordinates or performs a search for the typed address. Google's map URL by itself does not mean the address was verified.
- No business street address is shown or implied. The service area is Milwaukee, Waukesha and surrounding areas.
- Static form **prepares a `mailto:` email** to `milwaukeemasonryrepair@gmail.com`. The visitor must review and send it in their mail client. The website does not send the message itself. For a production-ready web submission, integrate a form service/backend, spam protection, and a privacy statement; never use a public static JavaScript secret.
- Nominatim may be unavailable or rate limited. Its usage policy does **not** permit autocomplete; this implementation searches only when the customer clicks Verify, with attribution. High-traffic commercial deployment should use a paid address API such as Google Places or a contracted geocoding provider, with appropriate provider terms and quotas.

## Original project photo gallery

The gallery uses **10 photos copied from the existing company website and hosted in this repository** in `assets/projects/project-01.webp` through `project-10.webp`. Original source image URLs and image dimensions are preserved in `assets/projects/manifest.json` for provenance and maintenance. Gallery categories were assigned by visual review of the photos; they represent the visible type of masonry and do **not** assert that a particular repair was completed. The filtering, carousel, and full-screen viewer are implemented in `script.js`.

Photo distribution: brick/block (2), tuckpointing/mortar (2), chimneys (2), stone/sills (2), pavers/hardscaping (2). No photograph could be positively identified as cleaning/sealing; selecting that service therefore shows all original photos with an explanatory notice. The gallery does not hotlink the old Google-hosted image URLs.

## Content provenance

Original service descriptions and email: https://www.milwaukeemasonryrepair.com/  
Phone and business logo: supplied MMR image (`414-213-2098`).  
Service area: supplied MMR logo.  
Snow removal: requested as an option in the contact form; not asserted as a masonry trade.  
Brick-wall background: generated texture to match the business's branding.  
No fabricated physical address, customer reviews, license numbers, warranties, or performance claims.

## Important prelaunch checklist

1. Verify the phone number and mailbox are staffed for new inquiries.
2. Review photo captions and category assignments with the business owner. The website photos are locally hosted on GitHub.
3. Connect a real form submission service if visitors must submit directly without their own email client.
4. Check geocoding provider terms/limits for production traffic; switch to Google Places API or similar if address lookup volume or coverage requires it.
5. Add the business's approved privacy policy and any legally required notices, then test on mobile and desktop.

## Deployment notes (2026-11-06)

- Six service cards link to the appropriate filter in the GitHub-hosted project gallery.
- Project photos, logo, and brick-wall background are stored locally in the repository; no external image hotlinks are needed.
- Source importer: `tools/import_masonry_photos.py`; GitHub Actions workflow: `.github/workflows/import-project-photos.yml`. Re-running the importer should be reviewed before publishing updated images or captions.
- The scrolling DRAFT watermark is deliberately retained for the customer review copy.
- Contact form prepares a mailto request; it does not send directly. Address matching uses OpenStreetMap geocoding and is not a postal delivery guarantee.