import {createSlice} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchNotes, createNote, updateNote, deleteNote } from './noteThunks';


const initialState = {
    notes: [],
    isLoading: false,
    error: null,
}

export const notesSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        // addToNotes:(state,action) =>{
        //     state.notes.push(action.payload);
        //     localStorage.setItem('notes',JSON.stringify(state.notes));
        //     toast.success('Note added successfully');
        // },

        // updateToNotes:(state,action)=>{
        //     const note = action.payload;
        //     const index = state.notes.findIndex((n)=>n.id === note.id);
        //     if(index !== -1){
        //         state.notes[index] = note;
        //         localStorage.setItem('notes',JSON.stringify(state.notes));
        //         toast.success('Note updated successfully');
        //     }
        // },

        // deleteFromNotes:(state,action)=>{
        //     const id = action.payload;
        //     state.notes = state.notes.filter((note) => note.id !== id);
        //     localStorage.setItem('notes',JSON.stringify(state.notes));
        //     toast.success('Note deleted successfully');
        // },

        // setNotes:(state,action)=>{
        //     state.notes = action.payload;
        //     localStorage.setItem('notes', JSON.stringify(state.notes));
        // }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(fetchNotes.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(fetchNotes.fulfilled, (state,action)=>{
                state.notes = action.payload;
                // console.log(state.notes);
                state.isLoading = false;
            })
            .addCase(createNote.fulfilled, (state,action)=>{
                state.notes.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state,action)=>{
                const idx = state.notes.findIndex(note=> note._id === action.payload._id);
                if(idx !== -1){
                    state.notes[idx] = action.payload;
                }
            })
            .addCase(deleteNote.fulfilled, (state,action)=>{
                const deleteId = action.meta.arg.noteId;
                state.notes = state.notes.filter(n => n._id !== deleteId);
            });
    }
})

// export const {addToNotes, updateToNotes, deleteFromNotes, setNotes} = notesSlice.actions;

export default notesSlice.reducer;