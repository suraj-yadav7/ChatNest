import React from 'react'
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username :"",
    password :"",
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
            Login
            <span className='text-black-400'> ChatNest</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <Input label="Username" className="input input-bordered h-12 " placeholder="Enter Username" onChange={handleChange}/>
            <Input label="Password" className="input input-bordered h-12 " placeholder="Enter Password" onChange={handleChange}/>
            <Button className='w-20 my-4'>Login</Button>
          </form>
        </div>
      </div>
    </>
  )
};

export default Login;