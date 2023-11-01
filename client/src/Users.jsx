import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from './redux/userSlice'


const Users = () => {

    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log('User Display Selector', useSelector(state => state.users.users))
    console.log('Display Users: ', users)

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_PORT}delete/${id}`)
            .then(res => {
                dispatch(deleteUser({id}))
                console.log(res)
                console.log('state', users)
            }).catch(err => console.log('Unable to Delete', err))
    }
    useEffect(() => {

    }, [users])
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <button onClick={() => navigate('/create')} className='btn btn-success btn-sm'>Add +</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <button onClick={() => navigate(`/edit/${user.id}`)} className='btn btn-sm btn-success'>Update</button>
                                            <button onClick={() => handleDelete(user.id)} className='mx-2 btn btn-sm btn-danger'>Delete</button>
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

export default Users