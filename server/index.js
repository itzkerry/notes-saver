import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import noteRoutes from './routes/noteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
const  app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notes',noteRoutes);
app.use('/api/users',userRoutes);

const PORT  = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>console.log("server running on port 5000"));
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})
