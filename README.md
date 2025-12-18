# FuelCard Cruncher

Normalize WEX/Comdata fuel card CSVs into auditable Scope 1 (mobile combustion) emissions and fleet insights. Client-side Vite app with presets, validation, EPA 2025 AR5-100 factors, charts, and PDF/CSV exports.

## Live Site

**GitHub Pages:** [https://chaos-factory.github.io/ideator-execution-009Carbonaccounting-2-FuelCardCruncher/](https://chaos-factory.github.io/ideator-execution-009Carbonaccounting-2-FuelCardCruncher/)

**PR Previews:** See the "github-pages" deployment check on each pull request. Preview URLs are automatically posted as comments on PRs.

## Landing Page

The `/landing` directory contains a static landing page that showcases FuelCard Cruncher's features, methodology, and use cases.

### Local Development

To view the landing page locally:

1. **Option 1: Open directly**
   ```bash
   open landing/index.html
   # or on Linux: xdg-open landing/index.html
   ```

2. **Option 2: Use a simple static server**
   ```bash
   # Python 3
   python -m http.server 8000 --directory landing
   
   # Node.js (if you have npx)
   npx serve landing
   ```
   
   Then visit `http://localhost:8000` in your browser.

### Deployment

The landing page is automatically deployed to GitHub Pages via GitHub Actions:

- **Push to `main`:** Deploys to the live site
- **Pull requests:** Creates a preview deployment with a unique URL posted as a PR comment

The workflow is defined in `.github/workflows/pages.yml` and uses the official GitHub Pages actions for building, uploading, and deploying the site.

### Structure

- `landing/index.html` - Main landing page with 20 sections covering features, methodology, FAQs, etc.
- `landing/styles.css` - Styling with color system, responsive grid, and accessibility features
- `landing/script.js` - Interactive features (mobile nav, smooth scroll, accordion, dismissible announcement)
- `landing/assets/` - Sample CSV and PDF files for download links

### Accessibility

The landing page follows WCAG AA standards:
- Keyboard navigable (all interactive elements)
- Proper focus styles
- Aria attributes for accordions and expandable elements
- 4.5:1 minimum color contrast
- Reduced motion safe (respects `prefers-reduced-motion`)