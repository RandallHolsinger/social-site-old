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
         this.handleInput = this.handleInput.bind(this)
     }

     getMessages = () => {
        //  axios.get(`/api/user/messages/${id}`).then(res => {
        //      this.setState({
        //          messages: res.data
        //      })
        //  })
     }

     handleInput(e) {
         this.setState({
             messageInput: e.target.value
         })
     }
     
     


     render() {
         return (
             <div className='Messages'>
             <Header />
             <input 
               onChange={this.handleInput}
               value={this.state.messageInput}
             />
             
             </div>
         )
     }
 }

 export default Messages