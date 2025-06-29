import { 
    fetchNotesAPI,
    createNoteAPI,
    updateNoteAPI,
    deleteNoteAPI,
} from "./noteService";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (userId,thunkAPI) =>{
        try{
            return await fetchNotesAPI(userId);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (body, thunkAPI) =>{
        try{
            return await createNoteAPI(body);
        }catch(err){
            console.log(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async (body, thunkAPI) =>{
        try{
            return await updateNoteAPI(body);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (body, thunkAPI) =>{
        try{
            return await deleteNoteAPI(body);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }

)