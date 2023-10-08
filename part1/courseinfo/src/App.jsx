import { useState } from "react";

const increment = (value, setter) => () => {
  setter(value + 1);
};

const FeedbackButton = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton text="good" handleClick={increment(good, setGood)} />
      <FeedbackButton
        text="neutral"
        handleClick={increment(neutral, setNeutral)}
      />
      <FeedbackButton text="bad" handleClick={increment(bad, setBad)} />
      <h1>statistics</h1>
      <div> good {good} </div>
      <div> neutral {neutral} </div>
      <div> bad {bad} </div>
    </div>
  );
};

export default App;
