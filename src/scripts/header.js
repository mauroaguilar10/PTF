// Marca el header cuando la página se desplaza, para darle fondo y borde.
const header = document.querySelector('[data-header]');
const update = () => header?.toggleAttribute('data-scrolled', window.scrollY > 8);
update();
window.addEventListener('scroll', update, { passive: true });
