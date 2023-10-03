import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../pagesStyle/Login.css'

const Signup = () =>{

    const [data, setData] = useState([]);
    const [signupSuccess, setSignupSuccess] = useState('');
    const [signupMessage, setSignupMessage] = useState('');

    const [values, setValues] = useState({
        email:'',
        fullname:'',
        number:'',
        address:'',
        password:''
    })

    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const navigate = useNavigate();

    const handleSubmit = async(event)=>{
        event.preventDefault();
        axios.post('https://subscription-service-o4tb.onrender.com/signup', values)
        .then(res => {
            setData(res.data);
            if (!res.data.success) {
                setSignupSuccess(false);
                setSignupMessage(res.data.message); // Set the error message
            }else{
                navigate("/");
            }
        })
        .catch(err => console.log('Error inserting data',err))
    }
    return (
        <div className="container">
            <h1>Signup to continue</h1>
            <form onSubmit={handleSubmit}>
                {signupSuccess ? null : (<p>{signupMessage}</p>)}
                <input type="email" onChange={handleInput} placeholder="Enter your email" name='email' />
                <input type="text" onChange={handleInput} placeholder="Enter your Fullname" name='fullname'/>
                <input type="number" onChange={handleInput} placeholder="Enter your phone number" name='number'/>
                <input type="address" onChange={handleInput} placeholder="Enter your address" name='address'/>
                <input type="password" onChange={handleInput} placeholder="Enter your password" name='password'/>
                <button className="loginBtn" type='submit'> SUBMIT </button>
            </form>
          <a href='/'>Already have an account? Login</a>
        </div>
      );
}

export default Signup;