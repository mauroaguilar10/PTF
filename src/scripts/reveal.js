// Hace aparecer suavemente los elementos con data-reveal cuando entran en pantalla.
const root = document.documentElement;

if (root.classList.contains('js-reveal')) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}
