import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import '../css/cleanStyle.css';
import '../css/mainContent.css'
import {useAuth, useSetAuth} from '../context/AuthContext'
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

function MainContent() {
    const authInfo = useAuth()
    const setAuthInfo = useSetAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [isRendering, setIsRendering] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isShownModalCreate, setIsShownModalCreate] = useState(false)
    const [trainingData, setTrainingData] = useState<trainingType[]>([])
    const [trainingCreateInfo, setTrainingCreateInfo] = useState({
        name: '',
        days: '',
        description: ''
    })
    const [response, setResponse] = useState(location.state)
    const errorStyle: React.CSSProperties = 
    {
        borderColor: 'red',
        color: 'red'
    }
    window.history.replaceState({}, document.title)
    
    useEffect(() => 
    {
        getUserInfo()
    }, [])

    const trainings = trainingData.map(training => 
    {
        return (
            <Link to={`/plans/${training._id}`} className="training" key={training._id}>
                <h3>{training.name}</h3>
            </Link>
        )
    })

    function showModal()
    {
        setIsShownModalCreate(prevState => !prevState)
    }
    
    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setTrainingCreateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setTrainingCreateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        setTrainingCreateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        try
        {
            event.preventDefault();
            await axios.post(`/training/CreateTraining`, {
                name: trainingCreateInfo.name,
                days: trainingCreateInfo.days,
                description: trainingCreateInfo.description
            })
            console.log('done')
            setIsRendering(false)
            setIsShownModalCreate(false)
            setTrainingCreateInfo({
                name: '',
                days: '',
                description: ''
            })
            setIsError(false)
            setResponse('Training created!')
            getUserInfo()
        }
        catch(e: any)
        {
            event.preventDefault()
            const errors = Object.keys(e.response.data.errors)[0]
            setResponse(e.response.data.errors[errors].message)
            setIsError(true)
            setIsShownModalCreate(false)
        }
    }

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
        const res = await axios.get(`/training/GetTraining`)
        setTrainingData(res.data)
    }

    function rendered()
    {
        setIsRendering(true)
    }

    return (
        <>
            {!isRendering ? (
                <Loading />
            ) : (
                <main className="gym-tracker-container">
                    {response && <div className='response-info' style={isError ? errorStyle : {}}>{response}</div>}
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
                        <section className="form-container-create" style={{height: window.innerHeight}}>
                            <form onSubmit={handleSubmit}>
                                <div className="name-input-container">
                                    <label htmlFor="name">Title</label>
                                    <input type="text" name="name" className="name-input" placeholder="My gym training" onChange={handleChange} value={trainingCreateInfo.name}/>
                                </div>
                                <div className="select-input-container">
                                    <label htmlFor="days">Days</label>
                                    <div className="custom-select">
                                        <select name="days" id="select-input" onChange={handleSelectChange} value={trainingCreateInfo.days}>
                                            <option>-</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="textarea-container">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" id="description-input" rows={10} onChange={handleTextAreaChange} value={trainingCreateInfo.description}></textarea>
                                </div>
                                <button>Create training</button>
                            </form>
                        </section>
                    </>
                    }
                </main>
            )}
        </>
    );
}

export default MainContent;