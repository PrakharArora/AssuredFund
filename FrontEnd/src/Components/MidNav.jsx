import React, {useEffect , useState} from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import TextField from '@mui/material/TextField';
import { BellIcon, Cog6ToothIcon  } from "@heroicons/react/24/solid";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector  } from 'react-redux';
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieCard from '../Components/MovieCard';
import {searchResultActions} from './Store/Index';
export default function MidNav() {
  const [movies , setMovies] = useState([]);
  const [facebookUser , setFacebookUser] = useState({});
  const [iscategoryData , setCategoryData] =  useState(false);
  const [searchResult, setSearchResult] = useState({
    search: '',
  }); 
  const categoryData = useSelector((state) => state.category)
  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  const dispatch = useDispatch();

  const onChangeHandler = (e, value) => {
    setSearchResult((prevState) => ({ ...prevState, search: value || '' }));
  };

  useEffect(() => {
    console.log('Category data changed:', categoryData);
    setCategoryData(true);
    console.log(`Name: ${categoryData?.name}, Value: ${categoryData?.value}`);
  }, [categoryData]);
  

  const searchValue = searchResult;
  const searchResultHandler = () => {
    console.log(searchValue);
    dispatch(searchResultActions({value: searchResult.search}));
    console.log("This is the value I am sending" , searchValue);
  };
 

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  

 

//  useEffect(() => {
//   getFacebookUser();
//  }, [])
  return (
    <Navbar variant="gradient" color="transparent" className="w-11/12 md:w-max s">
      <div className="flex flex-row justify-evenly items-center lg:space-y-0 lg:space-x-36 mx-4  mt-8 ">


     
        <div className="flex items-center">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mx-6"
          color="blue-gray"
          >
          Home
        </Typography>
        <Autocomplete
        id="free-solo-demo"
        value={searchResult.search}
        onChange={onChangeHandler}
        className="mx-8"
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            name="search"
            value={searchResult.search}
            sx={{ width: 300 }}
          />
        )}
      />
      <Button
        size="md"
        color="black"
        className="right-0 top-0 rounded ml-4"
        onClick={searchResultHandler}
      >
        Search
      </Button>
        </div>
           
        <div className="flex ">
         
          <Button className="flex items-center mx-4 w-92 " style={{cursor: "context-menu"}} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
           Add crowdfunding to WatchList to track
          </Button>
        </div>
      </div>
      <div className="flex items-center mt-4 w-full">
    <hr className="w-full w-full border-t border-blue-gray-300 mx-4 mt-6" />
    <Typography variant="h6" className="text-blue-gray-500 mt-6">
        {iscategoryData && categoryData.value ? categoryData.value : 'ALL'}
    </Typography>
    <hr className="w-4/5 w-full border-t border-blue-gray-300 mx-4 mt-6" />
</div>
    </Navbar>
  );
}
