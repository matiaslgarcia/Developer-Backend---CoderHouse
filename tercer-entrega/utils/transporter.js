import nodemailer from 'nodemailer'
import {htmlToText} from 'nodemailer-html-to-text'

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
transporter.use('compile', htmlToText());
export default transporter