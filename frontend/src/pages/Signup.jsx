import React, { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  const [singupData, setSingupData] = useState({
      fullname        :"",
      username        :"",
      email           :"",
      password        :"",
      confirmPassword :"",
      gender          :""
    });

  const navigate=useNavigate()

  const handleChange=(e)=>{
    const {value, name} = e.target
    setSingupData({...singupData, [name]:value})
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    registerUser()
  };
  console.log("onChange: ", singupData)

  const registerUser=async()=>{
    try{
      let response = await axios.post(`${base_url}/api/auth/signup`, singupData)
      console.log("response: ", response)
      if(response.data.status === true){
        const {message} = response.data
        toast.success(message)
        setTimeout(()=>{
          navigate("/login")
        },1500)
      }
    }
    catch(error){
      if(error.response?.data.error){
        toast.warning(error.response?.data.error[0]?.msg)
      }
      else{
        toast.warning(error.response?.data.message)
      }
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center w-96 mx-auto h-screen'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center  py-4'>
            Signup
            <span className='text-black-400'> ChatNest</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <Input label="Full Name" name="fullname"  className="input input-bordered h-12 " placeholder="Enter Username" onChange={handleChange} />
            <Input label="Username"  name="username"  className="input input-bordered h-12 " placeholder="Enter Username" onChange={handleChange} />
            <Input label="Email"     name="email"     type="email"    className="input input-bordered h-12 " placeholder="Enter Your Email" onChange={handleChange} />
            <Input label="Password"  name="password"  type="password" className="input input-bordered h-12 " placeholder="Enter Password"   onChange={handleChange} />
            <Input label="Confirm Password" name="confirmPassword" type="password" className="input input-border h-12" placeholder = "Confirm password" onChange={handleChange} />
            <div className='my-2 text-white text-xl'>
                <span className='mr-2'>Gender: </span>
                <input type='radio' name='gender' value='male' className='mr-2 ' id='3' onChange={handleChange}/>
                <label className='mr-6 text-black' htmlFor='3'>Male</label>
                <input type='radio' className='mr-2' name='gender' value='female'  id='4' onChange={handleChange} />
                <label htmlFor='4' className=' text-black'>Female</label>
              </div>
            <Button type='submit' className='w-20 my-4'>Signup</Button>
          </form>
        </div>
      </div>
    </>
  )
};

export default Signup;