const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {

    //Auth Controllers
  register: async (req, res) => {
      const {username, password, email, defaultImage} = req.body;
      const {session} = req;
      const db = req.app.get('db')
      let takenUsername = await db.auth.check_username({username})
      takenUsername = +takenUsername[0].count;
      if(takenUsername !== 0){
          alert('username is taken!')
          return res.sendStatus(409)
      }

      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      let user = await db.auth.register({username, password: hash, email, defaultImage})
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
      }).catch( err => {
          res.status(500).send({errorMessage: 'Something went wrong getting posts'})
          console.log(err)
      })
  },

  getPost: (req, res) => {
    const db = req.app.get('db')
    const {post_id} = req.params

    db.posts.get_post([post_id]).then(post => {
        res.status(200).send(post)
    }).catch(err => {
        res.status(500).send({errorMessage: 'someting went wrong getting post'})
        console.log(err)
    })


  },

  addPost: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {data} = req.body
      
      db.posts.add_post([user_id, data]).then(() => res.sendStatus(200))
      .catch(err => {
          res.status(500).send({errorMessage: 'something went wrong adding a post'})
          console.log(err)
      })
  },

  getUserPosts: (req, res) => {
     db = req.app.get('db')
     const {user_id} = req.session.user

     db.posts.get_user_posts([user_id]).then(posts => {
         res.status(200).send(posts)
     }).catch(err => {
         res.status(500).send({errorMessage: "something went wrong getting user's post"})
         console.log(err)
     })
  },

  //Comments controllers

  getComments: (req, res) => {
      db = req.app.get('db')
      const {post_id} =  req.params

      db.comments.get_comments([post_id]).then(comments => {
          res.status(200).send(comments)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong getting comments'})
          console.log(err)
      })
  },

  addComment: (req, res) => {
    db = req.app.get('db')
    const {user_id} = req.session.user
    const {postId, commentInput} = req.body

    db.comments.add_comment([user_id, postId, commentInput]).then(() => res.sendStatus(200))
    .catch(err => {
        res.status(500).send({errorMessage: 'something went wrong adding a comment'})
    })
  },

  //Profile Controllers
  getProfiles: (req, res) => {
     db = req.app.get('db')

     db.profile.get_profiles().then(profiles => {
         res.status(200).send(profiles)
     }).catch(err => {
         res.status(500).send({errorMessage: 'something went wrong get profiles'})
         console.log(err)
     })
  },

  getUserProfile: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user

      db.profile.get_user_profile([user_id]).then(profile => {
          res.status(200).send(profile)
      }).catch(err => {
          res.statuss(500).send({errorMessage: 'something went wrong getting user profile'})
          console.log(err)
      })
  },

  getProfile: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.params

      db.profile.get_profile([user_id]).then(profile => {
          res.status(200).send(profile)
      }).catch(err => {
          res.status(500).send({errorMessage: "something went wrong get the user's profile"})
          console.log(err)
      })
  },

  updateAbout: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {aboutInput} = req.body

      db.profile.update_about([aboutInput, user_id]).then(() => res.sendStatus(200))
      .catch(err => {
          res.status(500).send({errorMessage: 'somehing went wrong trying to update about'})
          console.log(err)
      })
  },
  
  //Friends Controllers
  getFriends: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user

      db.friends.get_friends([user_id]).then(friends => {
          res.status(200).send(friends)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong getting friends'})
          console.log(err)
      })
  },

  addFriend: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {id} = req.body

      db.friends.add_friend([user_id, id]).then(() => res.sendStatus(200))
      .catch(err => {
          res.status(500).send({errorMessage: 'something went wrong adding friend'})
          console.log(err)
      })
  },

  getPendingFriends: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
     
      db.friends.get_pending([user_id]).then(pending => {
          res.status(200).send(pending)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong getting friend requests'})
          console.log(err)
      })
      
  },

  confirmFriend: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.body
     
      db.friends.confirm_friend([user_id]).then(() => res.sendStatus(200))
      .catch(err => {
          res.status(500).send({errorMessage: 'something went wrong confirming friend request'})
          console.log(err)
      })
  },

  //Messages Controllers
  getMessages: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user

      db.messages.get_messages([user_id]).then(messages => {
          res.status(200).send(messages)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong with getting messages'})
          console.log(err)
      })
  },

  getFriendMessages: (req,res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {friendUserId} = req.params

      db.messages.get_friend_messages([user_id, friendUserId]).then(messages => {
          res.status(200).send(messages)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong getting friend messages'})
          console.log(err)
      })
  },

  sendMessage: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {user_id2, subject, message} = req.body

      db.messages.send_message([user_id, user_id2, subject, message]).then(() => res.sendStatus(200))
      .catch(err => {
          res.status(500).send({errorMessage: 'somthing went wrong sending a message'})
          console.log(err)
      })
  },

  getMessageReplies: (req, res) => {
      db = req.app.get('db')
      const {message_id} = req.params

      db.messages.get_message_replies([message_id]).then(replies => {
          res.status(200).send(replies)
      }).catch(err => {
          res.status(500).send({errorMessage: 'something went wrong getting message replies'})
          console.log(err)
      })
  },
  addReply: (req, res) => {
      db = req.app.get('db')
      const {user_id} = req.session.user
      const {messageId, replyInput} = req.body

      db.messages.add_reply_message([user_id, messageId, replyInput]).then((res.sendStatus(200)))
      .catch(err => {
          res.status(500).send({errorMessage: 'something went wrong sending a reply message'})
          console.log(err)
      })
  }
}