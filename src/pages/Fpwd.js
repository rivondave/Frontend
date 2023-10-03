import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Login.css'

const Fpwd = () => {

  const [values, setValues] = useState({
    email:'',
    password:'',
    cpassword:''
  })

  const [data, setData] = useState([]);
  const [fpwdSuccess, setFpwdSuccess] = useState('');
  const [fpwdMessage, setFpwdMessage] = useState('');

  const handleInput = (event) =>{
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const navigate = useNavigate();

  const handleSubmit = async(event)=>{
    event.preventDefault();
    axios.post('https://subscription-service-o4tb.onrender.com/forgot-password', values)
    .then(res => {
      setData(res.data);
      if (!res.data.success) {
        setFpwdSuccess(false);
        setFpwdMessage(res.data.message); // Set the error message
      }else{
        navigate("/");
      }
    })
    .catch(err => console.log('Error validating data',err))
}

  return (
    <div className="container">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
        {fpwdSuccess ? null : (<p>{fpwdMessage}</p>)}
          <input type="email" onChange={handleInput} placeholder="Enter your email" name='email' />
          <input type="password" onChange={handleInput} placeholder="Enter new password" name='password'/>
          <input type="password" onChange={handleInput} placeholder="Confirm new password" name='cpassword'/>
          <button className="loginBtn" type='submit'>CHANGE PASSWORD</button>
        </form>
        <a href='/'>Login</a>
      </div>
  )
}

export default Fpwd;