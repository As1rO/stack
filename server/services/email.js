const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendWelcomeEmail(email, name) {
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Bienvenue sur Notre Application!',
    text: `Bonjour ${name}, bienvenue sur notre application!`,
    html: `<strong>Bonjour ${name}, bienvenue sur notre application!</strong>`,
  }

  try {
    await sgMail.send(message)
    console.log('Email envoyé avec succès')
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = { sendWelcomeEmail }
