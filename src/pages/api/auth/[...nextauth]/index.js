import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';


const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.SENDGRID_SMTP_SERVER_HOST,
        port: process.env.SENDGRID_SMTP_SERVER_PORT,
        auth: {
          user: process.env.SENDGRID_SMTP_SERVER_USER,
          pass: process.env.SENDGRID_SMTP_SERVER_PASSWORD,
        }
      },
      from: process.env.EMAIL_FROM,     
    })
  ],
  database: process.env.DB_CONNECT_URL
}

export default function (req, res) {
  return NextAuth(req, res, options)
}