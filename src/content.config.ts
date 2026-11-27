import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un archivo .md por proyecto y por idioma:
//   src/content/projects/es/saas-pedidos.md
//   src/content/projects/en/saas-pedidos.md
// Astro valida este esquema al compilar: si falta un campo, el build falla y te avisa.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['idea', 'en-desarrollo', 'publicado']),
    order: z.number(),
    featured: z.boolean().default(false),
    stack: z.array(z.string()),
    repo: z.url().optional(),
    demo: z.url().optional(),
    started: z.coerce.date().optional(),
  }),
});

export const collections = { projects };
