import React, { useState } from 'react';
import './style.css';
import  logo from './logo.png'
import { event } from 'jquery';
import creating from './Creating.gif'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {addNewFundraiser} from '../../api-helpers/api-helpers'
function CreateFundraiser() {
    const [loading , setLoading] = useState(false);
    const [hideForm , setFormHidden] = useState(true);
    const [created , setIsCreated] = useState(false);
    const adminId = localStorage.getItem("AdminId");
    const [data , setData] = useState({
        title: "",
        description: "",
        fundraiserName: "",
        lastname: "",
        fundraiserContactEmail: "",
        fundraiserContactPhone: "",
        totalAmount: 0,
        fundRaiserLocation: "",
        fundRaiserPinCode: "",
        InstituteName: "",
        releaseDate: "",
        posterURL: "",
        amountRaised: 0,
        category: "",
        adminId: adminId
    });

    const handleChange = (e) => {
        setData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
      }
      
      const handleSubmit = (event) => {
        event.preventDefault();
        setFormHidden(false);
        setLoading(true)

        console.log('All Data', data);
        try {
          addNewFundraiser({ ...data })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(()=>{
            setLoading(false);
            setIsCreated(true);
            }, 5000)
        }
      };
  return (
    <>
    <div className='mt-8 w-full'>

    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-14 mt-4 ">Create FundRaiser</h5>
    <hr className="my-4 w-full mx-8 mt-10" />

    </div>

   <div className="flex mt-1 w-full mx-16 h-4/5 mb-12 " style={{ width: '60rem' }}>

 <form onSubmit={handleSubmit}  >
 {hideForm &&  !loading && <div className='w-96'>

<div>
            <label for="first_name"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" name="title" value={data.title} onChange={handleChange} id="first_name" class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2 w-full">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" name='fundraiserName' value={data.fundraiserName} onChange={handleChange} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" name='lastname' value={data.lastname} onChange={handleChange} id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe"  /> 
        </div>


     <div>
            <label for="fundraiserContactPhone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input type="number" name='fundraiserContactPhone' value={data.fundraiserContactPhone} id="fundraiserContactPhone" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
        <div>
            <label for="fundraiserContactEmail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="fundraiserContactEmail" name='fundraiserContactEmail' value={data.fundraiserContactEmail} onChange={handleChange} d="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add fundraiserContactEmail  "  required/>
        </div>
        <div>
            <label for="totalAmount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Needed</label>
            <input type="number" name='totalAmount' value={data.totalAmount}  onChange={handleChange} id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount to be raised"  required/>
        </div>
     
        <div>   
            <label for="posterURL" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
            <input type="posterURL" name='posterURL' value={data.posterURL} onChange={handleChange} d="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add fundraiserContactEmail  "  required/>
        </div>
        
       <div>
        <label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
        <input type="fundRaiserLocation" name='fundRaiserLocation' value={data.fundRaiserLocation} onChange={handleChange} id="Text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Jersey"  required/>
    </div> 
    
      <div>
        
        <label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <select id="category" name='category' value={data.category} onChange={handleChange}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option selected >Select</option>
    <option value="Animal">Animal</option>
    <option value="Adult">Adult</option>
    <option value="Parental">Parental</option>
    <option value="Child">Child</option>
    <option value="Sports">Sports</option>
    <option value="Personal">Personal</option>
    <option value="SocialCause">SocialCause</option>
    </select>
    </div> 
    
    </div>
    <div className='mb-6 mt-2'> 
            <label for="amountRaised" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Raised Till Now</label>
            <input type="number" name='amountRaised' value={data.amountRaised} onChange={handleChange} id="amountRaised" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  required/>
        </div>
    <div className='w-58'>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" name='description' value={data.description} onChange={handleChange} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>  
    <div className='mb-6 mt-2'> 
            <label for="fundRaiserPinCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
            <input type="number" name='fundRaiserPinCode' value={data.fundRaiserPinCode} onChange={handleChange} id="fundRaiserPinCode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  required/>
        </div>
        <div className='mb-6 mt-2'>
            <label for="Institute Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institute Name</label>
            <input type="text" name='InstituteName' value={data.institutename} onChange={handleChange} id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add fundraiserContactEmail  " required />
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2 w-full">
            <div>

        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Date of Funds</label>
        <input type="date" name='releaseDate' value={data.lastdate} onChange={handleChange}  id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"  required/>
            </div>
            <div>
        <label for="ADMINID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ADMIN ID</label>
        <input type="text" name='AdminId' value={adminId} onChange={handleChange}  id="AdminId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" disabled />
            </div>
 
    </div> 
    <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-green focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>
    </div> }

    {  loading && <div className='loading'>
    <img src={creating} class='loadingSpinner' />     
    <p className='loadingText'> Please wait Creating the Profile</p>
    </div>}
   {created && <div className='creatingProfile'>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
<circle cx="24" cy="24" r="20" fill="#4dd0e1"></circle><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659l-6.083-6.084c-0.879-0.878-0.879-2.303,0-3.182 c0.878-0.879,2.304-0.879,3.182,0l6.083,6.084c0.879,0.878,0.879,2.303,0,3.182C23.643,30.47,23.067,30.69,22.491,30.69z"></path><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659c-0.879-0.878-0.879-2.303,0-3.182l9.539-9.539 c0.878-0.879,2.304-0.879,3.182,0c0.879,0.878,0.879,2.303,0,3.182l-9.539,9.539C23.643,30.47,23.067,30.69,22.491,30.69z"></path>
</svg>
<p className='creattext m-3'>Profile Created Successfully</p>
    </div>}

</form>

      <div className="flex-1 p-2">
      </div>
    <div>
 
    <div className="flex border-b border-gray-700 ml-48 " style={{ borderLeft: '2px solid #D1D5DB', height: '60.6rem', width: '1rem', maxWidth: '0',  }}>
</div>
    </div>
    
    <div>

<div>
        
        </div>

 <img src = {logo}  class='logo' className='mx-8'/>
</div>
    </div>


      </>
  );
}

export default CreateFundraiser;
