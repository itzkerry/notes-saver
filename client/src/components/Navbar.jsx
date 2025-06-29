import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ui/ThemeToggle'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/user/userSclice'

const Navbar = ({logOut}) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex flex-row justify-between items-center p-2 px-4 pt-6 lg:px-20 gap-4 sm:gap-8">
                <div className="text-xl sm:text-4xl font-extrabold text-indigo-500 ">
                    NOTES
                </div>

                <div className="relative flex flex-row gap-2 sm:gap-8 text-sm font-bold sm:text-2xl font-serif justify-center items-end">
                    <NavLink to="/"
                        className={({ isActive }) =>
                            `group px-3 py-2   text-indigo-400 rounded-md transition-all ${isActive ? "bg-indigo-50  text-indigo-600 dark:bg-indigo-900/50 " : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`
                        }>
                        Home
                    </NavLink>
                    <NavLink to="/notes" className={({ isActive }) =>
                            `group px-3 py-2  text-indigo-400 rounded-md transition-all ${isActive ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`
                        }>
                        Notes
                    </NavLink>

                </div>

                <div className="flex gap-2 sm:gap-4 pr-1">
                    <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-xs sm:text-sm  px-3 sm:px-4 py-1 sm:py-4"
                        onClick={()=>{dispatch(logoutUser()); logOut()}}
                    >
                        LogOut
                    </Button>
                    <ThemeToggle />
                </div>
            </div >
        </>
    )
}

export default Navbar