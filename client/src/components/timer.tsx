import React, {useState, useEffect, useRef} from 'react'
import { useHeight } from '../context/AuthContext';
import '../css/cleanStyle.css';
import '../css/timer.css'
import Loading from './loading';

function Timer() {
    const [isRendering, setIsRendering] = useState(false)
    const [isEnabledTimer, setIsEnabledTimer] = useState(false)
    const [isTimeForExercise, setIsTimeForExercise] = useState(false)
    const [heightCenter, setHeightCenter] = useState<number>()
    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0,
        minutesBreak: 0,
        secondsBreak: 0
    })
    const counter = useRef<any>()
    const exerciseBreakMinuteInput = useRef<any>()
    const exerciseExerciseMinuteInput = useRef<any>()
    const exerciseBreakSecondsInput = useRef<any>()
    const exerciseExerciseSecondsInput = useRef<any>()
    const height = useHeight()

    useEffect(() => 
    {
        setTimeout(rendered, 1000)
        setHeightCenter(window.innerHeight - height)
    })

    function rendered()
    {
        setIsRendering(true)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        if(parseInt(event.target.value) < 60)
        {
            setTimer(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
        }
    }

    function startBreakTimer()
    {
        if(timer.seconds > 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject, 
                        seconds: prevObject.seconds - 1
                    }
                })
        }
        else if(timer.seconds <= 0 && timer.minutes > 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject,
                        minutes: prevObject.minutes - 1, 
                        seconds: prevObject.seconds + 59
                    }
                }) 
        }
        else if(timer.seconds === 0 && timer.minutes === 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject,
                        minutes: exerciseBreakMinuteInput.current.value, 
                        seconds: exerciseBreakSecondsInput.current.value
                    }
                })
            setIsTimeForExercise(true)
        }
    }

    function startExerciseTimer()
    {
        if(timer.secondsBreak > 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject, 
                        secondsBreak: prevObject.secondsBreak - 1
                    }
                })
        }
        else if(timer.secondsBreak <= 0 && timer.minutesBreak > 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject,
                        minutesBreak: prevObject.minutesBreak - 1, 
                        secondsBreak: prevObject.secondsBreak + 59
                    }
                }) 
        }
        else if(timer.secondsBreak === 0 && timer.minutesBreak === 0)
        {
            setTimer(prevObject =>
                {
                    return {
                        ...prevObject,
                        minutesBreak: exerciseExerciseMinuteInput.current.value, 
                        secondsBreak: exerciseExerciseSecondsInput.current.value
                    }
                })
            setIsTimeForExercise(false)
        }
    }

    useEffect(() =>
    {
        if(isEnabledTimer)
        {
            if(!isTimeForExercise)
                counter.current = setTimeout(startBreakTimer, 1000)
            else
                counter.current = setTimeout(startExerciseTimer, 1000)
        }
        else
        {
            clearTimeout(counter.current)
        }
    }, [isEnabledTimer, timer])

    function setTimerButton(event: React.MouseEvent<HTMLButtonElement>)
    {
        setIsEnabledTimer(prevState => !prevState)
    }

    return (
        <>
            {!isRendering ? <Loading /> :
            <main id='timer-main' style={{height: heightCenter}}>
                <div className="titles">
                    <h1>Timer</h1>
                    <h2>You can setup your training break</h2>
                </div>
                <section className="timer">
                    <h3>{!isTimeForExercise ? 'Break!' : 'Exercise!'}</h3>
                    {!isTimeForExercise ? `${timer.minutes}:${timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}` : 
                    `${timer.minutesBreak}:${timer.secondsBreak < 10 ? `0${timer.secondsBreak}` : timer.secondsBreak}`
                    }
                </section>
                <section className="inputs-timer">
                    <div className="exercise-align">
                        <div className="exercise-timer">
                            <h3>Break timer</h3>
                            <div className="exercise-timer-inputs">
                                <div className="minutes-container">
                                    <label htmlFor="minutes">Minute:</label>
                                    <input type="number" name='minutes' className='time-input' onChange={handleChange} ref={exerciseBreakMinuteInput} />
                                </div>
                                <div className="seconds-container">
                                    <label htmlFor="seconds">Seconds:</label>
                                    <input type="number" name='seconds' className='time-input' onChange={handleChange} ref={exerciseBreakSecondsInput} />
                                </div>
                            </div>
                        </div>
                        <div className="exercise-timer">
                            <h3>Exercise timer</h3>
                            <div className="exercise-timer-inputs">
                                <div className="minutes-container">
                                    <label htmlFor="minutes">Minute:</label>
                                    <input type="number" name='minutesBreak' className='time-input' onChange={handleChange} ref={exerciseExerciseMinuteInput} />
                                </div>
                                <div className="seconds-container">
                                    <label htmlFor="seconds">Seconds:</label>
                                    <input type="number" name='secondsBreak' className='time-input' onChange={handleChange} ref={exerciseExerciseSecondsInput} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={setTimerButton}>Set Timer</button>
                </section>
            </main>}
        </>
    );
}

export default Timer;