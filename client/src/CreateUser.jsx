import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from './redux/userSlice'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_PORT}create`, { name, email, age })
      .then(res => {
        dispatch(addUser(res.data))
        // console.log('Posted User', res)
        navigate('/')
      })
      .catch(err => console.log('Unable to Add user', err))
  }
  return (
    <>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input type='text' placeholder='Enter Name' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input type='email' placeholder='hello@abc.com' className='form-control' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor='age'>Age</label>
              <input type='number' placeholder='Age:' className='form-control' onChange={(e) => setAge(e.target.value)} />
            </div>
            <button className='btn btn-success'> Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateUser