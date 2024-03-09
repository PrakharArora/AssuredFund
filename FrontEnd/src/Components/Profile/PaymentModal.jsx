import React , {useEffect ,useContext, useState} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-international-phone/style.css';
import Typography from '@mui/joy/Typography';
import axios from 'axios';


export default function ResponsiveModal({isModalOpen , toggleModal}) {
  let btnVal;
  const [Currency, setCurrency] = React.useState('INR');
  const [value , setValue] = React.useState(Currency);
  const [input , setInput] = React.useState();
  const [IndianCitizen , setIndianCitizen] = React.useState(false);
  const [checkBox , setCheckBox] = React.useState(false);
  const [formData , setFormData] = React.useState({
    Currency: Currency,
    ammount: '',
    fullname: '',
    email: '',
    phone: '',
    IndianCitizen: '',
    TaxBenifits: '',
  });
  const checkBoxHandler = (event) => {
    const isChecked = event.target.checked;
    setIndianCitizen(prevState => !prevState);
     setFormData(prevFormData => ({
      ...prevFormData,
      IndianCitizen: isChecked,
    }));
    if(isChecked == false){
      setFormData(prevFormData => ({
        ...prevFormData,
        TaxBenifits: 'NO',
      }));
    }
}


const TaxBenifitHandler = (event) => {
  const isChecked = event.target.checked;
   setFormData(prevFormData => ({
    ...prevFormData,
    TaxBenifits: isChecked,
  }));
  
  
}


  useEffect(() => {
    setFormData(prevFormData => ({
        ...prevFormData,
        Currency: Currency,
        input: input,        
    }));
}, [Currency , input]);


  
const buttonValueInput = (event) => {
  const value = event.target.value;
  setInput(value);
  setFormData(prevFormData => ({
    ...prevFormData,
    ammount: value,  
  }));
}
 
const data ={
  name: formData.fullname,
  amount: input,
  number: formData.phone,
  MUID: "MUID" ,
  transactionId: 'T' + Date.now(),
}
   
    const donationHandler = (event) => {
      const {name , value} = event.target;
      setFormData((prevFormData)=> ({
        ...prevFormData,
        [name]:value
      }))
      
      if(name=="Currency"){
        setCurrency(value);
        setValue(value);
      }
      if(name == "ammount"){
        setInput(event.target.value);
      }
    }
  
    const handlePayment = (e) => {
      e.preventDefault();
        
      axios.post('http://localhost:5000/new-payment', data, {
          withCredentials: true,  // Include credentials (cookies) in the request
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:5173',  // Replace with your frontend origin
          },
      })
      .then(res => {
        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        console.log('Redirecting URL' , redirect);
      })
      .catch(error => {
          console.error(error);
      });
  }
    

    let currencySymbol = '';
    if(Currency == 'INR') {
        currencySymbol = '₹'
    }
    else if(Currency == 'USD')
    {
        currencySymbol = '$'
    }
    else if (Currency == 'EURO') currencySymbol = '€'

  
  return (
    <React.Fragment>
   
  { isModalOpen &&   <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isModalOpen}
      onClose={toggleModal}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
              <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Transaction Details
          </Typography>
          <div className='flex justify-around mb-2'>
          <Button color='success' value = {1500} onClick={buttonValueInput} >
          {currencySymbol} 1500
            </Button>
            <Button color='success' value = {3500} onClick={buttonValueInput} >
            {currencySymbol} 3500
            </Button>
            <Button color='success' value = {6500} onClick={buttonValueInput}>
            {currencySymbol} 6500
            </Button >
            <Button color='success' value = {9000} onClick={buttonValueInput}>
            {currencySymbol} 9000
            </Button>
          </div>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            <div className='flex justify-none w-96'>
            <div className='mx-2'>
            <h5>Payment Currency</h5>
            </div>
            <div className='flex mx-16'>
            <label htmlFor="Ammount" className="text-sm font-medium leading-6 text-gray-900">Amount</label>
            </div>
            </div>
            <div className='flex justify-none w-96'>
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        name="Currency"
        value={formData.Currency}
        label="Currency"
        onChange={donationHandler}
        className='mr-8 w-36'
        >
        <MenuItem value={'INR'}>INR</MenuItem>
        <MenuItem value={'USD'}>USD</MenuItem>
        <MenuItem value={'EURO'}>EURO</MenuItem>
      </Select>
        </FormControl>     
        <div>

    <div className="relative mt-2 rounded-md shadow-sm ml-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
      </div>
      <input type="number" value={formData.input} name="ammount" id="ammount" onChange={donationHandler}  className="block w-48 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00" />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor="currency" className="sr-only">Currency</label>
        <div id="currency" name="currency" className="h-full mt-4 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">{value}</div>
      </div>
    </div>
        </div>
        </div>
            <form onSubmit={handlePayment}>
   
       
    

 
   <div className='flex'>
  <div class="mb-2 mx-1">
    <label for="Name" class="block mb-2 mx-1 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="Name" value={formData.fullname} onChange={donationHandler} id="Name" name ="fullname"  class="shadow-sm  w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Full Name" required />
  </div>
  <div class="mb-5 mx-4">
    <label for="Email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
    <input type="Email" id="Email" name='email' value={formData.email} onChange={donationHandler} class="shadow-sm border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Email@email.com'  />
  </div>
   </div>
 
   <label for="Number" class="block mb-2 mx-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
   <div class="flex items-center mb-4 w-96 mx-1">
    <input type="phone" id="phone" name='phone' value={formData.phone} onChange={donationHandler} class="shadow-sm border mr-8 w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='+91987654321' required />
       
    <div class="flex items-center">
        <input 
            id="citizen" 
            type="checkbox" 
            value="" 
            class="form-checkbox h-4 w-4  text-blue-600 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
            checked={IndianCitizen}
            onChange={checkBoxHandler}
            />
        <label 
            for="citizen" 
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap"
            >
            Yes, I am an Indian Citizen
        </label>
    </div>
</div>


  <div class="flex items-start mb-5 mx-1">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4  border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
{IndianCitizen && <div className='mb-5 flex item-start'>
<input id="Indian" type="checkbox" value="" onChange={TaxBenifitHandler}  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
<label for="Indian" class="ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">I wish to claim Tax Benefits for this donation. <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>

</div>}
  <button type="submit" class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-orange-800">Donate Now <pan>{currencySymbol}</pan><span>{input}</span></button>
</form>

          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>}
    </React.Fragment>
  );
}
