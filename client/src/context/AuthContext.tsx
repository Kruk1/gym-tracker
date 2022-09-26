import React, { useState, useContext } from 'react'

const AuthContext = React.createContext(undefined)
const AuthSetContext = React.createContext(function(info: undefined){})

export function useAuth()
{
    return useContext(AuthContext)
}

export function useSetAuth()
{
    return useContext(AuthSetContext)
}

export function AuthProvider({ children }: {children: React.ReactNode})
{
    const[auth, setAuth] = useState()

    function authChange(info: undefined)
    {
        setAuth(info)
    }

    return(
        <AuthContext.Provider value={auth}>
            <AuthSetContext.Provider value={authChange}>
                {children}
            </AuthSetContext.Provider>
        </AuthContext.Provider>
    )
}