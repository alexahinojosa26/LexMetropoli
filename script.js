function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

// Envío del formulario de contacto a la función serverless (api/contact.js)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const data = Object.fromEntries(new FormData(contactForm).entries());

    status.textContent = 'Enviando...';
    status.style.color = 'var(--light)';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Fallo el envío');

      status.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
      status.style.color = '#1ebe5d';
      contactForm.reset();
    } catch (err) {
      status.textContent = 'Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.';
      status.style.color = '#c0392b';
    }
  });
}
