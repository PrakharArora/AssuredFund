import React, { useEffect, useState } from 'react';
import { sendUserSignInRequest } from '../api-helpers/api-helpers';
import { useDispatch , useSelector } from 'react-redux';
import { userActions } from './Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logging from '../assets/Logging.gif'
import './signInPage.css'

const SignIn = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const[userLogin , checkUserLogin] = useState(false);
  const[invalidUser , setInvalidUser] = useState(false);

  const loginWithGoogle = () =>{
    window.open("http://localhost:5000/auth/google/callback" , "_self")
  }

  const loginWithFacebook = () =>{
    window.open("http://localhost:5000/auth/facebook/callback" , "_self")
  }
  const onResReceived = (data) => {
    console.log(data);
    checkUserLogin(true);
    setTimeout(() => {
      dispatch(userActions.login());
    localStorage.setItem("userId" , data.id)
    localStorage.setItem("userName" , data.name)
    if(!isUserLoggedIn){
      return navigate("/");
    }
    }, 5000);
  }
  const getData = (data) => {
    console.log(data);
    console.log(data.id);
    sendUserSignInRequest(data, SignIn)
    .then(onResReceived)
    .catch((err) => 
    console.log(err , setTimeout(() => {
      setInvalidUser(true)
    }, 3000)));
  };
  const [inputs , setInputs] = useState({
    email: '',
    password: ''
  })
  // const [SignIn , setIsSignIn] = useState(false);
  const handleChange = (e) => {

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure that the 'email' property exists in the 'inputs' object
    getData(inputs);
    setInputs({
      email: '',
      password: '',
    });
  };
  
  
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign In for templatana
            </h1>
          { !userLogin ? <div className="flex flex-col items-center mt-4">
              <div className="flex">
                <button className="w-40 font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline" onClick={loginWithGoogle}>
                  <div className="bg-white p-2 rounded-full">
                  <svg class="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                  </div>
                  <span className="ml-2">Google</span>
                </button>

                <button className="w-40 font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline ml-4" onClick={loginWithFacebook}>
                  <div className="bg-white p-1 rounded-full">
                  <svg class="w-6" viewBox="0 0 32 32">
                    <path
                      fill-rule="evenodd"
                      d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                    />
                  </svg>
                  </div>
                  <span className="ml-2">GitHub</span>
                </button>
              </div>

              <div className="my-4 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              {invalidUser ? <p style={{color: "red"}}>Please check email or password</p> : <p>Or sign in with e-mail</p> }
             
                </div> 
              </div>
              
              <div className="mx-auto max-w-xs">
              <form onSubmit={handleSubmit}>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  name='email'
                  value={inputs.change}
                  onChange={handleChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={inputs.change}
                  onChange={handleChange}
                  />
                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    {/* SVG Path for Check Icon */}
                  </svg>
                 
                  <span className="ml-3">Sign In</span>
                </button>
                    </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's{' '}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{' '}
                  and its{' '}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div> : 
            <div>
            <img src={logging} id='logging'/>
            <br />
            <h1 id='loggingText'>Please Wait Logging you In</h1>
            </div>
            }
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>


          
        </div>
        
      </div>
      </div>
      
    
  );
};

export default SignIn;
