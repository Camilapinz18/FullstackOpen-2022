import React from 'react';
const Total = ({ exercisesNum }) => { //Recibe un array de numeros
  const total = exercisesNum.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);

  return (
    <div>
      <h4>Total of {total} exercices</h4>
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
      <h2>{courseName}</h2>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App