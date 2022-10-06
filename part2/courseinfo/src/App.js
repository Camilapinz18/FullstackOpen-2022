import React from 'react';
const Total = ({ sum }) => {
  <div>



  </div>

}

const Part = ({ part }) => {
  return (
    <div>
      {console.log("idPart:", part.id)}
      {part.name} {part.exercises} 

    </div>
  )

  
}

const Content = ({ partInfo }) => { //recibe un course.parts

  let numbers
  return (
    <div>
      {partInfo.map((part) => <Part key={part.id} part={part} />)}
      {numbers=partInfo.map((number) => partInfo.exercises)}
      {console.log(numbers)}
    </div>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content partInfo={course.parts} />
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
        id:4
      }
    ]
  }

  return <Course course={course} />
}

export default App