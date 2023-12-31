import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Top = ({anecdotes, votes}) => {
  const indexMax = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <div>
        {anecdotes[indexMax]}
      </div>
      <div>
        votes: {votes[indexMax]}
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const doVote = () => {
    const tmp = [ ...votes ]
    tmp[selected]++
    setVotes(tmp)
  }

  const doCycle = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        anecdote: {anecdotes[selected]}
      </div>
      <div>
        votes: {votes[selected]}
      </div>
      <div>
        <button onClick={doVote}> vote </button>
        <button onClick={doCycle}> next anecdote </button>
      </div>
      <div>
        <h1>
          Anecdote with the most votes
        </h1>
        <div>
          <Top anecdotes={anecdotes} votes={votes}/>
        </div>
      </div>
    </div>
  )
}

export default App;
