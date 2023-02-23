import React from "react";
import {createContext, useState } from "react";
export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [auth, setAuth] = useState({user:'', email:'', id:'', fav:[]})
    const [value, setValue] = useState('')


    return (
        <AuthContext.Provider value={{auth, setAuth, value, setValue}}>
            {children}
        </AuthContext.Provider>
    )
}

