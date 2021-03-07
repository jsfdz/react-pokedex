import React, { createContext, useEffect, useState } from 'react'
import { app } from '../services/FireBase'


export const
    Auth = createContext(),

    AuthContext = ({ children }) => {
        const
            [user, setUser] = useState(null)

        useEffect(() => {
            app.auth()
                .onAuthStateChanged(user => setUser(user))
        }, [])

        return (
            <Auth.Provider value={{ user }}>
                {children}
            </Auth.Provider>
        )
    }