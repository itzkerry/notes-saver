import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const fetchNotesAPI = async(userId) =>{
    const res = await axios.get(`${API_URL}/api/notes/${userId}`);
    return res.data.notes;
};

export const createNoteAPI = async(body) =>{
    const res = await axios.post(`${API_URL}/api/notes/create`,body);
    return res.data.note;
};

export const updateNoteAPI = async(body) =>{
    const res = await axios.put(`${API_URL}/api/notes/update`,body);
    return res.data.note;
}

export const deleteNoteAPI = async(body) =>{
    const res = await axios.delete(`${API_URL}/api/notes/delete`,{data:body});
    return res.data.message;
}