// Botón de modo claro / oscuro. Guarda la elección en localStorage.
const button = document.querySelector('[data-theme-toggle]');

button?.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    // modo privado: no pasa nada si no se guarda
  }
});
