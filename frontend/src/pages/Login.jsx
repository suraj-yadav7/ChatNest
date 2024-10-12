import React, {useState} from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
  const base_url = import.meta.env.VITE_BASE_URL
  const [loginData, setLoginData] = useState({
    username :"",
    password :"",
  });

  const handleChange=(e)=>{
    const {value, name} = e.target
    setLoginData({...loginData, [name]:value})
  };

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
      let response = await axios.post(`${base_url}/api/auth/login`, loginData);
      if(response.data?.status === true){
        toast.success(response.data.message)
        sessionStorage.setItem("jwttoken", response.data.jwtToken)
        setTimeout(()=>{
          Navigate("/")
        },1200)
      }
    }
    catch(error){
      if(error.response?.data.error){
        toast.warning(error.response.data.error[0]?.msg)
      }
      else{
        toast.warning(error.response.data.message)
      }
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center w-96 mx-auto h-screen'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center  py-4'>
            Login
            <span className='text-black-400'> ChatNest</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <Input label="Username" name="username" value={loginData.username} className="input input-bordered h-12 " placeholder="Enter Username" onChange={handleChange}/>
            <Input label="Password" name="password" value={loginData.password } className="input input-bordered h-12 " placeholder="Enter Password" onChange={handleChange}/>
            <Button type="submit" className='w-20 my-4'>Login</Button>
          </form>
        </div>
      </div>
    </>
  )
};

export default Login;