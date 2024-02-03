const sgMail = require('@sendgrid/mail')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const { EmailError } = require('../errors')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(templatePath, emailData, userEmail, subject) {
  try {
    const fullPath = path.join(__dirname, templatePath)
    const template = fs.readFileSync(fullPath, 'utf8')
    const htmlContent = ejs.render(template, emailData)

    const message = {
      to: userEmail,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: subject,
      html: htmlContent,
    }

    await sgMail.send(message)
    console.log('Email envoyé avec succès')
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error)
    if (error.response) {
      console.error(error.response.body)
    }
    throw new EmailError('send email error')
  }
}

module.exports = { sendEmail }
