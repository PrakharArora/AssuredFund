import jwt from 'jsonwebtoken';
import Movie from '../Models/Movies'
import mongoose from 'mongoose';
import Admin from '../Models/Admin';


export const addMovie = async (req , res , next) =>{
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }


    let AdminId;

    // verify token
    jwt.verify(extractedToken, "MYSECRECTKEY", (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: `${err.message}` });
      } else {
        AdminId = decrypted.id;
        return;
      }
    });

    //create new movie
    const {title , description, releaseDate,  posterURL,  admin ,   featured  , InstituteName ,  amountRaised , totalAmount , fundRaiserLocation ,fundraiserName , fundraiserContactPhone , fundraiserContactEmail , fundRaiserPinCode , ratepercentage , category} = req.body;
    if(!title && title.trim() === "" && !description && description.trim() === "" && !posterURL && posterURL.trim() === "" && !admin && admin.trim() === "" && !releaseDate && releaseDate.trim() && !amountRaised && amountRaised.trim() && !totalAmount && totalAmount.trim() && !fundRaiserLocation && fundRaiserLocation.trim() && !fundRaiserPinCode && fundRaiserPinCode.trim() &&!fundraiserName&& fundraiserName.trim() && !fundraiserContactPhone && fundraiserContactPhone.trim() &&   !fundraiserContactEmail && fundraiserContactEmail.trim() && !fundRaiserPinCode && fundRaiserPinCode.trim() && !InstituteName && InstituteName.trim() && !category && category.trim()){
        res.status(400).json({message: "Invalid Movie"});
    }
    let movie;
    try {
    movie = new Movie({title,description,releaseDate,featured, admin , posterURL,amountRaised,totalAmount , InstituteName , amountRaised , totalAmount , fundRaiserLocation , fundRaiserPinCode ,fundraiserName, fundraiserContactEmail , fundraiserContactPhone , ratepercentage , category} );
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(AdminId);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(movie);
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
};

export const getMovies = async(req , res , next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (error) {
        console.log(error.message);
    }
    if(!movies) {
        return res.status(500).json({messgae: "No Movies Found"});
    }
    return res.status(201).json({message: "Movies Fetched Successfully" , movies});
}

export const getMovieById = async(req , res , next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);
    } catch (error) {
        console.log(error.message);
    }
    if(!movie){
        return res.status(500).json({messgae: "No movie found by this id"});
    }
    res.status(200).json({message: "Movie Found" , movie})
}