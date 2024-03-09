import express from 'express';
import {addMovie, getMovieById, getMovies}  from '../Controllers/movie-Controller';
const movieRouter = express.Router();

movieRouter.post("/" , addMovie);
movieRouter.get("/" , getMovies);
movieRouter.get("/:id" , getMovieById);
export default movieRouter;