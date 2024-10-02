import React from 'react'
import Appheader from './Components/Appheader'
import { ThemeProvider } from './Contexts/ThemeContext'
import {   Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Search from './Components/Search';
import { ApiProvider } from './Contexts/ApiContext';
import { MovieProvider } from './Contexts/MovieContext';
import MovieDetail from './Components/MovieDetail';


const App = () => {
 
  return (
    <ThemeProvider>
      <ApiProvider>
        <MovieProvider>
          <div className="rounded-xl  container mx-auto dark:bg-gradient-to-bl dark:from-slate-800 dark:to-slate-500 bg-gradient-to-tr from-blue-200 to-yellow-200 min-h-screen dark:text-white">
            <Appheader />
            <div className="">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="*" element={<p>404 - Page Not Found</p>} />
              </Routes>
            </div>
          </div>
        </MovieProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App