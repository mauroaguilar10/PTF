import { defaultLang, routes, ui, type Lang, type RouteKey, type UiKey } from './ui';

/** Devuelve una función t('clave') con los textos del idioma pedido. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Ruta de una página en un idioma: path('projects', 'en') → '/en/projects'. */
export function path(key: RouteKey, lang: Lang): string {
  return routes[lang][key];
}

/** Ruta del caso de estudio de un proyecto en un idioma. */
export function projectPath(slug: string, lang: Lang): string {
  return `${routes[lang].projects}/${slug}`;
}

/** Idioma contrario, para el selector ES | EN. */
export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
