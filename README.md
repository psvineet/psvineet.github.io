# Vineet Pratap Singh — Portfolio

A single-file personal portfolio website built with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no backend.

Live site: https://psvineet.github.io/

## Overview

This repository contains the source for my personal portfolio, showcasing my background in pharmacy (B.Pharm, AKTU Lucknow), software development, and cybersecurity. The entire site is a single `index.html` file with inline CSS and JavaScript, deployed via GitHub Pages.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 with custom properties (no preprocessor) |
| Scripting | Vanilla JavaScript (ES6+), no npm dependencies |
| Fonts | Google Fonts — Inter, Manrope, JetBrains Mono |
| PDF generation | jsPDF, loaded on demand from a CDN |
| Live data | GitHub REST API (public, unauthenticated) |
| Audio | Web Audio API |
| Hosting | GitHub Pages |

There is no build step. The only external runtime dependency is jsPDF, and it only loads if a visitor requests a resume and no static PDF file is present in the repository.

## Features

### Navigation

- Full-page scroll-snap layout with seven sections: Intro, Education, Achievements, Skills, Certifications, Projects, and Blog
- Fixed sidebar navigation on desktop; a floating pill-style navigation bar on mobile
- Section indicator dots on desktop for quick navigation
- Keyboard shortcuts: arrow keys or J/K to move between sections, Home/End to jump to the first or last section, T to toggle the theme, ? to open a shortcuts reference, and Esc to close any open modal
- Horizontal swipe gestures on mobile for section navigation, tuned to avoid interfering with normal vertical scrolling
- Scroll-triggered fade-in animations using the Intersection Observer API

### Theming

- Light and dark mode, following system preference by default and overridable by the user, with the choice persisted in local storage
- Five accent color presets, each with separate light and dark variants
- Theme changes use the View Transitions API for a circular reveal animation, with a crossfade fallback for browsers that do not support it
- Theme and accent color are applied before first paint to avoid a flash of incorrect styling

### Content Sections

- Timeline-based layout for education and achievements, with tag labels for quick scanning
- A skills grid organized into four categories: cybersecurity, web development, pharmacy coursework, and tools
- A certifications list rendered from a data array, tagged by issuing platform, with a subtle tilt effect on hover
- A projects list combining manually curated entries with public repositories fetched live from the GitHub API, deduplicated and filtered by a configurable list
- A blog section with client-side search and date filtering, and an in-page reader that loads posts in an iframe with a fallback for sites that block embedding

### Interactive Details

- An animated cursor and a beating favicon, both synchronized to a shared timer
- An optional ambient audio track generated with the Web Audio API, with no external audio files
- A parallax tilt effect on project and certification rows, disabled on touch devices and when the user has requested reduced motion
- A typewriter-style tagline in the introduction section that adjusts its greeting based on the time of day
- A hidden keyboard shortcut that triggers a small animation as an easter egg

### Resume Handling

The resume button first checks for a static `resume.pdf` file in the repository. If one is not found, the site generates a PDF on the fly from the page's own content using jsPDF, which is loaded only at that point.

### Contact

Clicking the email link opens a modal with a pre-filled subject and message, along with buttons to copy the email address, subject, or message individually. Submitting opens the visitor's own email client through a mailto link. There is no third-party form service and no server-side component.

### Search Engine and Social Sharing Metadata

The site includes complete Open Graph and Twitter Card metadata, JSON-LD structured data for a Person and a WebSite, a canonical URL, and an installable PWA manifest.

### Client-Side Content Deterrents

The site includes some measures intended to discourage casual copying, such as disabling right-click, text selection, and common browser shortcuts for viewing source or saving the page. These are not security measures and can be bypassed by anyone with basic technical knowledge; they exist only as a mild deterrent, not as protection.

## Project Structure

```
.
├── index.html      Markup, styles, and scripts in a single file
├── resume.pdf      Optional static resume; a PDF is generated if this is absent
├── og-cover.png    Optional social preview image
└── README.md
```

## Running Locally

No build tools are required.

```
git clone https://github.com/psvineet/psvineet.github.io.git
cd psvineet.github.io
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Opening `index.html` directly from the filesystem will work for most of the site, but the GitHub API integration and service worker registration require a server origin rather than the `file://` protocol.

## Usage and Attribution

This repository may be used as a reference or starting point for your own portfolio. If you do so, please replace all personal content before publishing, including but not limited to:

- Name, biography, and introduction text
- Email address and social media links
- Education, achievement, certification, and project entries
- The GitHub username referenced in the API call that fetches repositories
- Favicon, social preview image, and any other identifying media
- The JSON-LD structured data, canonical URL, and PWA manifest details
- The resume file

The code, layout, and interaction patterns in this repository are open to reuse without requiring prior permission. The personal content — my name, biography, credentials, project descriptions, and any identifying detail — is not intended for reuse and should be fully replaced before any deployment based on this repository.

## Author

Vineet Pratap Singh
B.Pharm student, AKTU Lucknow — developer and cybersecurity learner

- GitHub: https://github.com/psvineet
- LinkedIn: https://linkedin.com/in/psvineet
- TryHackMe: https://tryhackme.com/p/psvineet
