import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  IconButton
} from "@material-tailwind/react";
import { useDispatch, useSelector  } from 'react-redux';
import { Badge, Button } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';
 import ProfileCard from './MovieCard';
// import { useDispatch , useSelector } from 'react-redux';
  
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { adminActions, userActions } from "./Store";
import axios from "axios";
import {filterDataActions} from "./Store/Index";
 
export default function SidebarWithSearch({user ,onToggleMidNav , category}) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [googUserData , setGoogleUserData] = useState({});
  const [facebookUser , setFacebookUser] = useState({});
  const [categoryData , setCategoryData] = useState({});
  console.log("GoogleData" , googUserData);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
      console.log("Response Received:", response);
      setGoogleUserData(response.data.user);
      localStorage.setItem("GoogleId" , response.data.user.displayName);
      localStorage.setItem("ProfileImage" , response.data.user.image);
      localStorage.setItem("Email" , response.data.user.email);
        dispatch(userActions.login());
    } catch (error) {
      console.log(error);
    }
  };

  let isAdmin = false;
  if(localStorage.getItem("Token")){
   isAdmin = true;
  }

  const facebookLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/facebook/success", { withCredentials: true });
      console.log("Response Received:", response);
      setFacebookUser(response.data.Facebookuser);
      localStorage.setItem("FacebookName", response.data.Facebookuser.displayName);
      localStorage.setItem("FacebookProfileImage", response.data.Facebookuser.picture); // Use the correct property name
      localStorage.setItem("Email", response.data.Facebookuser.email);
      dispatch(userActions.login());

    } catch (error) {
      console.log(error);
    }
  };
  const categoryManager = (e) => {
    const { name, value } = e.currentTarget.dataset;
    setCategoryData({ name, value });
    dispatch(filterDataActions({ name, value }));
  }
  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  

  // const getFacebookUser = () => {
  //   try {
  //     const response = 
  //   }
  // }
 
  const handleMidNav = () => {
    onToggleMidNav(false);
  }
  
  const navigate = useNavigate();
    useEffect(()=>{
 getUser();
 facebookLogin();
  } , [])
  const handleOpen = (value) => { 
    setOpen(open === value ? 0 : value);
  };
  let User;
  if(localStorage.getItem("userName")){
     User = localStorage.getItem("userName")
  }
  let UserId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(userActions.logout());
  }

  const AdminLogOut = () => {
    dispatch(adminActions.logout());
  }
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const AdminToken = localStorage.getItem("Token");
  const googleName = localStorage.getItem("GoogleId");
  const image = localStorage.getItem("ProfileImage");

  const googleLogOut = () => {
    window.open("http://localhost:5000/GoogleLogout" , "_self");
    dispatch(userActions.logout());
    localStorage.removeItem("GoogleId");
    localStorage.removeItem("ProfileImage");
    localStorage.removeItem("Email");
  }
  const displayText = AdminToken 
    ? "Admin Panel" 
    : User 
        ? `Hi ${User}` 
        : googleName 
            ? `Hi ${googleName}` 
            : "Navigate";
  return (
    <>
        <div className="flex" > {/* Add a flex container */}
      
        <Card
          className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-#FAFAFA"
          style={{ backgroundColor: "#cbf3f0", position: "sticky", top: "0", height: "60rem" }}
          >      <div className="mb-2 flex items-center gap-4 p-4">
       { image ? <img src={image} alt="brand" className="h-10 w-10 mt-10 rounded-full" /> : <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-10 w-10 mt-10" />}
        
        <Typography variant="h5" color="black" className="mt-10">
        {displayText}
        </Typography>
      </div>
      <div className="p-2">
        <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
              <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
              />
            }
            >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="#FAFAFA" className="mr-auto font-normal" style={{font: "#FAFAFA"}}>
                ALL
              </Typography>
            </AccordionHeader>
          </ListItem>
            <List className="p-0">
              <ListItem data-value="Animal" data-name="Animal Help"  onClick={categoryManager}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Animal Help
              </ListItem>
              <ListItem data-value="Parental" data-name="Parental Help"  onClick={categoryManager}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Parental Help
              </ListItem>
              <ListItem data-value="Child" data-name="Child Help"  onClick={categoryManager}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Child Help
              </ListItem>
              <ListItem data-value="Sports" data-name="Sports Help"  onClick={categoryManager}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Sports
              </ListItem>
              <ListItem data-value="Personal" data-name="Personal Help"  onClick={categoryManager}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Personal
              </ListItem>
              
            </List>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
              <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
              />
            }
            >
          <ListItem className="p-0" >
            <AccordionHeader  className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="#FAFAFA" className="mr-auto font-normal">
                E-Commerce
              </Typography>
            </AccordionHeader>
            
          </ListItem>

            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
        </Accordion>
        <hr className="my-2 border-#FAFAFA-50" />
        
       {isAdmin ?<Link to = '/CreateFundraiser'> <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Create 
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="#FAFAFA" className="rounded-full" />
          </ListItemSuffix>
        </ListItem></Link> : <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox 
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="#FAFAFA" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> }
        <Link to  = "/bookings">
          <ListItem onClick={handleMidNav}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            WatchList
          </ListItem>
          </Link>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Btn2
        </ListItem>
       {UserId && <ListItem onClick={LogOut} >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>}
        {AdminToken && <ListItem onClick={AdminLogOut} >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>}

        {googleName && <ListItem onClick={googleLogOut} >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>}

      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
            >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </Card>
    </div>
      </>
  );
}