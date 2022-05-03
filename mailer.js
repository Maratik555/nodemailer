import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport(
    {
    pool: true,
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "lena777999@bk.ru",
      pass: "6EZD5KTMzVNgxYbntFk8",
    },
  },
  {
    from: "Nodemailer <lena777999@bk.ru>",
  }
)

transporter.verify((error, success) => {
    error ? console.log(error) :
     console.log('Server is ready to take our messages: ', success)
})

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err)
    console.log("Email sent: ", info)
  })
}

export default mailer
