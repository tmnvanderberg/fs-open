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

export default Course
