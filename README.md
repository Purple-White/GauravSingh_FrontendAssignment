# Logistics Order Form — Live Shipment Manifest

A full-featured logistics order entry interface with a real-time shipment manifest preview, built as a frontend engineering assignment.

**Live demo:** [gaurav-singh-frontend-assignment.vercel.app](https://gaurav-singh-frontend-assignment.vercel.app)

---

## Overview

Fill the order form on the left — the manifest on the right updates live as you type. The manifest behaves like a physical waybill: perforated top edge, transport mode indicator, package rows, volumetric weight calculation, a deterministic barcode, and a printed footer.

---

## Features

### Order Form
- **Shipment details** — auto-generated order ID, shipment date with a custom calendar input, delivery type toggle (Standard / Express)
- **Sender & receiver** — name, street address, city, and pincode for both consignor and consignee
- **Packages** — add or remove packages dynamically; each has a label, weight, L × W × H dimensions, and declared value
- **Options** — Fragile and Insured toggles rendered as accessible checkboxes

### Live Manifest Preview
- **Empty state** — isometric box illustration with an "Awaiting details" footer; displayed until the form has any meaningful input
- **Transport icon** — truck SVG for Standard, plane SVG for Express; swaps with a fade-in animation on every toggle
- **Address connector** — dashed vertical line with the transport icon centered in a circle between FROM and TO blocks
- **Package rows** — each package shown with label, declared value, and a dimension / weight summary
- **Indicator chips** — Fragile and Insured badges, neutral styling when inactive
- **Totals — 5-row layout:**
  - Package count
  - Total actual weight
  - Volumetric weight (`L × W × H ÷ 5000` per package)
  - **Chargeable weight** — higher of actual vs volumetric, highlighted in orange when real data is present
  - Total declared value
- **Barcode** — deterministic SVG barcode derived from the order ID via a character-code algorithm, scaled to fill exactly 240 px
- **Manifest footer** — `End of Manifest · {orderId}`

### UX Details
- Changed values pulse with an orange flash animation (React `key` remount trick)
- Mobile: manifest collapses below the form; a fixed "View manifest" FAB pill scrolls to it
- Keyboard-navigable segmented control (arrow keys, ARIA radio-group pattern)
- Chrome autofill blue background suppressed on all inputs
- Custom date input: native picker retained; indicator hidden behind a CSS overlay; SVG calendar icon decorates the right edge

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS Modules — zero Tailwind, zero styled-components |
| Fonts | `next/font/google` — Inter (UI) + JetBrains Mono (numbers / IDs) |
| State | `useState` + `useMemo` in `OrderForm` only |
| Icons | Inline SVG — no icon library |
| Forms | Plain controlled inputs — no form library |
| Deployment | Vercel |

**Zero runtime dependencies beyond React and Next.js.**

---

## Constraints (by design)

- No Tailwind, no CSS-in-JS, no utility class libraries
- No UI component libraries (Radix, shadcn, MUI, etc.)
- No form libraries (react-hook-form, Formik, etc.)
- No icon libraries (Lucide, Heroicons, etc.) — every SVG is hand-authored inline
- No additional `npm` packages beyond the initial `create-next-app` scaffold
- Package IDs always use `crypto.randomUUID()`, never array indices

---

## Project Structure

```
app/
  layout.tsx              # Root layout — font variables + token class on <html>
  page.tsx                # Page shell — OrderForm + dynamic MobileManifestPill
  globals.css             # Minimal CSS reset only
  tokens.module.css       # All design tokens as CSS custom properties

components/
  OrderForm/              # Owns all form state (useState) and derived totals (useMemo)
  ShipmentPreview/        # Pure presentation — receives props, renders the manifest

  sections/
    ShipmentSection/      # Order ID, shipment date, delivery type
    AddressSection/       # Sender / receiver fields (shared component used twice)
    PackagesSection/      # Dynamic package list with add / remove
    OptionsSection/       # Fragile + Insured checkboxes

  ui/
    Badge/                # Delivery type + order stamp variants
    Barcode/              # Deterministic SVG barcode generated from the order ID
    Button/               # Primary action button
    Checkbox/             # Accessible labeled checkbox
    Chip/                 # Fragile / Insured / inactive indicator chips
    MobileManifestPill/   # Fixed FAB pill — visible only below 768 px
    NumberField/          # Numeric input (weight, dimensions, value)
    SectionCard/          # Eyebrow + title wrapper for form sections
    SegmentedControl/     # Keyboard-navigable radio-group toggle
    TextField/            # Single-line text input
    Textarea/             # Multi-line text input
    TransportIcon/        # Truck / plane SVG with entry animation

lib/
  computeTotals.ts        # Actual weight, volumetric weight, chargeable, declared value
  generateOrderId.ts      # Crypto-random order ID (client-only via useEffect)
  isFormEmpty.ts          # Gate for showing the manifest empty state
  validators.ts           # Field-level validation helpers

types/
  order.ts                # Address, Package, FormState, DeliveryType, ComputedTotals
```

---

## Design System

All tokens live in `app/tokens.module.css` as CSS custom properties on a `.tokenRoot` class applied to `<html>`. This satisfies the "no global CSS" constraint while making every token available cascade-wide.

### Colour palette

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#F6F5F1` | Page background |
| `--color-surface` | `#FFFFFF` | Card / input background |
| `--color-text-primary` | `#18181B` | Primary text |
| `--color-text-secondary` | `#52525B` | Secondary / label text |
| `--color-text-tertiary` | `#A1A1AA` | Placeholders, quiet labels |
| `--color-accent` | `#DC5F2C` | Burnt orange — badges, icons, highlights |
| `--color-accent-subtle` | `#FCE9DE` | Chargeable weight row background |

### Typography

| Variable | Font | Used for |
|---|---|---|
| `--font-sans` | Inter | All UI labels and form text |
| `--font-mono` | JetBrains Mono | Order ID, dates, weights, barcode label |

---

## Key Implementation Notes

### Volumetric weight
Each package contributes `(L × W × H) / 5000` kg. Chargeable weight is `Math.max(actualWeight, volumetricWeight)`, rounded to 2 decimal places. The chargeable row turns orange only when at least one package has real data.

### Barcode algorithm
For each character in the order ID string:
1. `digit = charCode % 10`
2. `barWidth = digit < 4 ? 1 : digit < 7 ? 2 : 3`
3. A gap of width 1 follows every bar
4. All widths are scaled so the total bar area fills exactly 240 px

Rendered as an SVG using `<rect>` elements — no canvas, no third-party library.

### Transport icon animation
`TransportIcon` places `key={mode}` on its inner `<span>`. When `deliveryType` changes, React unmounts and remounts the span, re-triggering `@keyframes iconFadeIn` (scale 0.82 → 1, opacity 0 → 1, 220 ms) on every switch.

### Hydration safety
`generateOrderId()` uses `crypto.getRandomValues` and only runs inside `useEffect` after mount, with `useState('')` as the SSR placeholder. This prevents server/client HTML mismatches in Next.js App Router.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

No environment variables required.

---

## Browser Support

Tested in Chrome 124+, Firefox 125+, Safari 17+. The custom date input uses `::-webkit-calendar-picker-indicator` to overlay the native icon — Firefox renders its own date picker UI which works correctly without this CSS.
