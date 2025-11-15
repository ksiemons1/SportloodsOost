# Developer Documentation

## Project Overview

This is a Next.js 14 website for Sportloods Oost, built with TypeScript, React, and TailwindCSS. The project follows modern web development best practices with a strong focus on maintainability and content management.

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Content:** JSON-based content management
- **Deployment:** Ready for Vercel, Netlify, or any Node.js host

## Project Structure

```
sportloods-oost/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout (Navbar + Footer)
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── offerings/           # Offerings page
│   ├── tarieven/            # Pricing page
│   ├── openingstijden/      # Opening times page
│   ├── blog/                # Blog page
│   ├── contact/             # Contact page
│   ├── login/               # Login page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Section.tsx
│   │   ├── Container.tsx
│   │   ├── Badge.tsx
│   │   ├── Heading.tsx
│   │   └── index.ts
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── sections/            # Page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── CTASection.tsx
│       └── index.ts
├── data/                    # Content data
│   └── content.json         # All website content
├── public/                  # Static assets
│   └── images/              # Image files
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## Key Principles

### 1. Content Management

All text content is stored in `/data/content.json`. This allows non-technical users to update content without touching code.

**Benefits:**
- Easy content updates
- No risk of breaking code
- Single source of truth
- Clear content structure

**Usage in Components:**
```tsx
import content from '@/data/content.json';

export default function Page() {
  const { hero, features } = content.home;
  
  return (
    <Hero title={hero.title} subtitle={hero.subtitle} />
  );
}
```

### 2. Component Architecture

#### UI Components (`/components/ui`)

Reusable, atomic components with consistent styling:

- `Button` - Call-to-action buttons with variants
- `Card` - Content containers with optional hover effects
- `Section` - Page sections with consistent spacing
- `Container` - Content width containers
- `Badge` - Labels and tags
- `Heading` - Typography with semantic levels

#### Layout Components (`/components/layout`)

Site-wide structural components:

- `Navbar` - Responsive navigation with mobile menu
- `Footer` - Site footer with links and contact info

#### Section Components (`/components/sections`)

Larger, composed sections used across pages:

- `Hero` - Large hero sections with CTAs
- `Features` - Feature grids with icons/images
- `CTASection` - Call-to-action sections

### 3. Responsive Design

Mobile-first approach using Tailwind's responsive utilities:

```tsx
<div className="text-base md:text-lg lg:text-xl">
  // Small devices: text-base
  // Medium devices (md:): text-lg
  // Large devices (lg:): text-xl
</div>
```

**Breakpoints:**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

### 4. Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for images

### 5. SEO Optimization

Each page exports metadata:

```tsx
export const metadata: Metadata = {
  title: content.page.meta.title,
  description: content.page.meta.description,
};
```

## Development Workflow

### Initial Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Adding a New Page

1. Create directory in `/app/`: `app/new-page/`
2. Create `page.tsx` inside it
3. Add content to `/data/content.json`:
   ```json
   "newPage": {
     "meta": { "title": "...", "description": "..." },
     "hero": { "title": "..." }
   }
   ```
4. Import and use content in your page
5. Add navigation link in `content.json` under `nav.items`

### Creating a New Component

1. Create file in appropriate directory (`ui/`, `layout/`, or `sections/`)
2. Define TypeScript interface for props
3. Export component as named export
4. Add to `index.ts` for easy imports
5. Use consistent styling with Tailwind

Example:
```tsx
interface MyComponentProps {
  title: string;
  description: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  description 
}) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
```

### Updating Content

1. Open `/data/content.json`
2. Find the section to update
3. Change the value
4. Save file
5. Changes reflect immediately in development

### Styling Guidelines

**Use Tailwind utility classes:**
```tsx
// ✅ Good
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">

// ❌ Avoid custom CSS when possible
<div className="custom-card">
```

**Consistent spacing:**
- Section padding: `py-16 md:py-24`
- Card padding: `p-6`
- Grid gaps: `gap-6` or `gap-8`

**Color scheme:**
- Primary: `text-primary-700`, `bg-primary-50`, etc.
- Accent: `text-accent-600`, `bg-accent-500`, etc.
- Gray scale: `text-gray-600`, `bg-gray-50`, etc.

## Building for Production

```bash
# Build the project
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

## Environment Variables

Create `.env.local` for local development:

```bash
# Example (add as needed)
NEXT_PUBLIC_API_URL=https://api.example.com
CONTACT_FORM_EMAIL=info@sportloodsoost.nl
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:
```tsx
import Image from 'next/image';

<Image 
  src="/images/gym.jpg" 
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
/>
```

### Code Splitting

Pages are automatically code-split by Next.js. For large components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## Testing

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works on mobile and desktop
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors
- [ ] Content is readable and correct

### JSON Validation

Always validate JSON before committing:
```bash
# Using jq (install: brew install jq)
jq . data/content.json
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on vercel.com
3. Vercel auto-detects Next.js
4. Deploy!

### Other Platforms

The project works on any platform supporting Node.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Custom Node.js server

Build command: `npm run build`
Output directory: `.next`
Start command: `npm start`

## Troubleshooting

### TypeScript Errors

```bash
# Check for type errors
npm run build
```

### JSON Syntax Errors

If the site breaks after editing JSON:
1. Validate JSON at jsonlint.com
2. Check for missing commas or quotes
3. Restore from backup if needed

### Styling Issues

1. Check Tailwind classes are correct
2. Verify responsive classes are applied
3. Clear cache: `rm -rf .next`

## Future Enhancements

Possible additions:
- Blog CMS integration (Contentful, Sanity)
- Member portal with authentication
- Online booking system
- Payment integration
- Newsletter signup
- Image gallery
- Video content
- Multi-language support

## Support

For questions or issues:
1. Check this documentation
2. Review Next.js docs: https://nextjs.org/docs
3. Tailwind docs: https://tailwindcss.com/docs
4. Contact the development team

## License

Private - © 2025 Sportloods Oost
