# Sportloods Oost - Image Assets

This directory contains all images for the website.

## Image Requirements

### Recommended Formats
- **JPEG/JPG** for photos (smaller file size)
- **PNG** for graphics with transparency
- **WebP** for modern browsers (best compression)

### Recommended Sizes

#### Hero Images
- **Dimensions:** 1920x1080px (16:9 ratio)
- **Max file size:** 500KB
- **Usage:** Homepage hero, page headers

#### Feature/Card Images
- **Dimensions:** 800x600px (4:3 ratio)
- **Max file size:** 300KB
- **Usage:** Feature cards, program showcases

#### Founder/Team Photos
- **Dimensions:** 600x800px (3:4 ratio)
- **Max file size:** 200KB
- **Usage:** About page, team members

#### Thumbnails
- **Dimensions:** 400x300px
- **Max file size:** 100KB
- **Usage:** Blog posts, small cards

## Current Placeholders

Replace these placeholder paths with your actual images:

### Home Page
- `/images/hero-gym.jpg` - Main hero image (gym interior)
- `/images/hangar.jpg` - Hangar/building exterior
- `/images/physio.jpg` - Physiotherapy/medical fitness
- `/images/youth.jpg` - Youth training

### About Page
- `/images/founder-mark.jpg` - Mark van der Berg
- `/images/founder-lisa.jpg` - Lisa Jansen

### Offerings Page
- `/images/functional-training.jpg` - Functional training class
- `/images/personal-training.jpg` - One-on-one training
- `/images/small-group.jpg` - Small group training
- `/images/weightlifting.jpg` - Olympic weightlifting
- `/images/youth-training.jpg` - Youth training class
- `/images/medical-fitness.jpg` - Medical fitness/recovery

## Adding New Images

1. **Optimize images** before uploading
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Aim for good quality at minimum file size

2. **Name files descriptively**
   - Use lowercase
   - Use hyphens, not spaces
   - Example: `functional-training-class-1.jpg`

3. **Place in this directory**
   - `/public/images/your-image.jpg`

4. **Update content.json**
   ```json
   "image": "/images/your-image.jpg"
   ```

## Free Stock Photo Sources

If you need placeholder images:
- **Unsplash:** https://unsplash.com/ (gym, fitness, training)
- **Pexels:** https://pexels.com/
- **Pixabay:** https://pixabay.com/

Search terms:
- "gym interior"
- "functional training"
- "weight lifting"
- "group fitness"
- "personal trainer"
- "youth sports"

## Image Optimization Tools

- **Online:** 
  - Squoosh: https://squoosh.app/
  - TinyPNG: https://tinypng.com/
  
- **Desktop:**
  - ImageOptim (Mac)
  - RIOT (Windows)

## Best Practices

1. **Always include alt text** in content.json for accessibility
2. **Compress images** before uploading
3. **Use appropriate format** (JPEG for photos, PNG for graphics)
4. **Test on mobile** to ensure images load quickly
5. **Backup originals** before optimizing
