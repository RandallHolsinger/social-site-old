const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {

    //Auth Controllers
  register: async (req, res) => {
      console.log('hit')
      const {username, password, email, dob, city, state} = req.body;
      const {session} = req;
      const db = req.app.get('db')
      let takenUsername = await db.auth.check_username({username})
      takenUsername = +takenUsername[0].count;
      if(takenUsername !== 0){
          return res.sendStatus(409)
      }

      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      let user = await db.auth.register({username, password: hash, email, dob, city, state})
      user = user[0]
      session.user = user
      res.status(200).send(session.user)
  },
  
  login: async (req,res) => {
      const {username, password} = req.body;
      const {session} = req;
      const db = req.app.get('db')
      let user = await db.auth.login({username})
      user = user[0]
      if(!user){
          return res.sendStatus(401);
        }
        let authenticated = bcrypt.compareSync(password, user.password)
        if(authenticated){
            delete user.password;
            session.user = user
            console.log(session.user)
          res.status(200).send(session.user)
      } else {
          res.sendStatus(401)
      }
  },

  getUser: (req, res) => {
     const {user} = req.session;
     if(user) {
         res.status(200).send(user)
     } else {
         res.sendStatus(401)
     }
  },

  logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200)
  },

  //Thread Controllers

  getPosts: (req, res) => {
      db = req.app.get('db')
    
      db.threads.get_posts().then(threads => {
          res.status(200).send(threads)
      })
  },

  addPost: (req, res) => {
      db = req.app.get('db')
      const {body} = req.body
      console.log(req.body)
      db.threads.add_post([body.topicInput, body.threadInput]).then(() => res.sendStatus(200))
  }


}