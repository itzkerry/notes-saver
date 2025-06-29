import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


const ViewNote = () => {
  const {id} = useParams();
  const allNotes = useSelector((state)=>state.note.notes);
  const notes = allNotes.find((note)=>note._id === id);
  
  return (
    <div className="">
        <div className='flex flex-row gap-7 place-content-between'>
            <input
            type="text"
            className='p-2 border-2 border-gray-200 rounded-lg w-full font-bold'
            placeholder='Enter Title here'
            value={notes.title} 
            disabled/>
        </div>
        <div className="w-full">
            <textarea
                className='rounded-lg mt-6 p-4 border w-full border-gray-400'
                value={notes.content}
                placeholder='Enter content here'
                rows={20}
                disabled/>
        </div>
    </div>
  )
}

export default ViewNote