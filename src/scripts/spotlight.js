// Brillo que sigue al puntero dentro de las tarjetas (.spotlight).
// Solo guarda la posición en variables CSS; el efecto lo dibuja el CSS.
document.querySelectorAll('.spotlight').forEach((el) => {
  el.addEventListener('pointermove', (event) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});
