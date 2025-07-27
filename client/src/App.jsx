import React, { useEffect , useState} from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Note from './components/Note'
import Notes from './components/Notes'
import Login from './components/Login'
import { fetchNotes } from './features/notes/noteThunks'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const App = () => {

  const [showLogin, setShowLogin] = useState(true);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const onSuccess = ()=>{
    setUserId(JSON.parse(localStorage.getItem("userId")));
    setShowLogin(false);
  }

  useEffect(()=>{
    const storeUserId = JSON.parse(localStorage.getItem("userId"));
    setUserId(storeUserId);
  },[]);

  useEffect(() => {
    if(userId){
      // toast.success(userId);
      dispatch(fetchNotes(userId));
      setShowLogin(false);
    }
  }, [dispatch,userId]);

  const logOut = ()=>{
    setShowLogin(true);
  }
  return (
    <>
      {showLogin && <Login onSuccess={onSuccess}/>}
      <Navbar  logOut={logOut}/>
      <main className='flex flex-col max-w-[500px] min-w-[320px] p-4 mx-auto text-center'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<Note />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App