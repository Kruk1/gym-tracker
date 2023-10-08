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
    units: string;
}

function Training() {
    const [isRendering, setIsRendering] = useState(false)
    const [isModalShown, setIsModalShown] = useState(false)
    const [isModalUpdateTrainingShown, setIsModalUpdateTrainingShown] = useState(false)
    const [isError, setIsError] = useState(false)
    const [response, setResponse] = useState('')
    const [idDay, setIdDay] = useState('')
    const [trainingUpdateInfo, setTrainingUpdateInfo] = useState({
        name: '',
        days: '',
        description: ''
    })
    const [exerciseCreateInfo, setExerciseCreateInfo] = useState<exercise>(
        {
            name: '',
            results: NaN,
            id: '',
            units: ''
        }
    )
    const {id} = useParams()
    const [training, setTraining] = useState<trainingType>()
    const errorStyle: React.CSSProperties = 
    {
        borderColor: 'red',
        color: 'red'
    }
    const navigate = useNavigate()

    useEffect(() => 
    {
        getUserInfo()
        getTrainingInfo()
    }, [])

    async function getUserInfo()
    {
        try
        {
            await axios.get('http://localhost:5000/user/getUser')
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

    async function getTrainingInfo()
    {
        try
        {
            const res = await axios.get(`http://localhost:5000/training/GetTrainingDetails?id=${id}`)
            if(!res.data)
                navigate('/user/plans')
            setTraining(res.data)
            setTrainingUpdateInfo(prevObject => 
                {
                    return {
                        ...prevObject,
                        name: res.data.name,
                        days: res.data.days.length,
                        description: res.data.description
                    }
                })
            setTimeout(rendered, 1000)
        }
        catch(e: any)
        {
            const error = e.response.data
            if(error.authRedirect)
            {
                navigate('/', {state: error.message})
            }
            navigate('/user/plans', {state: "This training doesn't exist or something went wrong! Try again!"})
        }
    }

    function rendered()
    {
        setIsRendering(true)
    }

    async function deleteTraining(event: React.MouseEvent<HTMLButtonElement>)
    {
        try
        {
            await axios.delete(`http://localhost:5000/training/DeleteTraining?id=${id}`)
            navigate('/user/plans', {state: 'Training deleted!'})
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

    async function redirectToHomepage(event: React.MouseEvent<HTMLButtonElement>)
    {
        navigate('/user/plans')
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
            id: '',
            units: 'kg'
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

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setExerciseCreateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    function showUpdateModal()
    {
        setIsModalUpdateTrainingShown(prevState => !prevState)
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
                idDay: idDay,
                units: exerciseCreateInfo.units
            })
            setIsRendering(false)
            setIsModalShown(false)
            setExerciseCreateInfo(
                {
                    name: '',
                    results: NaN,
                    id: '',
                    units: ''
                }
            )
            setIsError(false)
            setResponse('Exercise created!')
            getTrainingInfo()
        }
        catch(e: any)
        {
            event.preventDefault()
            const error = e.response.data
            if(error.authRedirect)
            {
                navigate('/', {state: error.message})
            }
            const errors = Object.keys(e.response.data.errors)[0]
            setResponse(e.response.data.errors[errors].message)
            setIsError(true)
            showModal()
        }
    }

    async function handleUpdateSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        try
        {
            event.preventDefault()
            await axios.patch(`http://localhost:5000/training/UpdateTraining`,
            {
                name: trainingUpdateInfo.name,
                description: trainingUpdateInfo.description,
                days: trainingUpdateInfo.days,
                id: id
            })
            window.location.reload()        
        }
        catch(e)
        {

        }
    }

    function handleSelectUpdateChange(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setTrainingUpdateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    function handleUpdateChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setTrainingUpdateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
    }

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>)
    {
        setTrainingUpdateInfo(prevObject =>
            {
                return {
                    ...prevObject, 
                    [event.target.name]: event.target.value
                }
            })
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
            getTrainingInfo: getTrainingInfo,
            setResponse: setResponse
        }
        return (
            <Day props={dayProps} key={day._id}/>
        )
    }) 

    return (
        <>
            {!isRendering ? <Loading /> : 
                <main className="training-container">
                    {response && <div className='response-info' style={isError ? errorStyle : {}}>{response}</div>}
                    <h1>{training?.name}</h1>
                    <section className="buttons">
                        <button aria-label='Back' className='back-btn' onClick={redirectToHomepage}>Back to Homepage</button>
                        <button aria-label='Update' className='update-btn' onClick={showUpdateModal}>Update Training</button>
                        <button aria-label='Delete' className='delete-btn' onClick={deleteTraining}>Delete Training</button>
                    </section>
                    {training?.description && 
                        <section className="description">
                            <h2>Description:</h2>
                            {training?.description}
                        </section>
                    }
                    <section className="days">
                        {days}
                    </section>
                    {isModalUpdateTrainingShown &&
                    <>
                        <div className="backdrop" onClick={showUpdateModal}></div>
                        <section className="form-container-create">
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="name-input-container">
                                    <label htmlFor="name">Title</label>
                                    <input type="text" name="name" className="name-input" placeholder="My gym training" onChange={handleUpdateChange} value={trainingUpdateInfo.name}/>
                                </div>
                                <div className="select-input-container">
                                    <label htmlFor="days">Days</label>
                                    <div className="custom-select">
                                        <select name="days" id="select-input" onChange={handleSelectUpdateChange} value={trainingUpdateInfo.days}>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="textarea-container">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" id="description-input" rows={10} onChange={handleTextAreaChange} value={trainingUpdateInfo.description}></textarea>
                                </div>
                                <button>Update training</button>
                            </form>
                        </section>
                    </>}
                    {isModalShown && 
                    <>
                        <div className="backdrop" onClick={showModal}></div>
                        <section className="modal-add-exercise">
                            <form onSubmit={handleSubmit}>
                                <div className="name-input-container training-input-container">
                                    <label htmlFor="name">Exercise name</label>
                                    <input type="text" name='name' className='name-input training-input' onChange={handleChange}/>
                                </div>
                                <div className="value-inputs">
                                    <div className="number-input-container">
                                        <label htmlFor="results">Start value(must be a number)</label>
                                        <input type="number" step="any" name='results' className='name-input number-input' onChange={handleChange}/>
                                    </div>
                                    <div className="units-select-container">
                                        <label htmlFor="units">Unit</label>
                                        <div className="custom-select">
                                        <select name="units" className="select-exercise-input" onChange={handleSelectChange} value={exerciseCreateInfo.units}>
                                            <option value="kg">kg</option>
                                            <option value="lbs">lbs</option>
                                        </select>
                                    </div>
                                    </div>
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