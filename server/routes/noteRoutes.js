import {createNote, getNotes, updateNote, deleteNote} from '../controllers/noteController.js';
import express from 'express';

const router = express.Router();

router.post('/create',createNote);
router.get('/:userId', getNotes);
router.put('/update', updateNote);
router.delete('/delete', deleteNote);

export default router;