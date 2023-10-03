import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Login.css'

const AdminLogin =()=> {

  const [data, setData] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(()=>{
    axios.get('https://subscription-service-o4tb.onrender.com/admin')
    .then(res => {
      if(res.data.valid){
        navigate('/admin/home');
      }else{
        navigate('/admin');
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
      axios.post('https://subscription-service-o4tb.onrender.com/admin', values)
      .then(res => {
        setData(res.data);
        if (!res.data.success) {
          setLoginSuccess(false);
          setLoginMessage(res.data.message); // Set the error message
        }else{
          navigate("/admin/home");
        }
      })
      .catch(err => console.log('Error validating data',err))
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
      </div>
    );
}

export default AdminLogin