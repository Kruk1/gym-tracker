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

const HeightContext = React.createContext<number>(0)
const HeightSetContext = React.createContext(function(info: number){})

export function useAuth()
{
    return useContext(AuthContext)
}

export function useSetAuth()
{
    return useContext(AuthSetContext)
}


export function useHeight()
{
    return useContext(HeightContext)
}

export function useSetHeight()
{
    return useContext(HeightSetContext)
}

export function AuthProvider({ children }: {children: React.ReactNode})
{
    const[auth, setAuth] = useState({
        login: '',
        id: ''
    })

    const [height, setHeight] = useState(0)

    function heightChange(info: number)
    {
        setHeight(info)
    }

    function authChange(info: authInfo)
    {
        setAuth(info)
    }

    return(
        <AuthContext.Provider value={auth}>
            <AuthSetContext.Provider value={authChange}>
                <HeightContext.Provider value={height}>
                    <HeightSetContext.Provider value={heightChange}>
                        {children}
                    </HeightSetContext.Provider>
                </HeightContext.Provider>
            </AuthSetContext.Provider>
        </AuthContext.Provider>
    )
}