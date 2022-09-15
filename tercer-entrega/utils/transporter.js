import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'matiasgarcia444@gmail.com',
    pass: 'btxcfpwywxrlqgcu'
  },
  tls: {
    rejectUnauthorized: false
  }
});

export default transporter