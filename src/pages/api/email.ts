import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.porkbun.com",
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "contact@springbankscience.co.uk",
      pass: "Lz&Uxw&zTqaV4tBB",
    },
  });

  let mailOptions = {
    from: "contact@springbankscience.co.uk",
    to: "contact@springbankscience.co.uk",
    subject: `Contact Form - Message from ${name}`,
    html: message,
  };

  try {
    const trans = transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("EMAIL SENT!");
      }
    });

    return new Response(
      JSON.stringify({
        message: "Success!",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log({ err });
    return new Response(
      JSON.stringify({
        message: "Email server error",
      }),
      { status: 500 }
    );
  }
};
