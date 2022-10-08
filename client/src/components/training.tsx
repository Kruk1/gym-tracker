import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import '../css/cleanStyle.css';
import '../css/training.css'
import axios from 'axios';
import Loading from './loading';

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

function Training() {
    const [isRendering, setIsRendering] = useState(false)
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

    const days = training?.days.map((day, index) =>
    {
        return (
            <div className="day" key={day._id}>
                <h2>Day {index + 1}</h2>
                <div className="add-exercise">
                    <i className="icon-plus"></i>
                </div>
            </div>
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
                </main>
            }
        </>

    );
}

export default Training;