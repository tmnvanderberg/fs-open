const Header = (props) => {
  <h1>{props.course}</h1>
}

const Part = (props) => {
  const part = props.part
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts.map(p => <Part part={p} key={p.name}> </Part>)
  return (
    <>
      {parts}
    </>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App
