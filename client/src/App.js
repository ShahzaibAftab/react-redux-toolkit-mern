import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';
import axios from 'axios';
import UpdateUser from './UpdateUser';
function App() {

  const dispatch=useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PORT}`);
        console.log('User API', response)
        dispatch(getUser(response.data));
      } catch (error) {
        console.log('fetchData() Error: ', error)
      }
    }
    fetchData();
  }, [])
  return (
    < >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/edit/:id' element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
