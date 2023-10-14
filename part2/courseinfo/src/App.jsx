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
    <div> <u> Total </u>: {total} </div>
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
    courses.map(
      (course) =>
        <Course course={course} key={course.name} />
    )
  )
}

export default App
