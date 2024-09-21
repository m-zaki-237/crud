import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user/getAll')
        if (res.data.success) {
          setUsers(res.data.userData)
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    getAll()
  }, [])

  const deleteUser = async (userID) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/user/delete/${userID}`)
      if(res.data.success){
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userID))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("Error: ",error);
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="p-4 max-w-4xl flex flex-col mx-auto">
      <Link to={'/add-user'} className="self-start px-3 py-1 bg-purple-400 hover:bg-purple-800 duration-300 text-white rounded-md">Add User</Link>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-800 mt-4">
          <thead>
            <tr className='bg-purple-400 text-white'>
              <th className="border border-gray-800 px-4 py-2">S.No.</th>
              <th className="border border-gray-800 px-4 py-2">User Name</th>
              <th className="border border-gray-800 px-4 py-2">User Email</th>
              <th className="border border-gray-800 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td className="border border-gray-800 px-4 py-2">{index + 1}.</td>
                    <td className="border border-gray-800 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-800 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-800 px-4 py-2">
                      <button className="text-red-500 mr-2"
                      onClick={()=>deleteUser(user._id)}
                      >Delete</button>
                      <Link to={`/edit-user/` + user._id} className="text-blue-500 underline">Edit</Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
