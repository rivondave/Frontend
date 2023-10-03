import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pagesStyle/Agent.css'

const Agents = () => {
    const [name, setName] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('https://subscription-service-o4tb.onrender.com').then(res => {
      if(res.data.valid){
        setName(res.data.fullname)
      }else{
        navigate('/');
      }
    })
    .catch(err => console.log(err))
  },[])

  const handleSubmit = async(event)=>{
    event.preventDefault();
    axios.get('https://subscription-service-o4tb.onrender.com/logout')
    .then(res => {
      navigate("/");
    })
    .catch(err => console.log('Error validating data',err))
  }

  return (
    <div className='homePage'>
    <a href='/' onClick={handleSubmit} style={{justifyContent: 'right', alignItems: 'right'}}>Logout</a>

        <h1 className='cName'>Welcome back {name}</h1>
    </div>
  )
}

export default Agents