---
title: Este portfolio
summary: Sitio bilingüe y estático construido con Astro, HTML, CSS y JavaScript propios. 100 en las cuatro categorías de Lighthouse y sin costo de hosting.
status: en-desarrollo
order: 1
featured: true
stack: [Astro, HTML, CSS, JavaScript, Cloudflare Pages, GitHub Actions]
repo: https://github.com/mauroaguilar10/PTF
started: 2026-11-27
---

## Problema

Necesitaba un sitio propio para presentar mi trabajo con contexto técnico, ofrecer servicios y recibir consultas. Tenía cuatro requisitos:

- **Dos idiomas** desde el primer día, para trabajar con clientes de Argentina y del exterior.
- **Rendimiento y SEO altos**, porque la mayoría de las visitas llegan desde el celular y desde buscadores.
- **Sin servidores que mantener** ni costos fijos de infraestructura.
- **Que crezca sin rediseños:** cada proyecto nuevo tiene que sumarse sin tocar el código de las páginas.

## Solución

Un sitio estático generado con Astro y publicado en la red global de Cloudflare. Cada página se compila a HTML en el momento del build, así que el navegador recibe contenido listo para mostrar, sin esperar a que cargue un framework.

Los proyectos son archivos Markdown, uno por idioma, validados con un esquema. Sumar un caso de estudio es agregar dos archivos: la grilla de proyectos, la página de detalle, el sitemap y las versiones en cada idioma se generan solos.

## Decisiones técnicas

| Decisión | Por qué | Alternativa descartada |
| --- | --- | --- |
| Astro en modo estático | Es un sitio de contenido, no una aplicación. Generar HTML en el build da el mejor tiempo de carga y SEO, y no envía JavaScript de framework al navegador. | React o Next.js: suman un runtime de cientos de KB para una interfaz que casi no tiene estado. |
| CSS propio con variables | Control total del diseño y cero dependencias. Los colores, la tipografía y los espacios viven en un solo archivo, y el modo oscuro cambia solo esas variables. | Tailwind o Bootstrap: aceleran al principio, pero agregan una capa más que mantener y un aspecto genérico. |
| JavaScript vanilla | Solo hacen falta tres comportamientos: tema claro u oscuro, menú en el celular y envío del formulario. Son menos de 100 líneas en total. | Una librería de componentes, que agregaría peso sin aportar funcionalidad. |
| Content collections con esquema | Cada proyecto se valida al compilar. Si falta un campo o un estado no es válido, el build falla antes de publicar. | Contenido escrito directo en las páginas: más fácil de romper y más difícil de traducir. |
| Ruteo i18n nativo | Español en `/` e inglés en `/en/`, con etiquetas `hreflang` para que los buscadores muestren el idioma correcto. Los textos de interfaz están centralizados en un solo archivo. | Traducción en el navegador: peor para SEO y con un parpadeo de contenido al cargar. |
| Cloudflare Pages | CDN global, HTTPS automático, deploy en cada push y una URL de vista previa por cada pull request. | Un VPS o WordPress: requieren actualizaciones, seguridad y costo mensual. |
| Formulario con Web3Forms | Permite recibir consultas sin escribir ni mantener un backend en la primera versión. Incluye un campo trampa contra bots. | Un backend propio desde el inicio, que se suma en la siguiente etapa con una función serverless y Cloudflare Turnstile. |
| CI con GitHub Actions | Cada pull request compila el sitio completo. Un error de contenido o de tipos no llega a producción. | Revisar a mano antes de cada merge. |

## Desafíos

**Dos idiomas sin duplicar código.** La primera opción era copiar cada página en `/en/`, lo que duplica el mantenimiento. Separé la ruta del contenido: los archivos de `pages/` tienen tres líneas y solo eligen idioma, y el diseño vive en vistas compartidas. Cambiar una sección se hace una vez y aplica a los dos idiomas.

**Modo oscuro sin parpadeo.** Si el tema se aplica después de cargar la página, se ve un destello del tema claro. Lo resolví con un script mínimo en el `<head>` que lee la preferencia guardada, o la del sistema, antes de que el navegador pinte la página.

**Accesibilidad del menú en el celular.** El botón del menú comunica su estado con `aria-expanded`, todos los elementos tienen foco visible y los colores cumplen el contraste mínimo en los dos temas.

## Resultado

- **Lighthouse (móvil): 100** en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- **Página de inicio de unos 4 KB** transferidos, con el contenido visible en 0,8 s en la prueba de Lighthouse.
- **19 páginas** estáticas en dos idiomas, con sitemap generado automáticamente.
- **US$0 de hosting.** El único costo es el dominio.

## Próximos pasos

- Reemplazar Web3Forms por un endpoint propio con validación del lado del servidor y Cloudflare Turnstile.
- Medir Lighthouse en cada pull request dentro del CI, para que el rendimiento no baje con el tiempo.
- Sumar los casos de estudio del sistema de pedidos en tiempo real y del agente de IA para leads.
