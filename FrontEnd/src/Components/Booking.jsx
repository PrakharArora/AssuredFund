import React from 'react';
import { useSelector } from 'react-redux';
import {Button} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {removeFromBookMark} from './Store/Index'

function Booking() {
  const bookmark = useSelector(state => state.bookmark.bookmark);
  console.log('Data received', bookmark);
  const dispatch = useDispatch();


  return (
    <>
      {bookmark.length > 0 ? (
        bookmark.map(bookmark => (
          <div key={bookmark.id} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-16 mt-8" style={{ width: "65rem" }}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bookmark.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{bookmark.description}</p>
            <div className='flex justify-end'>
             <Button onClick={()=>dispatch(removeFromBookMark(bookmark.id))}>
              Remove
             </Button>
            </div>
        </div>
        ))
      ) : (
        <h5 className="mt-8 mx-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No Bookmarks Available</h5>
        )}
    </>
  );
}

export default Booking;