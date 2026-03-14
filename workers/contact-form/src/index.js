export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    // Validate required fields
    const { name, email, subject, message } = body;
    const turnstileToken = body["cf-turnstile-response"];

    if (!name || !name.trim() || name.length > 120) {
      return Response.json({ ok: false, error: "Invalid name" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (!subject || !subject.trim() || subject.length > 120) {
      return Response.json({ ok: false, error: "Invalid subject" }, { status: 400 });
    }
    if (!message || !message.trim() || message.length > 2000) {
      return Response.json({ ok: false, error: "Invalid message" }, { status: 400 });
    }
    if (!turnstileToken) {
      return Response.json({ ok: false, error: "Missing captcha token" }, { status: 400 });
    }

    // Verify Turnstile token
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: request.headers.get("CF-Connecting-IP"),
      }),
    });

    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return Response.json({ ok: false, error: "Captcha verification failed" }, { status: 403 });
    }

    // Send email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "A1 Lab Site <site@a1lab.com.br>",
        to: [env.CONTACT_EMAIL],
        reply_to: email.trim(),
        subject: `[Contato Site] ${subject.trim()}`,
        text: [
          `Nome: ${name.trim()}`,
          `Email: ${email.trim()}`,
          `Assunto: ${subject.trim()}`,
          "",
          message.trim(),
        ].join("\n"),
      }),
    });

    if (!emailRes.ok) {
      return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ ok: true });
  },
};
