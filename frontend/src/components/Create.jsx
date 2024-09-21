import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Create = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const submitForm = async () => {
    const userData = {
      name,
      email,
      password
    }
    
    try {
      const res = await axios.post('https://crud-nine-black.vercel.app/api/user/register', userData)
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("Error: ", error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md mx-auto'>
        <Link to={'/'} className='text-red-400 underline'>Back</Link>
        <h1 className='text-2xl font-semibold mb-4'>Create User</h1>

        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <div className='flex flex-col mb-4'>
            <label htmlFor="name" className="mb-1 font-medium">Name</label>
            <input 
              type="text"
              id="name"
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded-md outline-none focus:border-purple-400'
            />
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <input 
              type="email"
              id="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded-md outline-none focus:border-purple-400'
            />
          </div>

          <div className='flex flex-col mb-4'>
            <label htmlFor="password" className="mb-1 font-medium">Password</label>
            <input 
              type="password"
              id="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded-md outline-none focus:border-purple-400'
            />
          </div>

          <button type="submit" className='w-full bg-purple-400 hover:bg-purple-800 duration-300 text-white py-2 rounded-md mt-2'>
            Create user
          </button>
        </form>
      </div>
    </div>
  )
}

export default Create
