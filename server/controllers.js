const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {

    //Auth Controllers
  register: async (req, res) => {
      const {username, password, email, dob, city, state, defaultImage} = req.body;
      const {session} = req;
      const db = req.app.get('db')
      let takenUsername = await db.auth.check_username({username})
      takenUsername = +takenUsername[0].count;
      if(takenUsername !== 0){
          return res.sendStatus(409)
      }

      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      let user = await db.auth.register({username, password: hash, email, dob, city, state, defaultImage})
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

  //Post Controllers

  getPosts: (req, res) => {
      db = req.app.get('db')
    
      db.posts.get_posts().then(posts => {
          res.status(200).send(posts)
      })
  },

  getPost: (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    db.posts.get_post([post_id]).then(post => {
        res.status(200).send(post)
    })


  },

  addPost: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {postInput} = req.body
      
      db.posts.add_post([user_id, postInput]).then(() => res.sendStatus(200))
  },

  getComments: (req, res) => {
      db = req.app.get('db')
      const {post_id} = req.params
      console.log('hitting', req.params)

      db.comments.get_comments([post_id]).then(comments => {
          res.status(200).send(comments)
      })
  },

  addComment: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {commentInput} = req.body
      const {post_id} = req.params

      db.comments.add_comment([user_id, post_id, commentInput]).then(() => res.sendStatus(200))
  }
}