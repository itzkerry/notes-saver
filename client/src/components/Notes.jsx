import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../features/notes/noteThunks';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import getFirstWord from '../utils/helper/getFirstWord';

const Notes = () => {
  const notes = useSelector((state) => state.note.notes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(id) {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) dispatch(deleteNote({ userId, noteId: id }));
  }

  return (
    <div>
      <input
        type="search"
        className="p-2 w-full rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white min-w-[350px] mb-5"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="border border-gray-400 dark:border-gray-600 p-5 max-h-[80vh] overflow-y-scroll rounded-2xl bg-white dark:bg-gray-900">
        <div className="text-2xl font-bold p-1 border-b border-gray-300 dark:border-gray-700 mb-5 text-gray-800 dark:text-gray-100">
          ALL NOTES
        </div>

        <div className="flex flex-col gap-5">
          {filteredData.length > 0 &&
            filteredData.map((note) => (
              <div
                key={note?._id}
                className="border border-gray-500 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white"
              >
                <div className="flex flex-row justify-between text-lg">
                  <div className="font-semibold">
                    {note.title}
                  </div>
                  <div className="flex gap-2 h-fit">
                    <button className="px-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-transparent hover:border-gray-300 dark:hover:border-gray-500 rounded-sm">
                      <Link to={`/?notesId=${note?._id}`}>
                        <i className="ri-edit-2-line"></i>
                      </Link>
                    </button>

                    <button className="px-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 hover:text-blue-500 dark:hover:bg-gray-600 border border-transparent hover:border-gray-300 dark:hover:border-gray-500 rounded-sm">
                      <Link to={`/notes/${note?._id}`}>
                        <i className="ri-eye-line"></i>
                      </Link>
                    </button>

                    <button
                      className="px-1 bg-gray-100 dark:bg-gray-700 hover:text-red-500  hover:bg-gray-50 dark:hover:bg-gray-600 border border-transparent hover:border-gray-300 dark:hover:border-gray-500 rounded-sm"
                      onClick={() => handleDelete(note._id)}
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>

                    <button
                      className="px-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-50 hover:text-green-400 dark:hover:bg-gray-600 border border-transparent hover:border-gray-300 dark:hover:border-gray-500 rounded-sm"
                      onClick={() => {
                        try{
                          navigator.clipboard.writeText(note.content);
                          toast('Text Copied!', { icon: '📋' });
                        }catch(err){
                          console.log("COPY ERROR : ",err);
                        }
                      }}
                    >
                      <i className="ri-file-copy-2-line"></i>
                    </button>
                  </div>
                </div>

                <div className="text-start">
                  {getFirstWord(note.content)}
                  <div className="float-right p-1 text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(note.createdAt), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>
            ))}

          {filteredData.length === 0 && (
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {searchTerm.length ? 'NO MATCH FOUND' : 'NOTES EMPTY'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
