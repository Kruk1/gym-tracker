import '../css/cleanStyle.css';
import '../css/loading.css'

function Day(props: any) {

    return (
        <div className="day">
            <h2>Day {props.props.index}</h2>
            {props.props.day.exercises.map((exercise: any) => 
                {
                    return <div className="exercise">{exercise.name}</div>
                })}
            <div className="add-exercise" onClick={(event: React.MouseEvent) =>
            {
                props.props.showModal()
                props.props.getIdOfDay(props.props.day)
            }}>
                <i className="icon-plus"></i>
            </div>
        </div>
    );
}

export default Day