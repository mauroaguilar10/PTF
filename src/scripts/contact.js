// Envía el formulario de contacto a Web3Forms con fetch, sin recargar la página.
// En la etapa 3 vas a cambiar la URL por tu propio endpoint: /api/contact
const form = document.querySelector('[data-contact-form]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = form.querySelector('[data-status]');
  const button = form.querySelector('button[type="submit"]');
  const msg = form.dataset;

  if (!form.querySelector('[name="access_key"]')?.value) {
    status.textContent = msg.nokey;
    status.dataset.state = 'error';
    return;
  }

  button.disabled = true;
  status.textContent = msg.sending;
  status.dataset.state = '';

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message);
    form.reset();
    status.textContent = msg.ok;
    status.dataset.state = 'ok';
  } catch {
    status.textContent = msg.error;
    status.dataset.state = 'error';
  } finally {
    button.disabled = false;
  }
});
