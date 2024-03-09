import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard'; 
import { getAllMovies } from '../api-helpers/api-helpers';
import { useSelector } from "react-redux";
import LoadData from '../assets/LoadData.gif'
import './Load.css';

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]); // For combined result
  const [loading, setLoading] = useState(false);
  const categoryData = useSelector((state) => state.category);
  const searchQuery = useSelector((state) => state.search); 

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setTimeout(() => {
          setLoading(true);
          setAllMovies(data.movies);
          setDisplayMovies(data.movies); // Initialize displayMovies
        }, 3000);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = allMovies;

    // Apply category filter
    if (categoryData.value) {
      filtered = filtered.filter(movie => movie.category === categoryData.value);
    }

    // Apply search filter
    if (searchQuery && searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(query));
    }

    setDisplayMovies(filtered);
  }, [allMovies, categoryData.value, searchQuery]); 

  return (
    <>
      <div className='flex flex-wrap mx-12'>
        {!loading ? ( 
          <img src={LoadData} className='LoadData' />
        ) : (
          displayMovies.map((movie, index) => ( 
            <MovieCard
              id={movie._id}
              title={movie.title}
              posterURL={movie.posterURL}
              releaseDate={movie.releaseDate}
              description={movie.description}
              key={index}
              category={movie.category}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Movies;
