import { useEffect, useState } from 'react'
import { useHeight } from '../context/AuthContext'
import '../css/cleanStyle.css'
import '../css/error.css'
import Loading from './loading'

function Error404() {
    const height = useHeight()
    const [isRendering, setIsRendering] = useState(false)

    function rendered()
    {
        setIsRendering(true)
    }
    
    useEffect(() =>
    {
        setTimeout(rendered, 1000)
    })

    return (
        <>
            {!isRendering ? <Loading/> : (
                <main id='error-404' style={{height: window.innerHeight - height}}>
                    <h1>ERROR 404</h1>
                    <h2>Page not found!</h2>
                </main>)
            }
        </>
    );
}

export default Error404;