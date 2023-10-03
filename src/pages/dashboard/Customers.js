import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Customers = () => {
  const [name, setName] = useState([])
  // const [name, setName] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('https://subscription-service-o4tb.onrender.com/admin/customers').then(res => {
      if(res.data.valid){
        setName(res.data.value)
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
        <h1>Customers Page</h1>
        <br/>
        <Link to='/logout' onClick={handleSubmit}>Logout</Link>
        <br/>
        <Link to='/admin/home'>Dashboard</Link>
        <div>
        {name.map((item, index) => (
          <li key={index}>
            <p>Email: {item.email}</p>
            <p>Full Name: {item.fullname}</p>
            <p>Number: {item.number}</p>
            <p>Address: {item.address}</p>
            <br/>
          </li>
        ))}
        </div>
    </div>
  )
}

export default Customers