import {useState, useEffect} from 'react'
import { useHeight } from '../context/AuthContext';
import '../css/cleanStyle.css';
import '../css/timer.css'
import Loading from './loading';

function Timer() {
    const [isRendering, setIsRendering] = useState(false)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const height = useHeight()

    useEffect(() => 
    {
        setTimeout(rendered, 1000)
    })

    function rendered()
    {
        setIsRendering(true)
    }

    return (
        <>
            {!isRendering ? <Loading /> :
            <main id='timer-main'>
                <h1>Timer</h1>
                <h2>You can setup your training break</h2>
                <section className="timer">
                    {minutes}:{seconds}
                </section>
            </main>}
        </>
    );
}

export default Timer;