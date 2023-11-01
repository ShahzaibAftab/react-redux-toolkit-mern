import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, updateUser } from './redux/userSlice'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {

  const { id } = useParams()
  const users = useSelector(state => state.users.users)
  const user = users.find(u => u.id === id)
  console.log('User Found: ', user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [age, setAge] = useState(user.age)

  const UpdateUser = (e) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_PORT}update/${id}`, { name, email, age })
      .then(res => {
        dispatch(updateUser({id:id,name,email,age}))
        // console.log('Posted User', res)
        navigate('/')
      })
      .catch(err => console.log('Unable to Add user', err))
  }
  return (
    <>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
          <form onSubmit={UpdateUser}>
            <h2>Update User</h2>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input type='text' placeholder='Enter Name' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor='email'>Email</label>
              <input type='email' value={email} placeholder='hello@abc.com' className='form-control' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='mb-2'>
              <label htmlFor='age'>Age</label>
              <input type='number' value={age} placeholder='Age:' className='form-control' onChange={(e) => setAge(e.target.value)} />
            </div>
            <button className='btn btn-success'> Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateUser