import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { createNote, updateNote } from '../features/notes/noteThunks';
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [isSaving,setIsSaving] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const notesId = searchParams.get("notesId");
  const allNotes = useSelector((state) => state.note.notes);
  const userId = JSON.parse(localStorage.getItem('userId')); //do not change


  const createNotes = async ()=> {
    if (!title.trim() || !value.trim()) {
      if(!title.trim()) return toast.error("Title is empty");
      if(!value.trim()) return toast.error("Content is empty");
    }
    
    if (notesId) {
      // update
      setIsSaving(true);
      try{
        await dispatch(updateNote({userId,notesId,title,content:value})).unwrap();
        toast.success("Note Updated !");
      }catch(err){
        toast.error(err || "Error Updating note");
      }finally{
        setIsSaving(false);
      }
    } else {
      // create
      setIsSaving(true);
      try{
        await dispatch(createNote({userId,title,content:value})).unwrap();
        toast.success("Note Created !");
      }catch(err){
        toast.error(err || "Error creating note");
      }finally{
        setIsSaving(false);
      }
    }
    setTitle('');
    setValue('');
    setSearchParams((params) => {
      params.delete("notesId");
      return params;
    });
  }

  useEffect(() => {
    if (notesId) {
      const note = allNotes.find((note) => note._id == notesId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
      }
    }
  }, [notesId, allNotes]);


  return (
    <div className="">

      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="p-2 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg w-[70%]"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createNotes}
          className="bg-gray-50 dark:bg-gray-700 text-black dark:text-white cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1 hover:border-[#646cff] dark:hover:border-indigo-400"
        >
          {notesId ? `${isSaving ? "Updating.." : "Update"}` : `${isSaving ? "Saving.." : "Create"}`}
        </button>
      </div>

      <div className="w-full">
        <textarea
          className="rounded-lg mt-6 w-full p-4 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )

}

export default Home