# MAURO RAMIREZ — PHOTOGRAPHY PORTFOLIO

A dark, editorial, image-driven photography portfolio designed for high-fashion, portraiture, street culture, and cinematic campaigns.

## Project Structure

```text
├── index.html          # Clean HTML shell (header, views container, lightbox, footer)
├── css/
│   └── style.css       # All editorial typography, grain overlay, buttons, and animations
├── js/
│   ├── config.js       # Site configuration: name, biography, email, locations, client lists
│   ├── projects.js     # Portfolio projects catalog, image registry, captions, and credits
│   └── app.js          # Core engine: routing, view rendering, lightbox, mobile menu, form
└── images/             # Folder containing your exported photos
```

## How to Modify

### 1. Update Personal Info & Biography
Open `js/config.js` to change your name, locations, bio, email, Instagram handle, and client list.

### 2. Upload Your Photos
1. Put your photos into the `images/` directory.
2. In `js/projects.js`, update the `ASSETS` dictionary to match your image file names:
   ```javascript
   const ASSETS = {
     HERO_NOIR: "images/my-hero-photo.jpg",
     PHOTOGRAPHER_ABOUT: "images/my-portrait.jpg",
     ...
   };
   ```

### 3. Add or Modify Projects
In `js/projects.js`, edit the `PROJECTS` array. To add a new project, simply copy an existing project object block and update its title, slug, category, year, cover image, and gallery images.

## Deploying to GitHub Pages

1. Push all files and folders (`index.html`, `css/`, `js/`, `images/`) to your GitHub repository on the `main` branch.
2. In GitHub, go to **Settings** → **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live in 1-2 minutes at `https://<username>.github.io/<repo-name>/`.
