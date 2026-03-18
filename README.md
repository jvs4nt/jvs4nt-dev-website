# JVS4NT Dev Portfolio

Modern and animated personal portfolio built with pure HTML, CSS, and JavaScript.

## Overview

This is a static portfolio website focused on performance, visual polish, and smooth interactions.

Core sections:
- Hero
- About
- Projects
- Contact

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no framework)
- Formspree (for contact form email delivery)

## Features

- Responsive layout (desktop and mobile)
- Animated UI and section transitions
- Custom cursor for desktop devices
- Mobile-safe behavior (cursor effects disabled on touch devices)
- Contact form integration with Formspree
- Animated feedback modal for contact form success/error states
- Smooth scroll navigation

## Project Structure

- `index.html`: page structure and content
- `styles.css`: visual styling, layout, responsiveness, animations
- `script.js`: interactions, effects, form submission logic

## Run Locally

In the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Contact Form Setup (Formspree)

The form endpoint is configured in `index.html` on the contact form element:

```html
<form id="contactForm" data-form-endpoint="https://formspree.io/f/your_form_id">
```

Steps:
1. Create a form at Formspree.
2. Copy your endpoint (for example: `https://formspree.io/f/abc123xy`).
3. Replace the endpoint value in `index.html`.

## Deployment

Because this is a static site, you can deploy it directly on:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## Notes

- No Node.js backend is required for the current architecture.
- If you later add authentication, database, or custom APIs, then a backend (Node or serverless) can be introduced.

## Author

- João Santos
- GitHub: https://github.com/jvs4nt
- LinkedIn: https://linkedin.com/in/jvs4nt
- Email: jvs4nt.dev@gmail.com
