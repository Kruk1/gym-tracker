import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import '../css/cleanStyle.css';
import '../css/training.css'
import axios from 'axios';
import Loading from './loading';
import Day from './day';

type day = 
{
    day: string;
    exercises: string[];
    _id: string;
}

type trainingType = {
    _id: string;
    name: string;
    description: string;
    days: day[];
    createdBy: string;
    lastUpdate: Date;
}

type exercise = 
{
    name: string;
    results: number;
    id: string;
}

function Training() {
    const [isRendering, setIsRendering] = useState(false)
    const [isModalShown, setIsModalShown] = useState(false)
    const [idDay, setIdDay] = useState('')
    const [exerciseCreateInfo, setExerciseCreateInfo] = useState<exercise>(
        {
            name: '',
            results: NaN,
            id: ''
        }
    )
    const {id} = useParams()
    const [training, setTraining] = useState<trainingType>()
    const navigate = useNavigate()

    useEffect(() => 
    {
        getTrainingInfo()
    }, [])

    async function getTrainingInfo()
    {
        try
        {
            const res = await axios.get(`/training/GetTrainingDetails?id=${id}`)
            if(!res.data)
                navigate('/plans')
            setTraining(res.data)
            setTimeout(rendered, 1000)
        }
        catch(e: any)
        {
            const error = e.response.data
            if(error.authRedirect)
            {
                navigate('/', {state: error.message})
            }
        }
    }

    function rendered()
    {
        setIsRendering(true)
    }

    async function deleteTraining(event: React.MouseEvent<HTMLButtonElement>)
    {
        await axios.delete(`/training/DeleteTraining?id=${id}`)
        navigate('/plans', {state: 'Training deleted!'})
    }

    async function redirectToHomepage(event: React.MouseEvent<HTMLButtonElement>)
    {
        navigate('/plans')
    }
    
    function getIdOfDay(day: any)
    {
        setIdDay(day._id)
    }

    function showModal()
    {
        setIsModalShown(prevState => !prevState)
        setExerciseCreateInfo({
            name: '',
            results: NaN,
            id: ''
        })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setExerciseCreateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        try
        {
            event.preventDefault()
            await axios.post(`/training/CreateExercise`,
            {
                name: exerciseCreateInfo.name,
                results: exerciseCreateInfo.results,
                trainingId: id,
                idDay: idDay
            })
            setIsRendering(false)
            setIsModalShown(false)
            setExerciseCreateInfo(
                {
                    name: '',
                    results: NaN,
                    id: ''
                }
            )
            getTrainingInfo()
            console.log('Created')
        }
        catch(e)
        {
            console.log('went wrong')
        }
    }

    const days = training?.days.map((day, index) =>
    {
        const dayProps = 
        {
            index: index + 1,
            showModal: showModal,
            getIdOfDay: getIdOfDay,
            day: day,
            setIsRendering: setIsRendering,
            getTrainingInfo: getTrainingInfo
        }
        return (
            <Day props={dayProps} key={day._id}/>
        )
    }) 

    return (
        <>
            {!isRendering ? <Loading /> : 
                <main className="training-container">
                    <h1>{training?.name}</h1>
                    <section className="buttons">
                        <button aria-label='Back' className='back-btn' onClick={redirectToHomepage}>Back to Homepage</button>
                        <button aria-label='Update' className='update-btn'>Update Training</button>
                        <button aria-label='Delete' className='delete-btn' onClick={deleteTraining}>Delete Training</button>
                    </section>
                    <section className="days">
                        {days}
                    </section>
                    {isModalShown && 
                    <>
                        <div className="backdrop" onClick={showModal}></div>
                        <section className="modal-add-exercise" style={{height: window.innerHeight}}>
                            <form onSubmit={handleSubmit}>
                                <div className="name-input-container training-input-container">
                                    <label htmlFor="name">Exercise name</label>
                                    <input type="text" name='name' className='name-input training-input' onChange={handleChange}/>
                                </div>
                                <div className="number-input-container">
                                    <label htmlFor="results">Start value(must be a number)</label>
                                    <input type="number" step="any" name='results' className='name-input training-input' onChange={handleChange}/>
                                </div>
                                <input type="text" name='id' value={idDay} onChange={handleChange} hidden/>
                                <button>Create exercise</button>
                            </form>
                        </section>
                    </>
                    }
                </main>
            }
        </>

    );
}

export default Training;