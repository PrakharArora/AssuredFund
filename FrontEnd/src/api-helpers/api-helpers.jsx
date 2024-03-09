import axios from 'axios';
import SignUp from '../Components/SignUp';
import { data } from 'jquery';



export const getAllMovies = async () => {
    try {
    const response = await axios
      .get('/movie');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
  };

  export const sendUserSignUpRequest = async (data, signup) => {
    return axios.post(`/user/signup`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
      .catch((err) => {
        console.log(err.message);
        throw err;
      })
      .then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Unexpected error occurred");
        }
        const resData = await res.data;
        console.log("success");
        return resData;
      });
  };



  export const sendUserSignInRequest = async (data, login) => {
    return axios.post(`/user/login`, {
      email: data.email,
      password: data.password,
    })
      .catch((err) => {
        console.log(err.message);
        throw err;
      })
      .then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Unexpected error occurred");
        }
        const resData = await res.data;
        console.log("success");
        return resData;
      });
  };
  export const AdminLoginRequest = async (data) => {
    return axios.post(`/admin/login`, {
      email: data.email,
      password: data.password,
    })
      .catch((err) => {
        console.log(err.message);
        throw err;
      })
      .then(async (res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Unexpected error occurred");
        }
        const resData = await res.data;
        console.log("success");
        return resData;
      });
  };


  export const getMovieDetails = async (id) => {
    try {
        const res = await axios.get(`/movie/${id}`);
        if (res.status !== 200) {
            console.log("Unexpected Error");
            return; // Return undefined if there's an unexpected error
        }
        console.log('API response:', res.data);
        return res.data;
    } catch (err) {
        console.log(err);
        return; // Return undefined in case of an error
    }
}

export const getLikesData = async (id) => {
  try {
    if (!id) {
      console.error('Error: id is undefined'); // Log error for visibility
      return null;
    }

    const res = await axios.get(`/bookings/${id}`);
    console.log(res.bookings)
  } catch (err) {
    console.log(err.message);
  }
}




export const countLikes = async(data) => {

  const res = await axios.post('/bookings' , {
      movie: data.movie,
      seatNumber: data.seatNumber,
      user: localStorage.getItem("userId")
    })
   .catch ((err) => console.log(err)); 
  if(res.status!==201){
    return console.log("unexpected error")
  }
  const resData = await res.data;
  return resData;
}

export const addNewFundraiser = async (data) => {
  try {
    const res = await axios.post('/movie', {
      title: data.title,
      description: data.description,
      releaseDate: data.releaseDate,
      posterURL: data.posterURL,
      totalAmount: data.totalAmount,
      fundRaiserLocation: data.fundRaiserLocation,
      fundRaiserPinCode: data.fundRaiserPinCode,
      fundraiserName: data.fundraiserName,
      InstituteName : data.InstituteName,
      fundraiserContactEmail: data.fundraiserContactEmail,
      fundraiserContactPhone: data.fundraiserContactPhone,
      amountRaised: data.amountRaised,
      category:data.category,
      admin: localStorage.getItem("AdminId")
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`
      }
    });

    if (res.status !== 201) {
      console.log("Unexpected Error Occurred");
      return null; // or handle the error differently
    }

    const resData = await res.data;
    return resData;
  } catch (err) {
    console.log(err);
    return null; // or handle the error differently
  }
};


// export const getAllMovies = async () => {
//     const res =  await axios
//     .get('http://localhost:5000/movie')
//     .then(response => {
//         console.log(response.data);
//     });

//     if(res.status!==200){
//         return console.log("No Data");
//     }
//     const data = await res.data;
//     return data;
// }


