import '../css/cleanStyle.css'
import Exercise from './exercise';

function Day(props: any) {

    const exercise = props.props.day.exercises.map((exercise: any) => 
    {
        exercise.setIsRendering = props.props.setIsRendering
        exercise.idDay = props.props.day._id
        exercise.getTrainingInfo = props.props.getTrainingInfo
        exercise.setResponse = props.props.setResponse
        return <Exercise props={exercise} key={exercise._id}/>
    })

    return (
        <>
            <div className="day">
                <h2>Day {props.props.index}</h2>
                {exercise}
                <div className="add-exercise" onClick={(event: React.MouseEvent) =>
                {
                    props.props.showModal()
                    props.props.getIdOfDay(props.props.day)
                }}>
                    <i className="icon-plus"></i>
                </div>
            </div>
        </>
    );
}

export default Day