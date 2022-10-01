import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import '../css/cleanStyle.css';
import '../css/mainContent.css'
import {useAuth, useSetAuth} from '../context/AuthContext'
import axios from 'axios';

type day = 
{
    day: string,
    exercises: string[],
    _id: string
}

type trainingType = {
    _id: string,
    name: string,
    description: string,
    days: day[],
    createdBy: string,
    lastUpdate: Date
}

function MainContent() {
    const authInfo = useAuth()
    const setAuthInfo = useSetAuth()
    const navigate = useNavigate()
    const [isRendering, setIsRendering] = useState(false)
    const [isShownModalCreate, setIsShownModalCreate] = useState(true)
    const [trainingData, setTrainingData] = useState<trainingType[]>([])
    

    useEffect(() => 
    {
        async function getUserInfo()
        {
            try
            {
                const res = await axios.get('/user/getUser')
                const{login, id} = res.data
                setAuthInfo({login: login, id: id})
                getTrainingData()
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

        async function getTrainingData()
        {
            try
            {
                const res = await axios.get(`/training/GetTraining`)
                setTrainingData(res.data)
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

        getUserInfo()
    }, [])

    const trainings = trainingData.map(training => 
    {
        return (
            <article className="training" key={training._id}>
                <h3>{training.name}</h3>
            </article>
        )
    })

    function showModal(event: React.MouseEvent<HTMLElement>)
    {
        setIsShownModalCreate(prevState => !prevState)
    }
    

    return (
        <>
            {!isRendering ? (
                <div className="center">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <main className="gym-tracker-container">
                    <h1>Welcome <span className='bold'>{`${authInfo.login[0].toUpperCase()}${authInfo.login.slice(1)}`}!</span></h1>
                    <h2>Choose your training</h2>
                    <section className="training-options">
                        {trainings}
                        <article className="training center-training" onClick={showModal}>
                            <i className="icon-plus"></i>
                        </article>
                    </section>
                    {isShownModalCreate && 
                    <>
                        <div className="backdrop" onClick={showModal}></div>
                        <section className="form-container-create">
                            <form>s</form>
                        </section>
                    </>
                    }
                </main>
            )}
        </>
    );
}

export default MainContent;