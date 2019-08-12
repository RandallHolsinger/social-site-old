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
        maxAge: 10000000000
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

app.get('/api/post/:post_id', ctrl.getPost)

app.get('/api/user/posts', ctrl.getUserPosts)

//commment endpoints

app.get('/api/comments/:post_id', ctrl.getComments)

app.post('/api/comment/:post_id', ctrl.addComment)

//profile endpoints

app.get('/api/profiles', ctrl.getProfiles)

app.get('/api/user/profile', ctrl.getUserProfile)

app.get('/profile/view/:user_id', ctrl.getProfile)

app.put('/api/user/about', ctrl.updateAbout)

//friend endpoints

app.get('/api/friends', ctrl.getFriends)
 
app.post('/friends/request/:id', ctrl.addFriend)

app.get('/friends/pending', ctrl.getPendingFriends)

app.put('/api/friends/confirmed', ctrl.confirmFriend)

