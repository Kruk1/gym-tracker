import React, {useState} from 'react'
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        }
    }
};

function Exercise(props: any) {
    const [isModalShownDay, setIsModalShownDay] = useState(false)
    const [number, setNumber] = useState('')
    const [isError, setIsError] = useState(false)
    const [response, setResponse] = useState('')
    const errorStyle: React.CSSProperties = 
    {
        borderColor: 'red',
        color: 'red'
    }
    const idExercise = props.props._id
    const {id} = useParams()

    function showModalDay(event: React.MouseEvent)
    {
        setIsModalShownDay(prev => !prev)
        setResponse('')
        setIsError(false)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNumber(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault()
        if(number)
        {
            await axios.patch('/training/UpdateResults', {number: number, idExercise: idExercise, idTraining: id, idDay: props.props.idDay})
            props.props.setIsRendering(false)
            props.props.getTrainingInfo()
        }
        else
        {
            setIsError(true)
            setResponse('You have to give a number!')
        }
    }

    async function deleteExercise() 
    {
        await axios.delete('/training/DeleteExercise', {data: {idExercise: idExercise, idTraining: id, idDay: props.props.idDay}})
        props.props.setIsRendering(false)
        props.props.setResponse('Exercise deleted!')
        props.props.getTrainingInfo()
    }

    function calcProgress()
    {
        const progress = Math.floor(props.props.results[props.props.results.length-1] * 100 / props.props.results[props.props.results.length-2]) - 100
        return progress
    }

    const labels = props.props.length

    const data = {
        labels,
        datasets: [
            {
                label: 'Progress',
                data: props.props.results,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return (
        <>
            <div className="exercise" onClick={showModalDay}>
                <h3>{props.props.name}</h3>
                <div className="result">
                    {props.props.results[0] ? 
                        <p>
                            {props.props.results[props.props.results.length-1]}
                            {props.props.units ? props.props.units : 'kg'}
                        </p> : <p>none</p>
                    }
                </div>
            </div>
            {isModalShownDay && 
                <>
                    <div className="backdrop" onClick={showModalDay}></div>
                    <section className="modal-exercise">
                        {response && <div className='response-info exercise-info' style={isError ? errorStyle : {}}>{response}</div>}
                        <h4>{props.props.name}</h4>
                        <div className="buttons-exercise">
                            <button aria-label='Delete exercise' className='delete-btn' onClick={deleteExercise}>Delete Exercise</button>
                            <button aria-label='Update' className='update-btn'>Update Results</button>
                        </div>
                        <Line options={options} data={data} />
                        <div className="progress-container">
                            <h5 style={calcProgress() < 0 ? {color: 'red'} : {}}>Last gains(percent) {calcProgress()}%</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="form-result-container">
                                    <label htmlFor="number">Send new gains</label>
                                    <input type="number" name="number" id="number" step="any" onChange={handleChange} value={number}/>
                                </div>
                                <button>Send</button>
                            </form>
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default Exercise;