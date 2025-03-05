 'use client'

import { useEffect, useState } from "react"
import { UserContext, PuzzleContext, ThemeContext, HelpfulContext } from "../context";

 export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});


    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
}

export const PuzzleProvider = ({children}) => {
    const [puzzleInfo, setPuzzleInfo] = useState({});


    return (
        <PuzzleContext.Provider value={{puzzleInfo, setPuzzleInfo}}>
            {children}
        </PuzzleContext.Provider>
    );
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("night-sky");

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || "night-sky";
        if(savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme)
        }
    }, []);

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme)
    }


    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const HelpfulProvider = ({children}) => {
    const [helpfulMessage, setHelpfulMessage] = useState({});


    return (
        <HelpfulContext.Provider value={{helpfulMessage, setHelpfulMessage}}>
            {children}
        </HelpfulContext.Provider>
    );
}

