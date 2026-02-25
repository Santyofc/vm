import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const appOrigin =
  process.env.AUTH_EMAIL_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://cita.localhost:3000"
    : "https://cita.zonasurtech.online");

function buildUrl(pathname: string, token: string) {
  const url = new URL(pathname, appOrigin);
  url.searchParams.set("token", token);
  return url.toString();
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = buildUrl("/verify", token);

  await resend.emails.send({
    from: "ZONA SUR TECH <notification@zonasurtech.online>",
    to: email,
    subject: "Verifica tu cuenta de Zona Sur Tech",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Verifica tu cuenta</h1>
        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 24px;">
          Gracias por registrarte en Zona Sur Tech. Haz clic en el siguiente boton para verificar tu correo y activar tu cuenta.
        </p>
        <a href="${confirmLink}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Verificar Cuenta
        </a>
        <p style="color: #9ca3af; font-size: 14px; margin-top: 24px;">
          Si no creaste esta cuenta, puedes ignorar este correo.
        </p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = buildUrl("/recuperar", token);

  await resend.emails.send({
    from: "ZONA SUR TECH <notification@zonasurtech.online>",
    to: email,
    subject: "Restablece tu contrasena - Zona Sur Tech",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Restablecer contrasena</h1>
        <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 24px;">
          Has solicitado restablecer tu contrasena. Haz clic en el boton de abajo para continuar.
        </p>
        <a href="${resetLink}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Restablecer Contrasena
        </a>
        <p style="color: #9ca3af; font-size: 14px; margin-top: 24px;">
          Si no solicitaste este cambio, puedes ignorar este correo.
        </p>
      </div>
    `,
  });
};
