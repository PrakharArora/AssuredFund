import mongoose from 'mongoose';
import Bookings from '../Models/Bookings';
import Movie from '../Models/Movies';
import User from '../Models/User';
export const newBooking = async (req, res, next) => {
  const { movie , seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    console.error("Error finding movie or user:", err);
    return res.status(500).json({ message: "Error finding movie or user" });
  }

  if (!existingUser || !existingMovie) {
    return res.status(909).json({ message: "Movie or User not found" });
  }

  let booking;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    booking = new Bookings({
      movie,
      seatNumber,
      user
    });

    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
     
    await existingUser.save({ session ,  });
    await existingMovie.save({ session ,  });
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.error("Error creating booking:", err);
    return res.status(500).json({ message: "Error creating booking" });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};


export const getBookingById = async(req , res , next)=> {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (error) {
    return console.log(error.message);
  }
  if(!booking){
    res.status(500).json({message: "Unexpected Error Occured"});
  }
  return res.status(200).json({message: "Booking found with this id" , booking});
}




export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
      booking = await Bookings.findByIdAndDelete(id).populate('user movie');
      if (!booking) {
          return res.status(404).json({ message: "Booking not found with this ID" });
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      if (booking.user && booking.user.Bookings) {
          await booking.user.Bookings.pull(booking);
          await booking.user.save({ session });
      }
      if (booking.movie && booking.movie.Bookings) {
          await booking.movie.Bookings.pull(booking);
          await booking.movie.save({ session });
      }

      await session.commitTransaction();
  } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ message: error.message });
  }

  return res.status(200).json({ message: "Booking Deleted Successfully" });
};

