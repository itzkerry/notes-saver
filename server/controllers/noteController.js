
import User from '../models/user.js';

export const createNote = async (req,res)=>{
    // console.log(req.body);
    const {userId, title, content} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: 'User not found'});

        const newNote = user.notes.create({title,content});
        
        user.notes.push(newNote);
        await user.save();

        res.status(201).json({message: 'Note created successfully', note: newNote});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: 'Internal server error'});   
    }
}

export const getNotes = async (req,res)=>{
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: 'User not found'});

        const notes = user.notes;
        res.status(200).json({notes});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const deleteNote = async (req,res)=>{
    const {userId,noteId} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: 'User not found'});

        user.notes = user.notes.filter(note => note._id.toString() !== noteId);
        await user.save();
        res.status(200).json({message: 'Note deleted successfully'});
    }catch(err){
        console.log("ERROR : ",err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const updateNote = async (req,res)=>{
    const {userId,notesId,title,content} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: 'User not found'});

        const note = user.notes.id(notesId);
        if(!note) return res.status(404).json({message: 'Note not found'});

        note.title = title;
        note.content = content;
        await user.save();

        res.status(200).json({message: 'Note updated successfully', note});
    }catch(err){
        res.status(500).json({message: 'Internal server error'});
    }
}
