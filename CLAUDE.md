# Contexto para Claude Code

Portfolio personal de Mauro Aguilar (estudiante de Ingeniería de Software, Argentina). Objetivo: aprender, mostrar proyectos y conseguir clientes freelance.
El usuario escribe en español rioplatense; respondé en español.

## Decisiones tomadas

- Astro estático, sin frameworks de UI: HTML, CSS y JavaScript escritos a mano. No agregar React, Tailwind ni librerías de componentes.
- Bilingüe desde el inicio: español en `/` e inglés en `/en/`. Todo texto fijo va en `src/i18n/ui.ts` con las dos traducciones.
- Páginas finas en `src/pages/`; el contenido vive en `src/views/` y se comparte entre idiomas.
- Proyectos como content collection: `src/content/projects/{es,en}/<slug>.md`, mismo slug en ambos idiomas.
- Hosting: Cloudflare Pages. Dominio previsto: mauroaglr.com (alternativa mauroaglr.dev).
- Formulario: Web3Forms al inicio (`PUBLIC_WEB3FORMS_KEY`); en la etapa 3 se reemplaza por `functions/api/contact.js` con Turnstile y Resend.
- Analítica: Cloudflare Web Analytics (sin cookies).

## Orden de proyectos

1. Este portfolio.
2. SaaS de gestión de negocio con pedidos en tiempo real (repo y deploy propios, en app.mauroaglr.com).
3. Agente de IA que cualifica leads, como módulo CRM dentro del SaaS.
4. Segundo cerebro / panel personal (privado; solo caso de estudio).

Cada proyecto entra al portfolio como un `.md` por idioma, con estado `idea`, `en-desarrollo` o `publicado`.

## Etapas del portfolio

- Etapa 0: esqueleto y deploy de prueba en mauroaglr.pages.dev.
- Etapa 1 (2 a 3 semanas): diseño propio, Inicio, Proyectos, Sobre mí, Contacto funcionando, responsive, modo oscuro, en los dos idiomas.
- Etapa 2 (1 semana): dominio, SEO (sitemap, Open Graph, JSON-LD, Search Console), analítica, Servicios con 2 paquetes (landing page; sitio web profesional) y precios investigados.
- Etapa 3: endpoint de contacto propio y CI con Lighthouse.
- Etapa 4: casos de estudio de cada proyecto, blog bilingüe.

## Forma de trabajar

- Mauro quiere aprender: explicá el porqué de cada cambio y preferí que él escriba el código cuando lo pida.
- Antes de dar algo por terminado, corré `npm run build`.
- Mobile first y accesible: HTML semántico, foco visible, contraste suficiente.
