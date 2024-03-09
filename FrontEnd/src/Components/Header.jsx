import React, { useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Header = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  return (
    <div style={{position: "sticky", top: "0" , zIndex: "10"}}>
      <nav
        className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-white shadow-md"
        style={{ backgroundImage: "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)" }}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography variant="h4" color="blue-gray">
            {/* Add your brand logo or title here */}
          </Typography>
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <a href="#" className="flex items-center">
                  How it Works
                </a>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <a href="#" className="flex items-center">
                  Account
                </a>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <a href="#" className="flex items-center">
                  Blocks
                </a>
              </Typography>
            
            </ul>
            <div className="flex items-center gap-x-1">
              <Link to="SignIn">
               { !isAdminLoggedIn && !isUserLoggedIn && (
                <Button variant="text" size="sm">
                  <span>Log In</span>
                </Button>) }
              </Link>
              <Link to="SignUp">
              { !isAdminLoggedIn && !isUserLoggedIn && (
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>)}
              </Link>

              
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-x-1">
            {/* Mobile navigation components go here */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
