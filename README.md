# Sportloods Oost Website

A modern, responsive Next.js website for Sportloods Oost - a functional training and strength training gym in Nijmegen, Netherlands.

## Features

- 🎨 Modern, responsive design (mobile-first)
- 📝 Content managed via JSON file for easy editing
- ♿ Accessible (ARIA labels, semantic HTML)
- 🚀 SEO-friendly with meta tags
- 🧩 Reusable, modular components
- 💨 Built with Next.js 14, React 18, and TailwindCSS

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Content Management

All website content is stored in `/data/content.json`. To update any text on the website:

1. Open `/data/content.json`
2. Find the section you want to edit (e.g., `home`, `about`, `offerings`)
3. Update the text values
4. Save the file - changes will appear immediately in development mode

### JSON Structure

The content is organized hierarchically:

```json
{
  "site": { /* Global site information */ },
  "nav": { /* Navigation menu items */ },
  "home": { /* Home page content */ },
  "about": { /* About Us page content */ },
  // ... other sections
}
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Navbar/Footer
│   ├── page.tsx           # Home page
│   ├── about/             # About Us page
│   ├── offerings/         # Offerings page
│   ├── tarieven/          # Pricing page
│   ├── openingstijden/    # Opening times page
│   ├── blog/              # Blog/News page
│   └── contact/           # Contact page
├── components/            # Reusable React components
│   ├── ui/               # Basic UI components (Button, Card, etc.)
│   └── sections/         # Page sections (Hero, Features, etc.)
├── data/                 # Content data
│   └── content.json     # All website text content
├── public/              # Static files (images, fonts)
└── styles/              # Global styles
```

## Adding New Content

### To add a new section:

1. Add the content to `/data/content.json`
2. Create a component in `/components/sections/`
3. Import and use the component in the appropriate page

### To add a new page:

1. Create a new folder in `/app/` with a `page.tsx` file
2. Add the page content to `/data/content.json`
3. Update the navigation in `/data/content.json` under `nav.items`

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```ts
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

### Images

Replace placeholder images in `/public/images/` with your own images. Update image paths in the JSON file.

## License

Private - © 2025 Sportloods Oost
