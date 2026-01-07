# Vishu's Portfolio

A minimal comic book-inspired portfolio website built with Astro.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design

- **Theme**: Black/white comic book aesthetic with starfield background
- **Style**: Brutalist, minimal, content-first
- **Features**: Smooth page transitions, loading screen, responsive design

## 📁 Structure

```
portfolio/
├── src/
│   ├── components/    # Reusable components (Navigation, Stars)
│   ├── layouts/       # Page layouts
│   ├── pages/         # Routes (index, projects, social, about)
│   └── styles/        # Global CSS
├── public/            # Static assets
└── astro.config.mjs   # Astro configuration
```

## 🛠️ Tech Stack

- **Framework**: Astro
- **Styling**: Vanilla CSS
- **Hosting**: Deploy to Vercel/Netlify/GitHub Pages

## 📝 Customization

Edit content in `src/pages/*.astro` files to update:

- Projects in `/projects`
- Social links in `/social`
- About section in `/about`
- Home page hero text in `/index`

## 🌐 Deployment

```bash
# Build
npm run build

# Deploy dist/ folder to your hosting provider
```

For Vercel: Connect your GitHub repo and deploy automatically.
For Netlify: Drag and drop the `dist/` folder.
For GitHub Pages: Push the `dist/` folder to `gh-pages` branch.
