import React, { useEffect, useState , useContext , Suspense  } from 'react'

import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
    Card,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
  // import mailImg from '../read.png'
  import { RotatingLines } from 'react-loader-spinner';
  import PaymentModal from './PaymentModal';
  import {FacebookShareButton , WhatsappShareButton} from "react-share";
  import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles,
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import {countLikes , getLikesData} from '../../api-helpers/api-helpers';
  import './style.css'
import { useParams , useLocation, json } from 'react-router-dom';
import { getMovieDetails } from '../../api-helpers/api-helpers';
const Accountname = localStorage.getItem("GoogleId");
const AccountEmail = localStorage.getItem("Email");
const date = '';
function Index() {
   const id = useParams().id;

   const [replaceText , setReplaceText] = useState('Copy UPI Id');
   const [movieData , setMovieData] = useState({});
   const [formData , setFormData] = useState({name: Accountname || ' ' , email: AccountEmail|| '' , date: date || ''});
   const [isSubmitting , setIsSubmitting] = useState(false);
   const [loading , setIsLoading] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [hideForm , setFormHidden] = useState(true);
   const [support, setShowSupport] = useState(false); // Rename setSupport to setShowSupport


   const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
};


  
 





 let movieId;
 
 useEffect(() => {
   getMovieDetails(id)
   .then((res) => {
     if (res && res.movie) {
       setMovieData(res.movie);
      } else {
        console.error('Movie data not found');
      }
    })
    .catch((err) => console.log(err));
    movieId = id;      
  }, [id]);
  
  const percentage =( movieData.amountRaised/movieData.totalAmount)*100;

 
const roundedPercentage = percentage.toFixed(2);
console.log(roundedPercentage)
const sharUrl = window.location.href;
console.log('Sharing Url' , sharUrl);
const onChangeHandler = (event) => {
  
    const {name , value} = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name] : value
    }))
}

 const [currentLikes, setCurrentLikes] = useState(0);
 const [like , isLike] = useState();
 const [data , setData]  = useState({
  likes: like,
 })
const currentLikesHandler = () => {
  
  if (movieData && movieData.bookings && movieData.bookings.length > 0) {
      const lastBooking = movieData.bookings[movieData.bookings.length - 1];
      return lastBooking.seatNumber;
    } else {
      return [];
  }
}

useEffect(()=>{
setCurrentLikes(currentLikesHandler);
} , [movieData]);


 
 




useEffect(() => {
   getMovieDetails(id)
   .then((res) => {
     if (res && res.movie) {
       setMovieData(res.movie);
      } else {
        console.error('Movie data not found');
      }
    })
    .catch((err) => console.log(err));
    movieId = id;      
  }, [id]);


  

// getLikesData().then((res)=>console.log("This is booking data" , res.booking));

const onSubmitHandler = async (event) => {
  event.preventDefault();

setIsLoading(true);
setFormHidden(false);
  try {
    const res = await fetch(`http://localhost:5000/sendEmail`, {
      method: "POST",
      headers: {
        "Content-type": "application/json", // Update content-type to JSON
      },
      body: JSON.stringify(formData),
    });

    console.log(res);
    console.log(formData);
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    setTimeout(() => {
      setIsSubmitting(true);
      setIsLoading(false)
    }, 3000);
  }
};

   console.log(movieData)
   console.log(id);
    const handleCopy = async () => {
        var copyText = document.getElementById('upi');
        if (copyText) {
          try {
            // Extracting the part of the text after 'UPI: '
            var textToCopy = copyText.textContent.replace('UPI: ', '');
      
            // Create a temporary textarea element to leverage the select() method
            var tempElement = document.createElement("textarea");
            tempElement.value = textToCopy;
            document.body.appendChild(tempElement);
            tempElement.select();
            await navigator.clipboard.writeText(tempElement.value);
            document.body.removeChild(tempElement);
            setTimeout(() => {    
            setReplaceText('Copied')
        }, 200);
        setTimeout(() => {    
            setReplaceText(replaceText);
        }, 1500);

            console.log('Text copied to clipboard');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
        } else {
          console.error('Element with ID upi not found');
        }
      };
      
      const supportCounter = (movie) => {
        const newSupportStatus = !support;
        setShowSupport(newSupportStatus);
        setData((prevState) => ({
          ...prevState,
          likes: prevState.currentLikes + (newSupportStatus ? 1 : -1)
        }));
              const updatedLike = currentLikes + (newSupportStatus ? 1 : -1);

              console.log("this is id of movie", "movie:" + id);
              countLikes({ seatNumber: updatedLike, movie: id })
              .then((res) => console.log(res))
              setCurrentLikes(updatedLike)
              .catch((err) => console.log(err));
      };
      
     
  return (
    <>
 <PaymentModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
  <div class="container mx-auto px-4 mt-10">
   
    <div class="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-19 lg:mt-12 lg:grid-cols-5 lg:gap-16 mx-8 ">
      <div class="lg:col-span-3 lg:row-end-1">
        <div class="lg:flex lg:items-start">
          <div class="lg:order-2 lg:ml-5">
            <div className='flex'>

            <div class="max-w-xl overflow-hidden rounded-lg">
              <img className='h-11/12 mt-2' src="https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/" alt="" />
            </div>
            <div class="border-b border-gray-700 " style={{borderLeft: "2px solid #D1D5DB" , height: "37rem" , width: "15rem" , maxWidth: '1px', position: 'absolute', marginLeft: "38rem"}}></div>
            </div>
          </div>
        </div>
      </div>
     

      <div class="lg:col-span-2 w-full lg:row-span-2 lg:row-end-2 mx-4">
      <div class="flex justify-center ...">

        <h2 class="sm: w-96 text-2xl font-bold text-gray-900 sm:text-3xl mb-5">{movieData.title}</h2>
</div>       
<div className='box'>

        <div style={{width: 350, height: 120 , display: 'flex', alignItems:'center' , justifyContent: 'center' }}>

        <div style={{ width: 110, height: 120}}>
        <CircularProgressbar
        value={roundedPercentage}
        text={roundedPercentage + "%"}
        strokeWidth={12}
        styles={buildStyles({
            textColor: "red",
            pathColor: "turquoise",
            trailColor: "gold",
        })}
        />            
              </div>


</div>
<div className='flex mt-4'>
<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">₹{movieData.amountRaised} Raised &nbsp; </h5> <h5 className='mb-2 text-2xl  tracking-tight text-gray-900 dark:text-white'>of&nbsp; ₹ {movieData.totalAmount} </h5>
</div>
       
</div>
        <div class="flex flex-col  mx-6 items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div class="flex items-end">
          <a  href="https://icons8.com/icon/12060/donate"></a>
          <Button className="flex items-center mx-4  " style={{width: "9rem", height:"3rem" , background: "#FFA500" }} onClick={toggleModal}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAElUlEQVR4nO2YbUxbVRzGr34x84vRj36Y0Sw6tjij38y++DIr0nuabdqhTAfqNhPfoBjHy8DNiHMMQ1u2YZMCDfQSRqWFMXpOgWC2OZIlzpdtJs4lLhqzKXNxYBcVVnjMOe0dLy2Fe2/hYsI/eZLmFji/55znnP+5SNJyLdf/p0Cz7wCz2UHlY6DkIpitkD+TlnqBkbVg8n4w8gcYwTRR8oswErCvkJZSocd6NyjZCSZ/kwSdSlQeAiN70W+/yzzoPXtuB7NtAJMDYPLovMBZkkbEakUs9yweePi5B8XsMfKzTmikWJEoKHGjz3bvwkAH7CsSG7IflExkDJzNlDwKSloQIasymW03KLmxcNAk1YqMgZImvtr64fvllfHjbxHBWZJ+0gffLd8JKn9vMjzAbG/pM8CXz2x4Kl/mJ512+LB1m+nwTMx+oXb4npysRd+wLJXkvzQ3ufhRKZ8zH55w1WqffUq8SwAc4gjtl1dqhLduNR2cqQaIVxt8T859opVrGGQ8bMVYp2V2dT2LWHc2JrRnP6a5eYESj5ZBYseycdWzDlcOZs2iNRgNPaM3Pu2a4IUBRn6d7wBjRy0Yqn84DXwWRloe1xudCUSsj2g3QMnN+Qzwb/Bp/HZ4bVr4Ic86TIStevN/RDN83IB8ea4//nfgCVw5tCYtvIhO5wad8HKM9yB9BpjcMNcA0db1c8AbiA4T8WnRBX/rBWWOGE2Ec/B7mvgYi44cA7M9pNuAMMFfInSvgpHoEG6g0RC8MBAhq/SswjXvY/qPTJbouj3WBwwbSL5Cy+PR8IuDg8EPjje3NV6qb237x6Mo8LV40N1Ujh+bbOJU0j/rRNXejMALA73kfj4jN+nG858f+exblxLCTDW3+XDx6Dv8qmsMnIrV/hCQbpMyWZe639x3WAmMcNgDvvbxov0HUVBahR0lZRjwFmCcGgRnQhTU9qiU6apr7Vjt8oeGOfxudwO2FFXihXfLUVbpQLR7k3FwKn+BMFkvLVQ5/cEvVXh74W4Bn19cgj+7EvB924FT9UDvFq3ggwiTp6SFLLc/ZFFjk+uoEPBc3k/fiENEcoGvTgNfnwNONc8352dArTnSYpTTH2zgBnjmVXiuAe+2OMxAcRxe6CzQ91o68PNgZHPGN2i6cinBC9xAfulH0wwwT0EiPvnAmbOTJo7vSwIfDueNIiLn6fpPgtFy+kNRbmBqfLiqP357EvJE7aSJEwduPb8aeh59HdVwKx1RwyCZNmAvLMdp39ZJE715QP+rog8Md22C4tqBl9+rED3CqQRHJLPKNUuEuF4pLsF3nbsQoxuFiWudm+Gr3YmXHKXxk6q0KtHoghdMM+BMbGLHJ9M3sSr+nVsJ4fX3dyV956g+pHZqbS/jC3GM1vgCsZkxUg1wzXyeW1SJGl/7uDDoD1kkM8uZopGlM8B/pqKuUY3PScnsquNXCSV4XTWRaiWmzvwU+OtOf5exF5JMlVvpeFK9D9Wol7myKmGGi3/mmVdjw+H570hLqepaO1arcUqv4MklM/NpNrbX6Q/94FKCN7jin0Ne0zfsci2XpKv+A4toJf7Z0SZYAAAAAElFTkSuQmCC" />
           Donate
          </Button>


          <Button className="flex items-center " style={{width: "10rem", height:"3rem"}}>
  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
            Download Documents
          </Button>
         
          </div>

        </div>
        <ul class="mt-8 space-y-2">
          <li class="flex items-center text-left text-sm font-medium text-gray-600">
            <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class=""></path>
            </svg>
            Supported Tax Benifits
          </li>

          <li class="flex items-center text-left text-sm font-medium text-gray-600">
            <svg class="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" class=""></path>
            </svg>
           Share for better reach
          </li>
        </ul>
        <div className='flex mt-6'>

        <a  href="https://icons8.com/icon/102561/verified-account" /> 
         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACw0lEQVR4nO1ZPW8TQRA9QYMoKSiACgjwL9KhwI5vJg4uoCANNCAhAvRuIE6QCV8liugQCvbsAS38AKx0kCDxEyB0CQE7sdGcMcTBye2e9+4S8JOmsE43fm9mdndmz/MGGGAAp1Cv1WFgmgKNi6BxVUwxLSiNJXnm7WQojTdBYx00tXob1iHwJ7ydCND4eGvi3aY0PsyUbGGusFfKwQ/8k8NPx/epwD9nSn5DNsbkXfEhvsRn4sRzL3PHQeOs0rj0V2nYC+h6p+0TZ0eYjiVCXjFdVhp/2BO1MxX+B15ySh40XkiaOGwWwjTuhPwZphOKaSVtAcC0LCWb6u7i3vCBCwFfsxKgNC71RX60Onowu+hTaKfnCgfiR7+SP5W1AFXJD8UX8Ar2A1MzMwFMTeEQW0B4wjI1kiJ45c21KAENObHjRZ/pUZLRnardba0111ovPlXd70ag8VYa5DswEmHaxYb9fKzexsyma+Uu8gL5ffVtRDlprI9UR49EC9BYSivygvXmeqs8P2PoAydNymfR+WLcJvLTtbLx/yimDyYCVm3IP/v4PIzivfn7CUae2gI0fnMqQMhvJNRLhCvy0M7ASvQaYFowcSaLLqokXJQNdK+B9yYZmDR1WHrXO7qSCZeRhz8ldDtSgB/4h2wmr62i7DbyZL6NhlkI/Akb570y4TLy0I7+dc8GcvXhQoQT8kwzVuR/Z0LjmE0zt1lE3+SZGmeZ8rHIx22nOyJcRB76bafjDjSyWPtbsORmoNn1I2XmQz3TF8/7369VVCU/JJdMqZNnWnZ2T5pjOp96+QT+RW83Xu4C03fnl7sdSEoV0xNZXK6v10Hj59B3JX/USxryMUKavs4HjvDEthQgJ+zwrw8c4qtYLO7xsoTsGIn3NkkDmG5sV06yhqy7yrQh5SBDkQzgMsOKySQFTHfkWeqEBhjgH8dP91Ujkmbl3W8AAAAASUVORK5CYII=" />
       <span className='mt-2 mx-2 h-8'><u>Documents</u>  Verified
        <p class="text-gray-500 whitespace-pre-line dark:text-gray-400">All the Bills are verified</p>
        </span>
        </div>
        <div className='flex mt-6'>

        <a  href="https://icons8.com/icon/102561/verified-account" /> 
         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACw0lEQVR4nO1ZPW8TQRA9QYMoKSiACgjwL9KhwI5vJg4uoCANNCAhAvRuIE6QCV8liugQCvbsAS38AKx0kCDxEyB0CQE7sdGcMcTBye2e9+4S8JOmsE43fm9mdndmz/MGGGAAp1Cv1WFgmgKNi6BxVUwxLSiNJXnm7WQojTdBYx00tXob1iHwJ7ydCND4eGvi3aY0PsyUbGGusFfKwQ/8k8NPx/epwD9nSn5DNsbkXfEhvsRn4sRzL3PHQeOs0rj0V2nYC+h6p+0TZ0eYjiVCXjFdVhp/2BO1MxX+B15ySh40XkiaOGwWwjTuhPwZphOKaSVtAcC0LCWb6u7i3vCBCwFfsxKgNC71RX60Onowu+hTaKfnCgfiR7+SP5W1AFXJD8UX8Ar2A1MzMwFMTeEQW0B4wjI1kiJ45c21KAENObHjRZ/pUZLRnardba0111ovPlXd70ag8VYa5DswEmHaxYb9fKzexsyma+Uu8gL5ffVtRDlprI9UR49EC9BYSivygvXmeqs8P2PoAydNymfR+WLcJvLTtbLx/yimDyYCVm3IP/v4PIzivfn7CUae2gI0fnMqQMhvJNRLhCvy0M7ASvQaYFowcSaLLqokXJQNdK+B9yYZmDR1WHrXO7qSCZeRhz8ldDtSgB/4h2wmr62i7DbyZL6NhlkI/Akb570y4TLy0I7+dc8GcvXhQoQT8kwzVuR/Z0LjmE0zt1lE3+SZGmeZ8rHIx22nOyJcRB76bafjDjSyWPtbsORmoNn1I2XmQz3TF8/7369VVCU/JJdMqZNnWnZ2T5pjOp96+QT+RW83Xu4C03fnl7sdSEoV0xNZXK6v10Hj59B3JX/USxryMUKavs4HjvDEthQgJ+zwrw8c4qtYLO7xsoTsGIn3NkkDmG5sV06yhqy7yrQh5SBDkQzgMsOKySQFTHfkWeqEBhjgH8dP91Ujkmbl3W8AAAAASUVORK5CYII=" />
       <span className='mt-2 mx-2 h-8'><u>KYC documents:</u> Verified
        <p class="text-gray-500 whitespace-pre-line dark:text-gray-400">All the KYC Documents are verified</p>
        </span>
        </div>
      
</div>
      </div>
      <div className='w-3/5  mx-4 flex justify-center'>
      <Button className='w-52' >
        Support
      </Button>


     <br />
     </div>
<div className='w-3/5  mx-4 flex justify-center'>
{   !support?   <img onClick={supportCounter} style={{cursor: "pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7klEQVR4nO2bfYiVRRSHH921DLdN+/gjLKIi+1yIqNyKMsEwjYgMMykKMivbxIrArAg2DbfAPwxbKMqi6EswE7PIPoSKwiIqoqDMCiuLCrebrbW5agycC4fT3LvrvfO+973jPDCw7L3v78yZOzPvzJkzkEgkEolEIpFIJBKJRCKRaH5GAZ3A9cASYDnQC/QAC4ApwKEB7Tmti4DbxEav2FwsdZgItFJwWoEZwBrgL2DvEGUQeBe4FWivwZ57Zj7wnmgNZW8H8BJwedEacyQwF/h2GE5UKn8C9wNtw7B3sPSsHXXY2wLMkbo3lFOAjypUcg/wFbAOeBpYCayW7/9d4ZmfgKlV7E0DtlV41ml+KDZWis1XpA57KjyzCTiZBnE10O9ptA3AzcD4Ks+6ITQJeBgoeTQeAEao77u/l3oaoiRz3QVDDMujgHnAm55GdNPNbHLmDo8zG2Wy3lfGyvD9x+g9C7RIed7T27qBQ2qwdw7wjudHu52cmOdx5roAuicBnxltNxSfNP/7BJgQwN4cz492Exkz2bzxtslyJRRtMmdWmvzXAmMC2jsX+Fnp75KpJRPGmQm8BJyagZ0Dgdc9jfcqcEAG9jpkFaBfZLVMDUPSa9Zw08kO58A3yt7mrJwSLgV2K3srQhs4Xrp32cAysudMsblL/s6a5cq/f4FjQ4o/osS3B96GVaNbSh4cDvyRRS8cDfQp4bvId089Kkd795iO4ubjurnErJfcojRWjjHr24tDiC5Tgm4bFjsfK38fCiH4lhJ0O4bYWaL8fSOE4FYleCXxc5Xy9/sQgjq25zbtsXOhCbPVjV7/1RIsaDYmmq1d3fyuBF3YPHamKn9/CyG4WQnOIn5mK39dMLZuNinBLuJnvvL3gxCCq5TgY8TP48rfF0II3qkEPyV+Plf+BolSn2/eSu5ULFbaTcD4vBCiLgI8oESvIV6uVX66cP9BoYTXmshwrGxQfrrj0WDMNMO42pFls3K0Gb5XhBQfbYKN7jw3NlYo//pCxQI1D5qjzPHEw5HATuWfO9jPJOSt81GeIB6eMgGEw7Iy1GOi01NofiabKLSLB2bGWDk31ceNY2he2iRTq+zPDxkfn/7vjGSv5K00K88YXy7Ly/CLxnAXzccCTzJTbowzmQMDTRYrnCaH5+X6fy3TU650mHB/v6SOFZ2zzWrC+XBaoyozy7zBfpWGLSqnmwj7btllNZQuM5dsl1+5aJxhGi9YuCoE3aZifQU7wZtktqKu3EfBWGoqOCB3NBrNDSYcl/liuR4Wmoq68miD7mW0mJ1TYXue5RbPxZf1NV6mqRW3m3jN1GFQ8rubgukmbdaVL3K6k+HSjr80tkuhMq3ypAP4zjjSL9nxWTHXc3dlS0a53LkNpTWeeWi17GZC4aaH5zx21ge20xBGysQ96OkZIXJtOj093dm619x2ano6zf65fL7SU2Mab6u89fWetpyS5o5io6RdljV2qLn0kRP3Qec4ueZqdVbFMGSHw0zZ8mnnd0qIqdqwc5/d6LmPXIr8vLpiQvdGTy9aJ+cvliPk+qr9/tuitV8yokKP+sXcG3ZZoz96euzCIlyaLgITJJXMvkkXS9HXsFx5Hzih0ZUuGi3A3Sal2Bb32SL5bqICZ5mTsnLZGipban+gXZIby433co7386JikZREIpFIJBKJRCJBRPwH+ZNLxWaRs1QAAAAASUVORK5CYII=" />      
 : <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD50lEQVR4nO2cy4vOURjHPy65bZQ7uS9YUCZJGAkRWQlJ0ZAQJUSy4A+QhYjFoKhhMQuS3URMuSyQkMiGGsmlKbzjOmbMo6Mjk1sz7/zO7zznfZ9PfetdzLzv8z3P75zzO1cwDMMwDMMwDMMwDMMwDMMwDMMwDMPIgzHAOqAaqAeeAW+ANuAD8BK4B9QC+4BKoGeAONx3zva/Uet/86WPoc3H1ABc8bGuBUZTIgwGdnnTUoTeASeBmRnEMgs4BRSKjOUusBMYRIIMAw4BH4s0L3/RLWBhEbEs8v+bVRyuJh0EhpIAPYBt/smWQKrrYBPimsiLAeN4C2wFuqOUEb7dlRxUANb8J5aqLjRNndUl3yKoYirwKqcCkHba/9sT6j4fiBDHC6ACJcwFmiIUgnjV+EQ4nYkYh6uRc2InY1rkZIjXMeC4gjgKvrWIwkjgtYJCEGVyY5rheSfDDa6uKTAvSlXv3zhzY7cC06JcO/JKxijgvQLDolxNfigQnGoFZiURHQmdDJfxLwqMSiL6HHrQuFeBSUlMe0Im5LECg5KYHoZKxkQF5iRRjQ+RkC0KjEmi2hgiIScVGJNEdSJEQm4oMCaJ6mqIhDxXYEwSlds/kDkaZnUlUbkV1MxpVWBMElVLiIRYDaFL6ySZY30IuvqQRwqqviSqByESUq/AmCSqyyESclSBMUlUh0MkxKZOKDohm0IkpFLBkyaJKou9yX/Q25ZuKSYZ733ZBeGCgqdNEtM5ArJZgUFJTBtCJsStD39VYFISUTMwhMCcVWBUEpE7oRWchQqMSiKal0dCuvmF+9hmJYHpEldWubBCgWFRrqXkiMv8TQWmRalu51k7frJAgXFRqDZ/iCkKpxUUgCiTO3odjYF2aIf2yWj0Z/OjslLBUylKtBwl2BEFfqwXqcHNZt5R8IRKJN0H+qKMcWXan7wCxqKUaRnfbyLK9QmYgXKWl8mmulZgGYng7pj6pqDQJODgL8gRg5Cs94GXYjK2kCibS6ymtKZYM35nVYmsMjb7QXBJsCTxzdoFYDElxmTgqYLClU7qiY+9JBmY461zkoGu57FJITY9E9knfALoRRmxw58sEmVq8Rd5liXTfRstStTg9zCXNf39/iWJrPPAgNiFoYmqSBOT7sae7TE2JaRARc5H59z+simxTWunj7+P91vg+Sh3k2m/2GZTojJQh+867vmxzaXc4ddkmIwa/51GBotejV28OH+1ZSFbhhR5gqsur9tBy5WNHTzr2BT69JLxiwl+682/kuFenSe1+3sjp9fjw//ouO11NvII/7OX+2womaScHjsIwzAMwzAMwzAMwzAMg5B8B/octMLmL5UhAAAAAElFTkSuQmCC"></img>}      
        </div>
     </div>
     <div className='w-3/5  mx-6 flex justify-center'>
      <p name="likes" value={currentLikes} >{currentLikes}</p>
     </div>

               <hr class="w-11/12 mx-12 mt-12 h-1  bg-gray-200 border-0 rounded dark:bg-gray-700" />

      

<div className='flex mt-2'>

<div class="w-64 mt-6 p-6 bg-white mb-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-16">
<img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" 
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFgklEQVR4nLWWa0wUVxTHbyU2aZrG9kvTfmrSpPZD06QfrElBrSCElwqiogiCKKwVLK9lh6ewsPIQgeLKLvKSxyKKpSigVUuUly5dLJJYgaK8Ksi6DrBzh6W1reXfzGBAHiqL9iT/TObemfu759xzz72EmGnj4+Of8TzP8DxfaDQaKyilxzmO8zQaje+S/8M4jvuY5/mLPM+D4yh6ewbR8WsPhocNENqMRuPEwMBAEgCL1wldTSkdHRp8iIzUcrjYM3BzisD2jZHY4sDAd5cCF2quixPo7++/odVq33plqMlk+pDjuIedHb1w3xyDLfZSrP8qaJYc14fCyToMIQFZYjTa29trCSFvvBKYUprHsqPY6RoLh69D5kEFWVsGi09nmzDk5ZwHpXRSrVbvXDKUZdl3KKV/aYovYdOG+Z4Ksl0bjO2O4dPvLvYReDD0EK2trfWEkOVL9XaTsG673RMWhAoqkqdCFZk0/b7VkUF1VRMMBoOREPLRUsFBAtjRWrpgePNiU/CvthTj9cXwcmHEdhvLIKQlnxITbeXKlVZLAvM8HysM4GAthY8rg0CPaETui0NBXCru1+QDLZppTdQXQx2VDNs1wYgIU4tgZ2fnzWZDTSbTBzzP/y4MsMlOhsvKrFmg50lYb2XGWRGs0+lqzM5uSulhjuMQ6JeODVbBaC1WLQos2xMHe2spKsoui9kdFBRkZxaY53lNV2cfQnwTMdFQsiiooMeNJRiszse3PgrR68TERJlZ4LGxsUz20SjcN0bhcdPiwYLqTyiRFKEUwd7e3gfM9dhK+LEkrxreblHIlB15KXD4QgFCfeLg6RqFztv3MDg4+IAQYmkWWLC+vr5KAR7onwEbq2D82Vj8QvCZ5DTYWAbjfFWTcGg8YRhGQQh532zw6OiogwDe73tU3KNCoXgedFJbiq32UxWs6vt66PX6EULIarIUo5Q6CmCJb5o4oN3aYPxclD0P+s/1EigC5GJUhO8qK64JlYsSQj5fEnh86tBHikIzXbGcrENw53QOBmvyYbhUiJ7KXFzM+g62a2YOkFttXeA47onBYBhkWbaZZdlwvV7/tllwg8Fwp79vCDu2xIuDOqwLEbdXW6kK2oJs3K3MxY2C47B+Cj2acgrDDwyou6ITa7YwCUopWJY16HS6dS8Fchz3HqX0CKWUF7y+VtcKf88kBOyInRfq3qpcuNqFQx5dgPwT1di2ORah0lTEJaXjG79kcanudg9gZGTEVF5evupFUDtK6ZjRyKH2XBP2uccjbGskdP7hmMw6PD+5Gothkspw2keGQ/tjoKoLhLp577Qyi5Kx000uRqKrq+sXQsibC0FX8Tw/0d72G/a4RiN5Wzh6AqSATDajkkxAWzoFvVoIpMaL7X/ESnHyqt8saFlrJH7qyEPCkXSolD+IZVQikWyYB6aUNggXOU8nBl0HwmcDn1V0JJB4CGCY6bYOVRByb0igbt43DR1i76GiTQ71lVDs9UoRq5lKpVLMhX4idGTIC1HrPcfLRehW3kHUdRbg9v0GlN+MFqFn2xKmvG/YL4ZbGD8nJ0c5C8zzvIvQ4ecWg1MeYajdbZ5qQoNFiK63BuyYfgbavBfHKuRgnp7TDMPEzPV4o9BRobmM7LRys+XrcRhZJxUiqEB7cGatGyXY7ZGApoZbYmFZsWKF7SwwgGXd3d21RqPxb2EC5qq35z683BOhSEtH9o+hUNdLcOxMPLw8EnAi+5z4jUajKXreXWwZIeRTQsiX5kgul3uOjIyM6/WPkKs6D/89adi1LQERYTmipzzPo6WlpdHCwkLI6Fe7c8+1srKyLzo6Om5yHDf5bCSE8Go0mpMWFhY2C+7h12TLJRKJtVKpjBeyVyaTRT9dUyG8057+B0VSGukfvq6PAAAAAElFTkSuQmCC"
class="rounded-full cursor-pointer w-10 h-10 mr-4" />
<h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Location</h5>
<span className='mt-2 h-8'><u>Address:</u> Verified</span>
<div>
    
<a  href="https://icons8.com/icon/TMYQ30SxsVAb/checked-user-female"></a>
<p class=" font-normal text-gray-500 dark:text-gray-400">{movieData.fundRaiserLocation}</p>
<p class=" font-normal text-gray-500 dark:text-gray-400"><u>PinCode</u> :{movieData.fundRaiserPinCode}.</p>

</div>

</div>
<div class="w-80 mt-6 p-6 bg-white mb-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex">
        <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="rounded-full cursor-pointer w-10 h-10 mr-4" 
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgSFRUVGBIYHBUcGBoYGBoYGBgaGBQaGRoYGBgcIS4lHB4rHxgYJjgmKz0xNTU1GiQ7Qz0zPy40NTUBDAwMEA8QHxISHzQrJSw0NDU/NDY0NDY3MTQ0Nj82NDQ2Nj00NDQ0NDQ0NDQ0NDQ0NjQ0NDQ2NDQxNjQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUGBwj/xAA9EAACAQIDBQUFBgUDBQAAAAABAgADEQQSIQUxQVFhBnGBkcETIjKhsQdCUnLR8BQjYpLCorLhM3OCo8P/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAkEQADAAICAwEAAQUAAAAAAAAAAQIDERIxBCFBUSIUYXGRof/aAAwDAQACEQMRAD8A9miIgCIiAIiIAiJYXgF8tzCQsxMQC81JaXMpEAXMREAReIgFQ5lwqSyIBKHEvmPKhrQCeJGr85JAEREAREQBERAEREAREQBERAEtY2lHa3fIiYBVmvKREAREQBERAEpKVKiqMzMFUbyxAA8TOY292jw1gq4qgdTmC1UPKwNj3yUrlSTeiN05ltLZtNp9ocNh0z1aqhb2GUFyTyyoCZp6X2h4BjY1HXq1J7fIEjxnN7TAxKOlIo90IBDAre1xqOtpyVXsxiVUuUSw/rW/hLMmGpf8faKsGeaX8/T/AA92wWNp1kD0nR0O5kYMO6449JkT532RtavhX9pRco+mYG+RxvAdPvD566Eb57T2T7TU8dTzAZayW9pTvcqTuZTxU8D4GZ09mlzr2b+IiSIiFa0RAJla8umPJUa8AviIgCIiAIiIAiIgCWM1u+VY2kJMAREQBERAERIsTiEpo1R2CU0BZmY2AA3kwC6rVVFLuwVFBLMxAVQN5JO4TzTtN9pJuaeCAtqDWdb3/wC2h+reXGc5207YPjWKJmTCKfdTcXI3O/ou4d85vErZ2HJm+TGRdFsz9ZLjsdVrtnrVHqNzdi1vyg6KOgtMeJQSJMvpuynMrMrc1JU+Ym5w3aaqBkq3qoN3vBHB6tlOYd4v1mkiSm6npkLxRa1S2ZGPxZq1HqMLFze2+wAAAvx0A1kuyNp1MNWSvSNnQ7uDqfiRuakeh3gTCIicbbe2SUpLS6PorY+00xNFMRTPuOL2O9SNGRuoII8JnTyb7Kds5Kz4Nj7lUF06VEX3gPzIP/WOc9Zkk9lVLTERE6REREAlRuEvmPJla8AuiIgCIiAIiRueEAsZrykRAEREAREQBPHPtI7SnEVThaZP8PSazWOlSop1J5qpuB1BPKek9r9qHDYStWU2cLlQ8nchFPgWzeE8BVdwFyfMn9ZGmWRP0ytlYM1ai0xuJux5KN59O8ibDbmwnRmqJd6ZJJt8S3NzcDeOonQ7B2Z7FLt/1HsW6clHd9ZtJirM1Xro2zhTn32eWAy4HrO12r2eSpd09yp0+E949R85yGNwL0jldbcjvU9x9N8vjJNdFNRU9kOYy4GWAyvUSwiXShlQYnAT7NxrUKqVlvmpsjC3HKwJHiLjxn0ejhgGGoIBHcRcT5oM+g+ylUtgsKxNyaNG55kU1BPyk5KrRtoiJIrEREASqm0pEAnlZFTbhJYAiIgCY7G5kr7pFAEREAREQBERAPP/ALXcRbD0aYPx1Sx6hEPq6+U4/sxsjdiHH5Af959PPlOo+1Rc1bAoRdS1S44G70QR5SkyeRbX8V9NvjQmtsRETEbBIcRh0dSrKCDvBFxJond6Bxe1+zrJd6V2X8O9h+U/e7t/fNBPUiLzntu7CD3qIAKnkH6Hk3X9jTjzfGZsmH7JyN+PnKy2xBIIII0IO8HrKiaigGe89hawfAYYjggTxQlD81M8GInsv2VVs2By/gqVF87P/nOz2V30dpERJlQiIgCIiAAZPIJLTOkAviIgEVUyyVc6ykAREQBERAERMbaGJ9nTZ+KjTvOg+ZE43pbZ1Lb0jh/tFGbE4MfhZz/dY/8Azmsxm0aVL43APIat5DWX7TdqlWi7MWYOxJPL2NTQche2kiGyqNyxRWYkkl/fJJ4+9PPyWqe2eljhzOkYqdocOTbMw6lTb5XmzoV0cZkZWXmDeYrYbDg2KUQeRVP0k1DCU0JZEVSRrlFgR1A0Mqrj8LJ39MiIiRJCGW+hmvxuzPaEk1aoHBVZQo8AuvjNc3ZxlN6dd1PUH6qZJSv0i2/iMXtPsvQ1lHvL8f8AUv4u8fTunNKZ3WGSuP5dYK62NnXXvVxYcONvrOO2jhfZVHp8Bqv5TqP08Jrw3tcWZss+9ohyaFuAIHmCfSewfZRhyuCZzueq7DuVUT6oZ5QlMmjcC5NRVHU5DYfOeudicelHDUcK6stQZsxOUrmd2beCfxCXKpT9souaa9I7GIiWlAiIgCIiAJdTOsthTrAMiIiAQNvlIiAIiIAiIgCa3b6Xw79ynyZTNlI8RSDoyHcysvmLSNrctEpeqTPOGW5B5XPyt6mZmytnCvUyPUCILHKp9+pzAJ0A7tZjVKZVirCzKSCOoOsoJ5ifGttbPVqeU6T0avaezqv8XSprlpYXM4rHIr5StyFIbUg2ABGupJ4TaVcEaLmkGzIFQ66FGYXZCOmh6ZhM0bTq6XKlhudlVnHcxF/HfMO/HidTzJJuSeZkrtOdIzYMF46bpmFspyU1+6SPAWPrMyYmzUsnezH529Jlyt9mpdGdsrZT4hjYhKamztoWvYHKq87HedO+c2xqPimwq0zZENRnNTKyi5HuKfiAO/x6X3FGoyMKiMyuNLrxH4WB0YdDJsXiQ93yKtQ72GbKSd7ZL7/G3Qy2ajj/AHMmfHmqty/X+dGvw7OCab/GuU34FXUMp6GxGk5rtfhrFKg5lT4+8v8Al5zqqaZb6kkkkk7yTvJmq7TUc1B+YAb+0g/S85jrVrRfUtxp9mF2VwgamHb7lVmXvFMKPK5PlOlM03ZVbYZTzZz/AKrek6PZuG9pUROBN2/KNT8tPGL3WRoRqY2d3QJyLfflW/fYXkkRPTPLEREAREQBERAJs0SG8QBEqZSAIiIAiIgCIiAcz2rwgGWqBYk5W66XUnroR5TnJ3G3qGag44qMw/8AHU/K84eed5E6rf6ej41co1+CIllZ8qk8Ba/dfU+V5QaCqJYAS6Ab6jUS1XBJAIJG/peAXREQBMfH081N15qw8wR6zIlGFxadT0w1tGB2Ww7HD0lVWZiCbAXPvMx9Z6FsLZfsVLNb2jb/AOkfhB+v/EwuweB9lgqJPxOiMe4qMo+ZPjOkm/HhSfJ9nnZcza4roRETQZxERAEREAREQBaJLliARuNZSX1RLIAiIgCIiAIiIBg7aw7VMNWpp8b0qqL+ZkZR8zPNtj4s1KKOb57ZXBFiGXQ3HA6X8Z6vOS27sFUZ8TS0DkNVQfDm3GovInTMONgdNb0eRHKdr4aPGvjWn9NHBibXYeFoVSUqi7k3W7MtxbVQAQLi1+evSYInlWj0KpStv/hy1XA6+6+VDw106ADSZuHREXKpFu/UnmZ6BT2Bhk3Uge/M31vL8RhcNSUu1OkoHEot+4aXJ6TU/HevbM39TG/4pnBBhzErMnaGNFV8wUKgFlFgLC97m3E+gmNMtJJ6RqW9exNnsPZ/tGzMP5aat1tqF/Xp3zUV6oRSzbh8+gnUdh7vh3qN99204ZQqrb5GW4I5V76KfIvjHrs3mzKWSjST8KU1/tQD0mTET0TzBERAEREAREQBKqJSXUxrAJoiIBY40kUyJAwtAKREQBERAEREASjqCCCLgggg8Qd4lZHXqqiNUY2VFZmPIKCT8hAOB2jSWnXeirBimUkXuyhxdQ3W3pzkBE89fbNQ4h8Vf+Y7szA6ghjfIf6QLDwHKdpsvaSV1zLow+JTvX9R1nnZcXF7XR6eLJtafZvqG3cSgyhww4Zxcjx3nxmDisRUrNmqsWtuG4DuA0EtiVvJbWmy5KZe0lv90JHXrKgzMbD5noJBi8cqafE/IcO88JqCXrPzPyUegnJnftkarXpFa9Z6rgAflXl++c9U7MYX2eGppvNix73Yt6zg8JhVQc2O8+g5Cek7PW1JByVP9omrx3tvRk8laS2ZMRE2GMREQBERAEREASSmJGBJwIBWIiAJHUXjJIgGPEMtogCIiAIiIAmi7bVcmAxJ502X+8hP8pvbzT9rcA1fB16SfGyXUc2Rg4XxK28ZxnV2fPR3zY9nkdsQuQ2Khm6EAWsehJE17Cb3sfb2zc8mn94v6Sm3qGaYW6R0p2nl0dCHHDh+/OYeI2i76D3RyG8+P6Tc1aSvoyg9/oZSlh0T4VA+vnMCqV8Njmn9NVhtms2r+6v+o+HDxm2o0lQZVFh+98kicdNklKQM9FoD3F/Kv0E86M9Dwb5kRuaqfNRNfidsyeZ0iaIibDEIiIAiIgCIlQLwC6mvGSygErAEREAREQC1lvIZkSx1v3wCKIlHYAEncIBHiK6qMzeA4maurjHbXcOQkNeqXYk7uAlJqjGkvZjvK2/XRsMLXLK1InKSpCtbcbb+pG/wnHY1nzMjszMrMDdiw0Nri86FWKm48Okx9vYcVFWqlP3luapUAaaG7DeeJvrbWZPNwvjyk2+DmSrjR5l2n2Pa9dBpvcDgfxjpz8+c0Gz8WaVRag4bxzB3j98QJ6XOH7SbI9k3tEH8tzu/C2/L3cvGY8WTkuNG/LHF8pOyw2IV0DqbqQCJNOK7LbTyP7Jj7jH3ejcvH6987USjJHGtF0VynYiIlZMTrOz20lKLSZgHW4AOmYX0sefC3ScnEsx5HD2ivJjVzpnpMTjNnbdqU7K3vpyJ94dzeh+U6nA45KoujXPFdzDvHrum/Hmm+uzz8mGo76MqJTML248uMrLSoREQBJUW3fKIvGSQBERAEREAREQBERALGW80+169gEHHU93ATdzCxmBWprubgR9DzElDSrbI2m50jRINJdJa1AqbMO48D3GRTYnvowNNP2JdTcruO8Ed4PCWxDWzqejGxuxFZVbDKbi4ZS1+GhBY/vpOW2phQ9N6bCxsw13qy7r9QROzRypuCQec1/ajEUxhalqQ/iH92mUUZmqObDrxJPQHlPOzeHp8oPTwebtcL/2eJbjcaT0bZNcvSRzvKqT3ka/Ocv2r2AcJ7C7q2endiu4OrHOBzAzJY8Z2mxdiVxh0b2bWVEvuv8AJsL3O/hM+eG10asNynvforEyaWAqtly02Ib4TlIB0vvOlra3mfguz9V2ZX/l5QDcgNe97WsbcDxmZY7rpGmssT2zTyqKWIVQSx0AAuSegm/fs6ALtVUsD8IGhAO697gkeXzmzb2SlTTpqGW9jYA6qVINt+/jL8fiZK7WjPk83HPT2aLB7BquGLWphfxA6m3Dp1m8WnSp29kqhlFs9veNxrrx8YqVWbUk+PoJYFno4fEiPb9s8vP5l5PS9IZiTfXv4zNw+K4N5/rMOX06ZJsBc/vfNFTLXszxVJ+jbSRU4mR4akVFibn6dBMiZH2bU9oRETh0REQBERAEREAREQBERALHQEWIBHWa3EbN4ofA+hm0iSmnPRCoVdnN1KbA2IIPWWTpGQEWIBHXWYdXZqn4SVPmPIy6cy+lFYWujTyF8KrOHOpUELyW/xG3MjS/K44m+zqbOcbrHuNj85jNQYb1YeBt5yxVL+lTip+HFfaNgi9OhYa+1CAjh7RT6os7LA1mVQAzZRuF77tB9Ji47CioEDfcdH8Ua4mZRIAA5Tihbb/STt8Ul82ZH8U267W8pYajHeSe83lLyskpSIOm+2W5esBZItJjuUnwMnTAsd4A7z+kOpXbOqKfSMWXBSTYAk9JsKez1G8k/ITLRANAAO6VVmXwsnA32YFHAE6sbDkN/nM+nTCiwFhL4lNW67NEwp6ErESJMREQBERAEREAREQBERAEREAREQCkrEQCkpKxBxmLit01FbfKxNGPoy5ClHfNvhoiSy9HMfZkysrEymtFIiIOlYiIAiIgCIiAIiIAiIgH/2Q==" alt="User dropdown" />
    </div>
            <h5 class="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Contact</h5>
            <p class="font-normal text-gray-500 dark:text-gray-400">Name: {movieData.fundraiserName}</p>
            <p class="font-normal text-gray-500 dark:text-gray-400">Email: {movieData.fundraiserContactEmail}</p>
            <p class="font-normal text-gray-500 dark:text-gray-400">Phone: +91 {movieData.fundraiserContactPhone}</p>

</div>

<div class="w-2/6 mt-6 p-6 h-64 mx-8 bg-white mb-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  


<p class="text-gray-500 whitespace-pre-line dark:text-gray-400 ml-5">Donate via Paytm/Google Pay/PhonePe</p>

<div class="border-b border-gray-700 mt-14" style={{borderLeft: "2px solid #D1D5DB" , height: "4.6rem" , width: "0rem" , maxWidth: '0', position: 'absolute', marginLeft: "8rem"}}>

</div>
<div class="inline-flex items-center justify-center w-64 mx-8">

    <hr class="w-32 h-1  bg-gray-200 border-0 rounded dark:bg-gray-700" />

    <svg class="w-4 h-4 text-gray-700 dark:text-gray-300 mx-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>

    <hr class="w-32  h-1 bg-gray-200 border-0 rounded dark:bg-gray-700" />
</div>
<div className='flex'>
        <img src='https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg' className='mt-8 ml-5' style={{height: "5rem" , width:"5rem"}}></img>
        <div className='w-48 mx-4 mt-7 ml-12'>

        <p class="font-normal text-gray-500 dark:text-gray-400">Name: Shivam Arora</p>
            <p class="font-normal text-gray-500 dark:text-gray-400" id='upi'>UPI: shivama224@okicici</p>
            <p class="font-normal text-gray-500 dark:text-gray-400">Phone: +91 7318937298</p>

        </div>
       

</div>
<div className='flex w-96'>
        <button type="button" class="w-32  mt-4  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleCopy}>{replaceText}</button>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48 " className='mt-6 mx-2'>
<path fill="#4527a0" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path fill="#fff" d="M32.267,20.171c0-0.681-0.584-1.264-1.264-1.264h-2.334l-5.35-6.25	c-0.486-0.584-1.264-0.778-2.043-0.584l-1.848,0.584c-0.292,0.097-0.389,0.486-0.195,0.681l5.836,5.666h-8.851	c-0.292,0-0.486,0.195-0.486,0.486v0.973c0,0.681,0.584,1.506,1.264,1.506h1.972v4.305c0,3.502,1.611,5.544,4.723,5.544	c0.973,0,1.378-0.097,2.35-0.486v3.112c0,0.875,0.681,1.556,1.556,1.556h0.786c0.292,0,0.584-0.292,0.584-0.584V21.969h2.812	c0.292,0,0.486-0.195,0.486-0.486V20.171z M26.043,28.413c-0.584,0.292-1.362,0.389-1.945,0.389c-1.556,0-2.097-0.778-2.097-2.529	v-4.305h4.043V28.413z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className='mt-3 mx-2' x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
<path fill="#0d47a1" d="M5.446 18.01H.548c-.277 0-.502.167-.503.502L0 30.519c-.001.3.196.45.465.45.735 0 1.335 0 2.07 0C2.79 30.969 3 30.844 3 30.594 3 29.483 3 28.111 3 27l2.126.009c1.399-.092 2.335-.742 2.725-2.052.117-.393.14-.733.14-1.137l.11-2.862C7.999 18.946 6.949 18.181 5.446 18.01zM4.995 23.465C4.995 23.759 4.754 24 4.461 24H3v-3h1.461c.293 0 .534.24.534.535V23.465zM13.938 18h-3.423c-.26 0-.483.08-.483.351 0 .706 0 1.495 0 2.201C10.06 20.846 10.263 21 10.552 21h2.855c.594 0 .532.972 0 1H11.84C10.101 22 9 23.562 9 25.137c0 .42.005 1.406 0 1.863-.008.651-.014 1.311.112 1.899C9.336 29.939 10.235 31 11.597 31h4.228c.541 0 1.173-.474 1.173-1.101v-8.274C17.026 19.443 15.942 18.117 13.938 18zM14 27.55c0 .248-.202.45-.448.45h-1.105C12.201 28 12 27.798 12 27.55v-2.101C12 25.202 12.201 25 12.447 25h1.105C13.798 25 14 25.202 14 25.449V27.55zM18 18.594v5.608c.124 1.6 1.608 2.798 3.171 2.798h1.414c.597 0 .561.969 0 .969H19.49c-.339 0-.462.177-.462.476v2.152c0 .226.183.396.422.396h2.959c2.416 0 3.592-1.159 3.591-3.757v-8.84c0-.276-.175-.383-.342-.383h-2.302c-.224 0-.355.243-.355.422v5.218c0 .199-.111.316-.29.316H21.41c-.264 0-.409-.143-.409-.396v-5.058C21 18.218 20.88 18 20.552 18c-.778 0-1.442 0-2.22 0C18.067 18 18 18.263 18 18.594L18 18.594z"></path><path fill="#00adee" d="M27.038 20.569v-2.138c0-.237.194-.431.43-.431H28c1.368-.285 1.851-.62 2.688-1.522.514-.557.966-.704 1.298-.113L32 18h1.569C33.807 18 34 18.194 34 18.431v2.138C34 20.805 33.806 21 33.569 21H32v9.569C32 30.807 31.806 31 31.57 31h-2.14C29.193 31 29 30.807 29 30.569V21h-1.531C27.234 21 27.038 20.806 27.038 20.569L27.038 20.569zM42.991 30.465c0 .294-.244.535-.539.535h-1.91c-.297 0-.54-.241-.54-.535v-6.623-1.871c0-1.284-2.002-1.284-2.002 0v8.494C38 30.759 37.758 31 37.461 31H35.54C35.243 31 35 30.759 35 30.465V18.537C35 18.241 35.243 18 35.54 18h1.976c.297 0 .539.241.539.537v.292c1.32-1.266 3.302-.973 4.416.228 2.097-2.405 5.69-.262 5.523 2.375 0 2.916-.026 6.093-.026 9.033 0 .294-.244.535-.538.535h-1.891C45.242 31 45 30.759 45 30.465c0-2.786 0-5.701 0-8.44 0-1.307-2-1.37-2 0v8.44H42.991z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className='mt-6' x="0px" y="0px" width="48" height="28" viewBox="0 0 48 48">
<path fill="#e64a19" d="M42.858,11.975c-4.546-2.624-10.359-1.065-12.985,3.481L23.25,26.927	c-1.916,3.312,0.551,4.47,3.301,6.119l6.372,3.678c2.158,1.245,4.914,0.506,6.158-1.649l6.807-11.789	C48.176,19.325,46.819,14.262,42.858,11.975z"></path><path fill="#fbc02d" d="M35.365,16.723l-6.372-3.678c-3.517-1.953-5.509-2.082-6.954,0.214l-9.398,16.275	c-2.624,4.543-1.062,10.353,3.481,12.971c3.961,2.287,9.024,0.93,11.311-3.031l9.578-16.59	C38.261,20.727,37.523,17.968,35.365,16.723z"></path><path fill="#43a047" d="M36.591,8.356l-4.476-2.585c-4.95-2.857-11.28-1.163-14.137,3.787L9.457,24.317	c-1.259,2.177-0.511,4.964,1.666,6.22l5.012,2.894c2.475,1.43,5.639,0.582,7.069-1.894l9.735-16.86	c2.017-3.492,6.481-4.689,9.974-2.672L36.591,8.356z"></path><path fill="#1e88e5" d="M19.189,13.781l-4.838-2.787c-2.158-1.242-4.914-0.506-6.158,1.646l-5.804,10.03	c-2.857,4.936-1.163,11.252,3.787,14.101l3.683,2.121l4.467,2.573l1.939,1.115c-3.442-2.304-4.535-6.92-2.43-10.555l1.503-2.596	l5.504-9.51C22.083,17.774,21.344,15.023,19.189,13.781z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" className='w-12 mt-2' viewBox="0 0 1024 466" id="upi"><path fill="#3d3d3c" d="M98.1 340.7h6.3l-5.9 24.5c-.9 3.6-.7 6.4.5 8.2 1.2 1.8 3.4 2.7 6.7 2.7 3.2 0 5.9-.9 8-2.7 2.1-1.8 3.5-4.6 4.4-8.2l5.9-24.5h6.4l-6 25.1c-1.3 5.4-3.6 9.5-7 12.2-3.3 2.7-7.7 4.1-13.1 4.1-5.4 0-9.1-1.3-11.1-4s-2.4-6.8-1.1-12.2l6-25.2zm31.4 40.3 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm44.2 0 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.5 0 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10H217l-1.4 5.7h-15.5l-4.5 18.9h-6.4zm29 0 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.5 0 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13H257l-1.4 5.9h-21.9zm29.3 0 9.6-40.3h8.6c5.6 0 9.5.3 11.6.9 2.1.6 3.9 1.5 5.3 2.9 1.8 1.8 3 4.1 3.5 6.8.5 2.8.3 6-.5 9.5-.9 3.6-2.2 6.7-4 9.5-1.8 2.8-4.1 5-6.8 6.8-2 1.4-4.2 2.3-6.6 2.9-2.3.6-5.8.9-10.4.9H263zm7.8-6h5.4c2.9 0 5.2-.2 6.8-.6 1.6-.4 3-1.1 4.3-2 1.8-1.3 3.3-2.9 4.5-4.9 1.2-1.9 2.1-4.2 2.7-6.8.6-2.6.8-4.8.5-6.7-.3-1.9-1-3.6-2.2-4.9-.9-1-2-1.6-3.5-2-1.5-.4-3.8-.6-7.1-.6h-4.6l-6.8 28.5zm59.7-12.1-4.3 18.1h-6l9.6-40.3h9.7c2.9 0 4.9.2 6.2.5 1.3.3 2.3.8 3.1 1.6 1 .9 1.7 2.2 2 3.8.3 1.6.2 3.3-.2 5.2-.5 1.9-1.2 3.7-2.3 5.3-1.1 1.6-2.4 2.9-3.8 3.8-1.2.7-2.5 1.3-3.9 1.6-1.4.3-3.6.5-6.4.5h-3.7zm1.7-5.4h1.6c3.5 0 6-.4 7.4-1.2 1.4-.8 2.3-2.2 2.8-4.2.5-2.1.2-3.7-.8-4.5-1.1-.9-3.3-1.3-6.6-1.3H335l-2.8 11.2zm40.1 23.5-2-10.4h-15.6l-7 10.4H341l29-41.9 9 41.9h-6.7zm-13.8-15.9h10.9l-1.8-9.2c-.1-.6-.2-1.3-.2-2-.1-.8-.1-1.6-.1-2.5-.4.9-.8 1.7-1.3 2.5-.4.8-.8 1.5-1.2 2.1l-6.3 9.1zm29.7 15.9 4.4-18.4-8-21.8h6.7l5 13.7c.1.4.2.8.4 1.4.2.6.3 1.2.5 1.8l1.2-1.8c.4-.6.8-1.1 1.2-1.6l11.7-13.5h6.4L399 362.5l-4.4 18.4h-6.4zm60.9-19.9c0-.3.1-1.2.3-2.6.1-1.2.2-2.1.3-2.9-.4.9-.8 1.8-1.3 2.8-.5.9-1.1 1.9-1.8 2.8l-15.4 21.5-5-21.9c-.2-.9-.4-1.8-.5-2.6-.1-.8-.2-1.7-.2-2.5-.2.8-.5 1.7-.8 2.7-.3.9-.7 1.9-1.2 2.9l-9 19.8h-5.9l19.3-42 5.5 25.4c.1.4.2 1.1.3 2 .1.9.3 2.1.5 3.5.7-1.2 1.6-2.6 2.8-4.4.3-.5.6-.8.7-1.1l17.4-25.4-.6 42h-5.9l.5-20zm10.6 19.9 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13H483l-1.4 5.9h-21.9zm29.2 0 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm65.1-34.8-8.3 34.7h-6.4l8.3-34.7h-10.4l1.3-5.6h27.2l-1.3 5.6H554zm6.7 26.7 5.7-2.4c.1 1.8.6 3.2 1.7 4.1 1.1.9 2.6 1.4 4.6 1.4 1.9 0 3.5-.5 4.9-1.6 1.4-1.1 2.3-2.5 2.7-4.3.6-2.4-.8-4.5-4.2-6.3-.5-.3-.8-.5-1.1-.6-3.8-2.2-6.2-4.1-7.2-5.9-1-1.8-1.2-3.9-.6-6.4.8-3.3 2.5-5.9 5.2-8 2.7-2 5.7-3.1 9.3-3.1 2.9 0 5.2.6 6.9 1.7 1.7 1.1 2.6 2.8 2.9 4.9l-5.6 2.6c-.5-1.3-1.1-2.2-1.9-2.8-.8-.6-1.8-.9-3-.9-1.7 0-3.2.5-4.4 1.4-1.2.9-2 2.1-2.4 3.7-.6 2.4 1.1 4.7 5 6.8.3.2.5.3.7.4 3.4 1.8 5.7 3.6 6.7 5.4 1 1.8 1.2 3.9.6 6.6-.9 3.8-2.8 6.8-5.7 9.1-2.9 2.2-6.3 3.4-10.3 3.4-3.3 0-5.9-.8-7.7-2.4-2-1.6-2.9-3.9-2.8-6.8zm47.1 8.1 9.6-40.3h6.4l-9.6 40.3h-6.4zm15.6 0 10-41.9 19 24.6c.5.7 1 1.4 1.5 2.2.5.8 1 1.7 1.6 2.7l6.7-27.9h5.9l-10 41.8-19.4-25.1-1.5-2.1c-.5-.8-.9-1.5-1.2-2.4l-6.7 28h-5.9zm65.1-34.8-8.3 34.7h-6.4l8.3-34.7h-10.4l1.3-5.6h27.2l-1.3 5.6h-10.4zm6.9 34.8 9.6-40.3h22l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7h-15.5l-3.1 13h15.5l-1.4 5.9h-22zm39.5-18.1-4.3 18h-6l9.6-40.3h8.9c2.6 0 4.6.2 5.9.5 1.4.3 2.5.9 3.3 1.7 1 1 1.6 2.2 1.9 3.8.3 1.5.2 3.2-.2 5.1-.8 3.2-2.1 5.8-4.1 7.6-2 1.8-4.5 2.9-7.5 3.3l9.1 18.3h-7.2l-8.7-18h-.7zm1.6-5.1h1.2c3.4 0 5.7-.4 7-1.2 1.3-.8 2.2-2.2 2.7-4.3.5-2.2.3-3.8-.7-4.7-1-.9-3.1-1.4-6.3-1.4h-1.2l-2.7 11.6zm18.9 23.2 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10h15.5l-1.4 5.7h-15.5l-4.5 18.9h-6.4zm52.8 0-2-10.4h-15.6l-7 10.4h-6.7l29-41.9 9 41.9h-6.7zm-13.9-15.9h10.9l-1.8-9.2c-.1-.6-.2-1.3-.2-2-.1-.8-.1-1.6-.1-2.5-.4.9-.8 1.7-1.3 2.5-.4.8-.8 1.5-1.2 2.1l-6.3 9.1zm62.2-14.6c-1.4-1.6-3.1-2.8-4.9-3.5-1.8-.8-3.8-1.2-6.1-1.2-4.3 0-8.1 1.4-11.5 4.2-3.4 2.8-5.6 6.5-6.7 11-1 4.3-.6 7.9 1.4 10.8 1.9 2.8 4.9 4.2 8.9 4.2 2.3 0 4.6-.4 6.9-1.3 2.3-.8 4.6-2.1 7-3.8l-1.8 7.4c-2 1.3-4.1 2.2-6.3 2.8-2.2.6-4.4.9-6.8.9-3 0-5.7-.5-8-1.5s-4.2-2.5-5.7-4.5c-1.5-1.9-2.4-4.2-2.8-6.8-.4-2.6-.3-5.4.5-8.4.7-3 1.9-5.7 3.5-8.3 1.6-2.6 3.7-4.9 6.1-6.8 2.4-2 5-3.5 7.8-4.5s5.6-1.5 8.5-1.5c2.3 0 4.4.3 6.4 1 1.9.7 3.7 1.7 5.3 3.1l-1.7 6.7zm.6 30.5 9.6-40.3h21.9l-1.3 5.6h-15.5l-2.4 10.1h15.5l-1.4 5.7H868l-3.1 13h15.5L879 381h-21.9z"></path><path fill="#70706e" d="M740.7 305.6h-43.9l61-220.3h43.9l-61 220.3zM717.9 92.2c-3-4.2-7.7-6.3-14.1-6.3H462.6l-11.9 43.2h219.4l-12.8 46.1H481.8v-.1h-43.9l-36.4 131.5h43.9l24.4-88.2h197.3c6.2 0 12-2.1 17.4-6.3 5.4-4.2 9-9.4 10.7-15.6l24.4-88.2c1.9-6.6 1.3-11.9-1.7-16.1zm-342 199.6c-2.4 8.7-10.4 14.8-19.4 14.8H130.2c-6.2 0-10.8-2.1-13.8-6.3-3-4.2-3.7-9.4-1.9-15.6l55.2-198.8h43.9l-49.3 177.6h175.6l49.3-177.6h43.9l-57.2 205.9z"></path><path fill="#098041" d="M877.5 85.7 933 196.1 816.3 306.5z"></path><path fill="#e97626" d="M838.5 85.7 894 196.1 777.2 306.5z"></path></svg>        </div>

</div>  


</div>

{/* Form DIV */}
<div class="max-w-full mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-16" style={{marginRight: "6rem"}}>
<div className='flex justify-between'>
    <div className='w-96'>
    <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
    </svg>
    <a href="#">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
    </a>
    <p class="mb-1 font-normal text-gray-500 dark:text-gray-400">Kerala's football craze received international attention during the last FIFA World Cup. Huge cutouts of players and celebrations across the state were shared by FIFA and others.</p>
    <div className='flex'>
        <WhatsappShareButton url='https://www.npmjs.com/package/react-share'>
    <Button className="flex items-center mt-4" style={{width: "9rem", height:"3rem" , background: "#16a34a" }}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48" className="mx-2">
<path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
</svg>

           Share
          </Button>

          </WhatsappShareButton>
          <FacebookShareButton url='https://www.npmjs.com/package/react-share' quote='Learn'>

          <Button className="flex items-center mt-4 mx-4" style={{width: "9rem", height:"3rem" , background: "#1877F2" }}>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  x="0px"
  y="0px"
  width="28"
  height="28"
  viewBox="0 0 48 48"
  className='mx-2'
>
  <linearGradient
    id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
    x1="9.993"
    x2="40.615"
    y1="9.993"
    y2="40.615"
    gradientUnits="userSpaceOnUse"
  >
    <stop offset="0" stopColor="#2aa4f4" />
    <stop offset="1" stopColor="#007ad9" />
  </linearGradient>
  <path
    fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
    d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
  />
  <path
    fill="#fff"
    d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
  />
</svg>

           Share
          </Button>
          </FacebookShareButton>

          </div>
        </div>
   
    <div className='w-3/5'>
    <div className="flex-container">
    <div className="border-div"></div>

    <div className="card">
  {hideForm && <h1 class="text-3xl mb-3 mx-14 font-extrabold dark:text-white"><small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Schedule In Person Meet</small></h1>}
  { hideForm && <form class="max-w-sm mx-16" onSubmit={onSubmitHandler}>
                          <div class="mb-1">
                              <label for="Name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                              <input type="Name" value={formData.name} name='name' onChange={onChangeHandler} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                          </div>
                          <div class="mb-1">
                              <label for="Email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                              <input type="Email" id="Email" value={formData.email} name='email' onChange={onChangeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                          </div>
                          <div class="mb-1">
                              <label for="Date" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date of Visit</label>
                              <input type="Date" id="Date" value={formData.date} name='date' onChange={onChangeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div class="flex items-start mb-1">
                              <div class="flex items-center h-5">
                                  <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              </div>
                              <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Submit my Details</label>
                          </div>
                          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onSubmitHandler}>Submit Query</button>
                      </form>}
                      <div className='w-11/12 flex  justify-center'>

                      { loading && <RotatingLines
  visible={true}
  height="96"
  width="96"
  color="#000000"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
/> }
  </div>

                      {isSubmitting && !loading &&   <div className='w-11/12 flex justify-start mx-32' > 
                      
   <img src = 'https://www.svgrepo.com/show/14478/email.svg'  style={{width: "4rem" , height: "4rem"}}></img><span><p class="text-gray-500 mx-4 mt-4 whitespace-pre-line dark:text-gray-400">Thankyou Mail Successfully Received</p></span></div>}

    </div>
    </div>

</div>
</div>
</div>


{/* End of Form DIV */}
<div class="max-w-lg mt-6 p-6 bg-white mb-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-16">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><u>Story</u></h5>
<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{movieData.description}</p>


</div>

   

    </>

  )
}

export default Index








