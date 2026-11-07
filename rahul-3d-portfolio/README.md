# Rahul — AI Developer Portfolio

A responsive, light-first portfolio for Rahul, an AI developer and B.Tech student in Greater Noida, India. The app uses React, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis, and Lucide icons.

Each section is a separate React Router page: `/` is the home and doorway hub, followed by `/about`, `/skills`, `/projects`, `/experience`, and `/contact`.

## Run locally

```bash
cd rahul-3d-portfolio
npm install
npm run dev
```

The contact form opens a prefilled email draft in the visitor's default mail app. To set its recipient, create `.env.local` in this folder:

```env
VITE_CONTACT_EMAIL=you@example.com
```

Restart the dev server after changing environment variables. The form does not send messages through a backend.

## Build and preview

```bash
npm run build
npm run preview
```

## Project structure

```text
rahul-3d-portfolio/
  index.html
  package.json
  public/
    images/RAHUL.jpeg
  src/
    App.jsx                  App shell, loader, Lenis and GSAP setup
    index.css                Global styles and Tailwind import
    components/
        Portfolio.jsx          Route layout and portfolio sections
        DoorwayNav.jsx          3D doorway navigation on the home page
      SoftHero.jsx            Hero, role calendar, theme cord, ability modal
      SoftHero.css            Responsive light/dark theme and hero styles
      Scene3D.jsx             Three.js scene component
      vercel.json                SPA fallback for direct route loads
```

## Deploy to Vercel

1. Push this folder to a GitHub repository and import it in Vercel.
2. Select the **Vite** framework preset. Use `npm run build` as the build command and `dist` as the output directory.
3. Add `VITE_CONTACT_EMAIL` in **Project Settings → Environment Variables** if the contact form should address a specific email.
4. `vercel.json` rewrites direct section URLs to the Vite app entry, so reloads on routes such as `/skills` keep working.
5. Deploy. Vercel installs dependencies and builds the site automatically.

The pull-cord switches between light and dark themes and remembers the selection in local storage. Role-card motion and other animations honor `prefers-reduced-motion`.
