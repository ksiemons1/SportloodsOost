# Content Management Guide

## Overview

All text content for the Sportloods Oost website is stored in `/data/content.json`. This makes it easy for content writers to update the website without touching any code.

## Editing Content

### Step 1: Open the Content File

Navigate to `/data/content.json` in your code editor.

### Step 2: Find the Section You Want to Edit

The JSON file is organized hierarchically by page and section:

```
{
  "site": { ... },          // Global site information
  "nav": { ... },           // Navigation menu
  "home": { ... },          // Home page content
  "about": { ... },         // About Us page
  "offerings": { ... },     // Offerings page
  "tarieven": { ... },      // Pricing page
  "openingstijden": { ... },// Opening times
  "blog": { ... },          // Blog page
  "contact": { ... },       // Contact page
  "login": { ... },         // Login page
  "footer": { ... },        // Footer content
  "common": { ... }         // Common labels/buttons
}
```

### Step 3: Edit the Text

Simply change the value of the property you want to update. For example:

**Before:**
```json
"home": {
  "hero": {
    "title": "Train in een Authentieke Luchtmachtloods"
  }
}
```

**After:**
```json
"home": {
  "hero": {
    "title": "Your New Title Here"
  }
}
```

### Step 4: Save and Test

1. Save the `content.json` file
2. If running in development mode (`npm run dev`), changes will appear immediately
3. Refresh your browser to see the updates

## Common Tasks

### Updating Site Information

```json
"site": {
  "name": "Sportloods Oost",
  "phone": "+31 (0)24 123 4567",
  "email": "info@sportloodsoost.nl",
  "address": {
    "street": "Oude Kleefsebaan 1",
    "city": "Nijmegen",
    "postal": "6572 AA"
  }
}
```

### Adding/Removing Navigation Items

```json
"nav": {
  "items": [
    { "label": "Home", "href": "/" },
    { "label": "New Page", "href": "/new-page" }
  ]
}
```

### Updating Pricing

```json
"tarieven": {
  "memberships": {
    "items": [
      {
        "name": "Onbeperkt",
        "price": "€89",
        "period": "per maand",
        "features": [
          "Feature 1",
          "Feature 2"
        ]
      }
    ]
  }
}
```

### Changing Opening Hours

```json
"openingstijden": {
  "hours": {
    "schedule": [
      { "day": "Maandag", "hours": "06:00 - 22:00" }
    ]
  }
}
```

## Important Notes

### ⚠️ JSON Syntax Rules

1. **Always use double quotes** (`"`) for strings, never single quotes
2. **No trailing commas** - the last item in a list should NOT have a comma
3. **Escape special characters** - use `\"` for quotes inside strings
4. **Test your changes** - invalid JSON will break the site

### ✅ Valid JSON Example

```json
{
  "title": "This is correct",
  "items": [
    "First item",
    "Second item"
  ]
}
```

### ❌ Invalid JSON Examples

```json
{
  "title": 'Wrong quotes',  // ❌ Use double quotes
  "items": [
    "First item",
    "Second item",  // ❌ Remove trailing comma
  ],  // ❌ Remove trailing comma
}
```

## Adding Images

Image paths are stored in the JSON file. To update an image:

1. Place your new image in `/public/images/`
2. Update the path in JSON: `"image": "/images/your-image.jpg"`

Example:
```json
"hero": {
  "image": "/images/hero-gym.jpg"
}
```

## Meta Descriptions (SEO)

Each page has a `meta` section for search engine optimization:

```json
"home": {
  "meta": {
    "title": "Page Title - Appears in Browser Tab",
    "description": "Description that appears in search results"
  }
}
```

**Best Practices:**
- Titles: 50-60 characters
- Descriptions: 150-160 characters
- Include relevant keywords
- Make them compelling and unique

## Testing Your Changes

### Option 1: Online JSON Validator

Before saving, paste your JSON into https://jsonlint.com/ to check for errors.

### Option 2: Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and check your changes. If you see an error, check the browser console for details.

## Getting Help

If you encounter issues:

1. Check your JSON syntax at https://jsonlint.com/
2. Look for error messages in the browser console (F12)
3. Make sure all brackets `{}` and `[]` are properly closed
4. Verify all quotes are double quotes `""`

## Backup

Before making major changes, copy the entire `content.json` file as a backup:

```bash
cp data/content.json data/content.backup.json
```

This way you can always restore the original if something goes wrong.
