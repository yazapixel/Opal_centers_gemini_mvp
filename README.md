# Opal Centers (مركز أوبال) - Luxury Editorial Redesign

A high-end, responsive web platform for **Opal Centers (مركز أوبال)**, a premier beauty, dermatology, laser, and wellness center located on **Al-Aziziya Street (opposite Africa Pharmacy), Benghazi, Libya**.

## Design Philosophy & Identity
- **Luminous Warm Pearl Palette:** Crafted with an alabaster ivory, silken sand, and brushed bronze aesthetic (`#FAF8F5`, `#A37B5C`, `#C8A962`) inspired by opalescent gemstones.
- **Pure Vector Iconography:** Bespoke geometric SVG line icons without casual emojis, ensuring a high-end editorial feel aligned with international luxury aesthetic standards.
- **Bilingual & RTL-First Typography:** Arabic typography paired with Playfair Display and Tajawal for crisp readability and visual elegance.

## Key Features & Interactive Architecture
- **Interactive Service Catalog with Category Filters:** Real-time filtering across Skincare & HydraFacial, Laser Hair Removal, Hair Styling & Treatments, Spa & Moroccan Bath, and Bridal Packages.
- **Real-Time Opening Hours Detection:** Live Libyan timezone (UTC+2) status pill indicating open/closed states for Benghazi operating schedule (Saturday to Thursday: 10:00 AM - 9:00 PM; Friday: Closed).
- **Dual Booking Workflow:** Accessible modal form with pre-filled service selection plus direct WhatsApp booking integration with pre-formatted inquiry text.
- **Client Testimonials & Quality Standards:** Reviews from Benghazi clientele and trust markers (certified medical equipment, sterilized private suites).
- **Interactive FAQ Accordion:** Clean accordion answering key client questions regarding laser comfort, HydraFacial duration, bridal reservations, and privacy.
- **Verified Location Mapping:** Direct integration with Google Maps pin on Al-Aziziya Street.

## Testing & Verification
1. Run automated verification test suite:
   ```bash
   python3 test_mvp.py
   ```
2. Serve locally:
   ```bash
   python3 -m http.server 8000
   ```
