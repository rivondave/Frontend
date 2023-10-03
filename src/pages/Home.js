import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../pagesStyle/style.css';

const Home = ()  => {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('https://subscription-service-o4tb.onrender.com/admin').then(res => {
      if(res.data.valid){
        setName(res.data.admin)
      }else{
        navigate('/admin');
      }
    })
    .catch(err => console.log(err))
  },[])

  const handleSubmit = async(event)=>{
    event.preventDefault();
    axios.get('https://subscription-service-o4tb.onrender.com/logout')
    .then(res => {
      navigate("/admin");
    })
    .catch(err => console.log('Error validating data',err))
  }

  return (
    <div>
        Dashboard
        <br/>
        Welcome back {name}
        <Link to='/logout' onClick={handleSubmit}>Logout</Link>
        <Link to='/admin/customers'>Customers</Link>
    </div>
  )
}

export default Home