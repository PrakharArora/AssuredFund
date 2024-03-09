import React , {useEffect, useState} from 'react';
import { BrowserRouter as Router , Routes, Route ,Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Admin from './Components/Admin Board/Admin';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';
import { adminActions, userActions } from './Components/Store';
import LoginSuccess from './Components/GoogleLoginSuccess'
import GoogleLoginSuccess from './Components/GoogleLoginSuccess';
import Booking from './Components/Booking';
import Movies from './Components/Movies';
import Index from './Components/Profile/Index';
import PaymentModal from './Components/Profile/PaymentModal';
import './app.css';
import CreateFundRaiser from './Components/Admin Board/CreateFundraiser';
function App() {
  const dispatch = useDispatch();
  const [user , setUser] = useState(null);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  
  console.log("isAdminLogedIn" , isAdminLoggedIn);
  console.log("isUserLoggedIn" , isUserLoggedIn);

  useEffect(()=>{
  if(localStorage.getItem("userId") || localStorage.getItem("GoogleId") ){
  dispatch(userActions.login());
  }
  }, [])

  useEffect(()=>{
    if(localStorage.getItem("GoogleId")){
      dispatch(userActions.login());
    }
  },[])
  useEffect(()=>{
    if(localStorage.getItem("Token") && localStorage.getItem("AdminId")){
    dispatch(adminActions.login());
    }
    }, [])
   

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Layout user={user} />}>
        <Route index element={<Movies />} /> 
        <Route path="bookings" element={<Booking />} /> 
        <Route path="movies" element={<Movies />} />
        <Route path="loginsuccess" element={<GoogleLoginSuccess />} /> 
        <Route path="Profile/:id" element = {<Index /> } />
        <Route path = "/CreateFundraiser" element = {<CreateFundRaiser />} />
       
        {/* Add other nested routes as needed */}
      </Route>
        <Route path="adminlogin" element={<Admin />} /> 
        <Route path="signup" element={<SignUp />} /> 
        <Route path="signin" element={<SignIn />} /> 
         <Route path= "PaymentModal" element = {<PaymentModal />} />
      {/* Add any routes that should not use the Layout outside this Route */}
    </Routes>
  </Router>
  );
}

export default App;
