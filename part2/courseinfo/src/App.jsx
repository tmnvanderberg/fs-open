const Part = ({ part }) =>{
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    parts.map(
      (part) =>
        <Part part={part} key={part.name} />
    )
  )
}

const Sum = ({parts}) => {
  const total = parts.reduce((previous, current) => previous + current.exercises, 0)
  return (
    <div> Total: {total} </div>
  )
}

const Header = ({name}) => {
 return (
   <h1> {name} </h1>
 )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
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
      },
    ]
  }

  return <Course course={course} />
}

export default App
