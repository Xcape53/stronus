# Piotr Jeleniewicz Portfolio

Personal portfolio for Piotr Jeleniewicz, an electronics and telecommunications student and software developer based in Gdynia, Poland.

[View the live website](https://piotrjeleniewicz.com/)

## Highlights

- Separate, crawlable English and Polish pages
- Responsive layouts for desktop, tablet, and mobile screens
- Project galleries with keyboard, touch, and on-screen navigation
- Custom electronics-inspired canvas effects and a D3 hero animation
- Technical SEO metadata, structured data, sitemap, and social preview assets
- Automated deployment to GitHub Pages

## Technology

The website is built with plain HTML, CSS, and JavaScript. It has no package manager or build step. The original ThemeForest template has been extended with custom responsive styles, localization, galleries, and visual effects.

## Project structure

- `index.html` - canonical English page
- `pl/index.html` - generated Polish page
- `css/` - template and project styles
- `js/` - localization, galleries, animation, and visual effects
- `images/` - project screenshots and optimized image variants
- `inventoryGen/` - standalone Minecraft inventory generator
- `scripts/generate_pl.py` - Polish page generator
- `.github/workflows/static.yml` - GitHub Pages deployment

## Local development

Serve the repository root with any static HTTP server. For example:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` in a browser. Opening files directly with the `file://` protocol can produce different behavior from the deployed site.

## Updating localized content

English content lives in `index.html`, while translations and shared localization keys live in `js/i18n.js`. After either source changes, regenerate the Polish page:

```bash
python scripts/generate_pl.py
```

Commit `pl/index.html` together with its source changes.

## Deployment

Every push to `main` runs the static GitHub Pages workflow. The production canonical URL is `https://piotrjeleniewicz.com/`.

## Content policy

Project screenshots, portfolio copy, and personal graphics belong to their respective owner. Third-party template and library files retain their original notices and licenses.
