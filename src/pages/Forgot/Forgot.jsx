import React from 'react'
import './Forgot.css'
import Nav from '../../components/Nav/Nav'
const Forgot = () => {
  return (
    <div>
      <Nav/>

      <div className="forgot">
        <h2>Passoword Reset</h2>
        <h4>To Reset Your Password , Kindly Provide the below details.</h4>
         <input type="email"  placeholder='Enter Email For Password Reset'/>

         <p>You will get a link to reset your passoword to the above provided mail id</p>

         <button>Send</button>
      </div>
    </div>
  )
}

export default Forgot
