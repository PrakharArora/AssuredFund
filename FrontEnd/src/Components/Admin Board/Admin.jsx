import React, { useState } from 'react';
import { AdminLoginRequest } from '../../api-helpers/api-helpers';
import {useDispatch , useSelector} from 'react-redux';
import { adminActions } from '../Store';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const navigate = useNavigate();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("AdminId" , data.id);
    localStorage.setItem("Token" , data.token);
    if(!isAdminLoggedIn){
      navigate("/");
    }
  }
  const getData = (data) => {
    console.log(data);
    AdminLoginRequest(data, AdminLogin)
    .then(onResReceived)
    .catch((err) => console.log(err));
  };
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(inputs);
    console.log('Form submitted with data:', inputs);
    setInputs({
      email: '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-screen-md bg-white shadow sm:rounded-lg p-8">
        <div className="text-center">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto mb-4"
            alt="Logo"
          />
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            Admin Login Panel
          </h1>
        </div>

        <div className="my-12 border-b text-center">
          <div className="mx-auto max-w-xs">
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-5"
                type="email"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* ... (Check Icon SVG Path) */}
                </svg>
                <span className="ml-3">Log In</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
