// Menú desplegable en el celular.
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-menu]');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.toggleAttribute('data-open', !open);
});
