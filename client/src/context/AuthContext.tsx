import React, { useState, useContext } from 'react'

type authInfo = 
{
    login: string,
    id: string
}

const AuthContext = React.createContext<authInfo>({
    login: '',
    id:''
})
const AuthSetContext = React.createContext(function(info: authInfo){})

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
    const[auth, setAuth] = useState({
        login: '',
        id: ''
    })

    function authChange(info: authInfo)
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