// api/contact.js — función serverless (Vercel)
import { Resend } from 'resend';
 
const resend = new Resend(process.env.RESEND_API_KEY);
 
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
 
  const { nombre, empresa, email, telefono, area, mensaje } = req.body;
 
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
 
  try {
    await resend.emails.send({
      from: 'Lex Metrópoli <onboarding@resend.dev>',
      to: 'alexahinojosa26@gmail.com',
      reply_to: email,
      subject: `Nueva consulta: ${area || 'Sin especificar'}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa || 'N/A'}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'N/A'}</p>
        <p><strong>Área de interés:</strong> ${area || 'N/A'}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
      `,
    });
 
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No se pudo enviar el correo' });
  }
}
