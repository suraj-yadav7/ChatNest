import React, { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';

const Signup = () => {
  const [singupData, setSingupData] = useState({
      fullname :"",
      username :"",
      email    :"",
      password :"",
      gender   :""
    })

  const handleChange=(e)=>{
    const {value, name} = e.target
    setSingupData({...singupData, [name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
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
            <Input label="Full Name"  className="input input-bordered h-12 " placeholder="Enter Username" onChange={handleChange} />
            <Input label="Username"   className="input input-bordered h-12 " placeholder="Enter Password" onChange={handleChange} />
            <Input label="Email"      type="email"    className="input input-bordered h-12 " placeholder="Enter Password" onChange={handleChange} />
            <Input label="Password"   type="password" className="input input-bordered h-12 " placeholder="Enter Password" onChange={handleChange} />
            <div className='my-2 text-white text-xl'>
                <span className='mr-2'>Gender: </span>
                <input type='radio' name='gender' value='male' className='mr-2 ' id='3'/>
                <label className='mr-6 text-black' htmlFor='3'>Male</label>
                <input type='radio' className='mr-2' name='gender' value='female'  id='4' />
                <label htmlFor='4' className=' text-black'>Female</label>
              </div>
            <Button type='button' className='w-20 my-4'>Signup</Button>
          </form>
        </div>
      </div>
    </>
  )
};

export default Signup;