import { PropTypes } from 'prop-types';
import { useContext, useState } from 'react';
import { createContext } from "react";

const ThemeContext = createContext()


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark')
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
    }
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={theme}>{children}</div>
      </ThemeContext.Provider>
    );
}

ThemeContext.propTypes = {
 children: PropTypes.node.isRequired,
}


export const useTheme=()=>useContext(ThemeContext)