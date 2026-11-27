---
title: This portfolio
summary: Bilingual static site built with Astro and hand-written HTML, CSS and JavaScript. A perfect 100 in all four Lighthouse categories, with zero hosting cost.
status: en-desarrollo
order: 1
featured: true
stack: [Astro, HTML, CSS, JavaScript, Cloudflare Pages, GitHub Actions]
repo: https://github.com/mauroaguilar10/PTF
started: 2026-11-27
---

## Problem

I needed my own site to present my work with technical context, offer services and receive inquiries. It had four requirements:

- **Two languages** from day one, to work with clients in Argentina and abroad.
- **Top performance and SEO**, since most visits come from phones and search engines.
- **No servers to maintain** and no fixed infrastructure costs.
- **Growth without redesigns:** every new project has to be added without touching page code.

## Solution

A static site generated with Astro and served from Cloudflare's global network. Every page is compiled to HTML at build time, so the browser receives ready-to-render content without waiting for a framework to load.

Projects are Markdown files, one per language, validated against a schema. Adding a case study means adding two files: the project grid, the detail page, the sitemap and both language versions are generated automatically.

## Technical decisions

| Decision | Why | Alternative ruled out |
| --- | --- | --- |
| Astro in static mode | This is a content site, not an application. Generating HTML at build time gives the best load time and SEO, and ships no framework JavaScript to the browser. | React or Next.js: they add a runtime of hundreds of KB for an interface with almost no state. |
| Hand-written CSS with custom properties | Full control of the design and zero dependencies. Colors, type and spacing live in one file, and dark mode only swaps those variables. | Tailwind or Bootstrap: faster at first, but one more layer to maintain and a generic look. |
| Vanilla JavaScript | Only three behaviors are needed: light or dark theme, the mobile menu and form submission. Under 100 lines in total. | A component library, which would add weight without adding functionality. |
| Content collections with a schema | Every project is validated at build time. A missing field or an invalid status fails the build before anything is published. | Content written directly into pages: easier to break and harder to translate. |
| Native i18n routing | Spanish at `/` and English at `/en/`, with `hreflang` tags so search engines show the right language. UI strings are centralized in a single file. | Client-side translation: worse for SEO and causes a content flash on load. |
| Cloudflare Pages | Global CDN, automatic HTTPS, a deploy on every push and a preview URL for every pull request. | A VPS or WordPress: they need updates, security work and a monthly fee. |
| Web3Forms contact form | Receives inquiries without writing or maintaining a backend in the first version. Includes a honeypot field against bots. | A custom backend from the start, which arrives in the next stage as a serverless function with Cloudflare Turnstile. |
| CI with GitHub Actions | Every pull request builds the whole site, so a content or type error never reaches production. | Manual checks before each merge. |

## Challenges

**Two languages without duplicated code.** The obvious option was copying every page under `/en/`, which doubles maintenance. I split routing from content: files in `pages/` are three lines long and only pick the language, while the layout lives in shared views. A section is changed once and applies to both languages.

**Dark mode without a flash.** Applying the theme after the page loads shows a flash of the light theme. A tiny script in the `<head>` reads the saved preference, or the system one, before the browser paints.

**Accessible mobile menu.** The menu button reports its state with `aria-expanded`, every element has a visible focus style and colors meet minimum contrast in both themes.

## Results

- **Lighthouse (mobile): 100** in Performance, Accessibility, Best Practices and SEO.
- **Home page of about 4 KB** transferred, with content visible in 0.8 s in the Lighthouse run.
- **19 static pages** in two languages, with an automatically generated sitemap.
- **US$0 hosting.** The only cost is the domain.

## Next steps

- Replace Web3Forms with a custom endpoint with server-side validation and Cloudflare Turnstile.
- Run Lighthouse on every pull request in CI so performance cannot regress over time.
- Add the case studies for the real-time orders system and the AI lead agent.
