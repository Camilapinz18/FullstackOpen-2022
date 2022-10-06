import React from 'react';
const Total = ({ exercisesNum }) => { //Recibe un array de numeros
  const total = exercisesNum.reduce((previousValue, currentValue) => previousValue + currentValue.exercises,0);

  return (
    <div>
      <h3>Total of {total} exercices</h3>
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

const Content = ({ partInfo }) => { //recibe un course.parts
  let numbers
  return (
    <div>
      {partInfo.map((part) => <Part key={part.id} part={part} />)}
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

const Header = ({ courseName }) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  )

}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App