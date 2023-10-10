import { useState } from "react";

const increment = (value, setter) => () => {
  setter(value + 1);
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td> 
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const positive = all ? good / all : 0;
  return all ? (
    <table>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="all" value={all} />
      <StatisticLine name="average" value={(good - bad) / all} />
      <StatisticLine name="positive" value={positive + " %"} />
    </table>
  ) : (
    <div> No feedback given </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={increment(good, setGood)} />
      <Button text="neutral" handleClick={increment(neutral, setNeutral)} />
      <Button text="bad" handleClick={increment(bad, setBad)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
