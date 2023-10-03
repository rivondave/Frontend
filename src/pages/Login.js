import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Login.css'

const Login =()=> {

  const [data, setData] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(()=>{
    axios.get('https://subscription-service-o4tb.onrender.com')
    .then(res => {
      if(res.data.valid){
        navigate('/agents');
      }else{
        navigate('/');
      }
    })
    .catch(err => console.log(err));
  },[])

  const [values, setValues] = useState({
    email:'',
    password:''
  })

    const handleInput = (event) =>{
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
      event.preventDefault();
      axios.post('https://subscription-service-o4tb.onrender.com/', values)
      .then(res => {
        setData(res.data);
        if (!res.data.success) {
          setLoginSuccess(false);
          setLoginMessage(res.data.message); // Set the error message
        }else{
          navigate("/agents");
        }
      })
      .catch(err => console.log(err))
    }

    return (
      <div className="container">
        <h1>Login to continue</h1>
        <form onSubmit={handleSubmit}>
          {loginSuccess ? null : (<p>{loginMessage}</p>)}
          <input type="email" onChange={handleInput} placeholder="Enter your email" name='email' />
          <input type="password" onChange={handleInput} placeholder="Enter your password" name='password'/>
          <button className="loginBtn" type='submit'>SUBMIT</button>
        </form>
        <a href='/signup'>Don't have an account? Signup</a>
        <a href='/forgot-password'>Forgot Password, Click to reset</a>
      </div>
    );
}

export default Login