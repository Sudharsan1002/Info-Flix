import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../Contexts/ThemeContext'
import { BiSolidCameraMovie } from "react-icons/bi";

const Appheader = () => {
    const { theme, toggleTheme } = useTheme()
    

  return (
    <div className="flex items-center justify-around shadow-md py-4">
      <div className=" flex items-center gap-2">
        <BiSolidCameraMovie className="text-5xl" />
        <h1 className="text-4xl font-bold italic font-serif">INFO FLIX</h1>
      </div>
      <div className="menu flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-cyan-600 text-lg font-bold" : "text-lg font-bold"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-cyan-600 text-lg font-bold" : "text-lg font-bold"
          }
        >
          Search
        </NavLink>
      </div>

      <div>
        <button onClick={() => toggleTheme()} className='px-4 py-2 dark:bg-slate-400 text-lg bg-yellow-100 dark:text-black rounded-lg shadow-md dark:shadow-md'>
          {theme == "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
}

export default Appheader