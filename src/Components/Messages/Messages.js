 import React, {Component} from 'react';
//  import axios from 'axios';
 import Header from '../Header/Header'

 class Messages extends Component {
     constructor(props) {
         super(props)

         this.state = {
             messages: [],
             messageInput: ''
         }
     }

     getMessages = () => {
        //  axios.get(`/api/user/messages/${id}`).then(res => {
        //      this.setState({
        //          messages: res.data
        //      })
        //  })
     }
     
     


     render() {
         return (
             <div className='Messages'>
             <Header />
             
             </div>
         )
     }
 }

 export default Messages