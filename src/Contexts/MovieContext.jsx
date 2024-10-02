import { PropTypes } from 'prop-types';
import { createContext, useContext, useState } from "react";

const MovieContext = createContext()
export const useMovie = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState(null)
    return (
        <MovieContext.Provider value={{ selectedMovie,setSelectedMovie }}>
            {children}
        </MovieContext.Provider>
    );
}

 MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};