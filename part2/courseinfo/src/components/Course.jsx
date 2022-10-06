const Header = ({ courseName }) => {
    return (
        <div>
            <h2>{courseName}</h2>
        </div>
    )
}

const Content = ({ partInfo }) => { //recibe un course.parts
    return (
        <div>
            {partInfo.map((part) => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            {part.name} {part.exercises}
        </div>
    )
}
const Total = ({ exercisesNum }) => { //Recibe un array de numeros
    const total = exercisesNum.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);

    return (
        <div>
            <h4>Total of {total} exercices</h4>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content partInfo={course.parts} />
            <Total exercisesNum={course.parts} />
        </div>
    )
}

export default Course;
