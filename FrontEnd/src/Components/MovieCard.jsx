import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
  } from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../api-helpers/api-helpers";
import { useSelector } from "react-redux";
import { AddtoBookMark } from './Store/Index';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProfileCard({ id , title , releaseDate , posterURL ,  description , category , categoryManager}) {
  const categoryData = useSelector((state) => state.category);

  // useEffect(() => {
  //   console.log('Category data changed:', categoryData);
  //   console.log(`Name: ${categoryData?.name}, Value: ${categoryData?.value}`);
  // }, [categoryData]);
  

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
    const bookmark = useSelector(state => state.bookmark.bookmark);
    const [movies , setMovies] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      getAllMovies().then((data) => console.log(data.movies)).catch(err => console.log(err));
    }, []);
    
    const sentData = () => {
      const existingBookmark = bookmark.find(item => item.title === title && item.description === description);
    
      if (!existingBookmark) {
        dispatch(AddtoBookMark({ title, description , id  }));
        console.log('Data sent', { title, description , id  });
      } else {
        console.log('Data already exists', { title, description, id });
      }
    };

    return (
<>
<Card className="w-full mb-2" data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="1500">
  <CardBody className="flex items-center p-1">
    <div className="flex-1">
      <Typography variant="h5" color="blue-gray" className="m-6 ml-8">
        {title}
      </Typography>
      <Typography className="mr-48 ml-8">
        {description}
      </Typography>
    </div>
    <div className="flex items-center justify-end">
      <div className="flex justify-center">
        <img className="rounded-full w-28 mr-12 mt-8" src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Football_Pallo_valmiina-cropped.jpg" alt="image description" />
      </div>
    </div>
  </CardBody>
  <CardFooter className="pt-0">
    <a href="#" className="inline-block">
      <Link to = {`/Profile/${id}`}>
      <Button size="sm" variant="text" className="flex items-center gap-2">
        Learn More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
      </Link>
     
    </a>
    <Button className="mx-4" onClick={sentData}>
        Add to Watchlist
      </Button>
    <div className="flex justify-end gap-4">
    <div>
        Donated
      </div>
      <div className="mx-1">
                  Supporters
              </div>
              <div className="  ">
                  Time Left
              </div>
      </div>
    
    <div className="flex justify-end mx-2 gap-8">
    
    <div style={{ width: 50, height: 50}} className="mx-1">
    
        <CircularProgressbar
        value={12}
        text={12 + "%"}
        strokeWidth={12}
        styles={buildStyles({
            textColor: "red",
            pathColor: "turquoise",
            trailColor: "gold",
        })}
        />     
      
              </div>   
              <div style={{ width: 50, height: 50}} className="mx-1">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#1C274C"/>
</svg>
              </div>
              <div style={{ width: 50, height: 50}} className="">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 17V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
</div>
<div className="flex justify-end gap-10">
    <div className="mx-4">
        1.2L
      </div>
      <div>
                  500
              </div>
              <div>
                  12H:05M
              </div>
      </div>
  </CardFooter>
</Card>
</>

    );
  }


  