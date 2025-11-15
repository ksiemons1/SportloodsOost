# Sportloods Oost Website - Quick Start

## 🚀 Getting Started (5 Minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Visit **http://localhost:3000**

That's it! The website is now running locally.

---

## 📝 Editing Content

All website text is in **one file**: `data/content.json`

### Quick Example:

**To change the homepage hero title:**

1. Open `data/content.json`
2. Find:
   ```json
   "home": {
     "hero": {
       "title": "Train in een Authentieke Luchtmachtloods"
     }
   }
   ```
3. Change the title text
4. Save the file
5. Refresh your browser - done!

**Full guide:** See `CONTENT_GUIDE.md`

---

## 🎨 Project Structure

```
├── app/              # Website pages (Home, About, etc.)
├── components/       # Reusable components (Buttons, Cards, etc.)
├── data/            # content.json ← All website text is here!
├── public/          # Images and static files
└── README.md        # This file
```

---

## 📄 Key Files

| File | Purpose |
|------|---------|
| `data/content.json` | **All website text** - edit this to update content |
| `app/page.tsx` | Home page |
| `app/about/page.tsx` | About Us page |
| `app/offerings/page.tsx` | Offerings page |
| `app/tarieven/page.tsx` | Pricing page |
| `components/ui/Button.tsx` | Reusable button component |
| `tailwind.config.ts` | Design system (colors, fonts, etc.) |

---

## 🛠️ Common Tasks

### Update Text Content

→ Edit `data/content.json` (all text is here)

### Change Phone Number / Email / Address

→ Edit the `"site"` section in `data/content.json`

### Add/Remove Navigation Links

→ Edit `"nav": { "items": [...] }` in `data/content.json`

### Change Opening Hours

→ Edit `openingstijden` section in `data/content.json`

### Update Pricing

→ Edit `tarieven` section in `data/content.json`

### Replace Images

1. Place new image in `public/images/`
2. Update path in `content.json`: `"image": "/images/your-image.jpg"`

---

## 🌐 Building for Production

```bash
# Build the site
npm run build

# Test production build
npm start
```

---

## 📚 Documentation

- **Content Writers:** Read `CONTENT_GUIDE.md`
- **Developers:** Read `DEVELOPER_GUIDE.md`
- **Everyone:** This file for quick reference

---

## ✅ Features

- ✨ **JSON-based content** - Edit all text in one place
- 📱 **Fully responsive** - Mobile, tablet, desktop
- ♿ **Accessible** - Semantic HTML, ARIA labels
- 🚀 **SEO-friendly** - Meta tags, semantic structure
- 🧩 **Modular** - Reusable components
- 🎨 **Modern design** - TailwindCSS
- ⚡ **Fast** - Next.js 14, optimized builds

---

## 🏗️ Technology

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Content:** JSON

---

## 🎯 Pages Included

- ✅ Home
- ✅ About Us
- ✅ Offerings (all training programs)
- ✅ Pricing (Tarieven)
- ✅ Opening Times (Openingstijden)
- ✅ Blog (with coming soon notice)
- ✅ Contact
- ✅ Login (placeholder for member portal)

---

## 🆘 Need Help?

### Content Changes
→ See `CONTENT_GUIDE.md`

### Development Questions
→ See `DEVELOPER_GUIDE.md`

### JSON Syntax Issues
→ Validate at https://jsonlint.com/

---

## 📞 Support

For questions about this project, contact the development team.

---

## 📜 License

Private - © 2025 Sportloods Oost
