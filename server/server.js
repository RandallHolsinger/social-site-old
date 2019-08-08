require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controllers')

app.use(express.json());

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000000
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('You are connected to the Database')
    
    app.listen(SERVER_PORT, ()=> console.log(`listening on Port: ${SERVER_PORT}`))
})

// auth endpoints

app.post('/auth/register', ctrl.register)

app.post('/auth/login', ctrl.login)

app.get('/auth/current', ctrl.getUser)

app.post('/auth/logout', ctrl.logout)

//Post endpoints

app.get('/api/getPosts', ctrl.getPosts)

app.post('/api/addPost', ctrl.addPost)