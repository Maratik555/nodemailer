import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import mailer from './mailer.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let user = undefined

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/register', (req, res) => { 
    if(!req.body.email || !req.body.pass) return res.sendStatus(400)   
    const message = {        
        to: req.body.email,
        subject: 'Congratulations! You are successfully registred on our site',
        html: `
        <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
        <i>данные вашей учетной записи:</i>
        <ul>
        <li>login: ${req.body.email}</li>
        <li>password: ${req.body.pass}</li>
        </ul>  
 ${req.body.promo ? `Вы подписаны на рассылку наших акций и предложений,
        чтобы отписаться от рассылки перейдите по ссылке
        <a href="http://localhost:3001/unsubscribe/${req.body.email}">отписаться от рассылки</a>` : ''}
        <p>Данное письмо не требует ответа.</p>`
    }
    mailer(message) 
    user = req.body 
    res.redirect('/register')   
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
  
app.get('/register', (req, res) => { 
    if(typeof user !== 'object') return res.sendFile(__dirname + '/register.html')   
    res.send(`Регистрация прошла успешно! Данные учетной записи отправлены на email: ${user.email}`) 
    user = undefined  
})

app.get('/unsubscribe/:email', (req, res) => {
    console.log(`${req.params.email} unsubscribed`)
    res.send(`Ваш email: ${req.params.email} удален из списка рассылки!`)
})

app.listen(3001, () => console.log(chalk.bold.bgBlue(`server started 3001`)))