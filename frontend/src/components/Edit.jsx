import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const initialUser = {
        name: '',
        email: ''
    };
    const navigate = useNavigate('/')

    const { id } = useParams();
    const [user, setUser] = useState(initialUser);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        axios.get(`https://crud-nine-black.vercel.app/api/user/getOne/${id}`)
            .then((response) => {
                console.log("Fetched user data:", response.data);
                setUser(response.data.user)
            })
            .catch((error) => {
                console.log("Error: ", error);

            })
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8000/api/user/update/${id}`,user)
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            console.log("Error: ",error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <div className='bg-white p-6 rounded-lg shadow-md max-w-md mx-auto'>
                <Link to={'/'} className='text-red-400 underline'>Back</Link>
                <h1 className='text-2xl font-semibold mb-4'>Edit User</h1>
                <form onSubmit={submitForm}>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="name" className="mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"  // Ensure the name attribute matches the state field
                        placeholder='Edit your name'
                        value={user.name || ''}
                        onChange={inputChangeHandler}
                        className='w-full p-2 border rounded-md outline-none focus:border-purple-400'
                        />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="email" className="mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Edit your email'
                        value={user.email || ''}  // Provide a fallback
                        onChange={inputChangeHandler}
                        className='w-full p-2 border rounded-md outline-none focus:border-purple-400'
                        />
                </div>

                <button type='submit' className='w-full bg-purple-400 hover:bg-purple-800 duration-300 text-white py-2 rounded-md mt-2'>
                    Save Changes
                </button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
