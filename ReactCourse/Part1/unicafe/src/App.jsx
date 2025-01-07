import { useState, useEffect } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>
          {text} {value} %
        </td>
      </tr>
    );
  } else
    return (
      <tr>
        <td>
          {text} {value}
        </td>
      </tr>
    );
};

const Statistics = ({ clicks }) => {
  const total = clicks.good + clicks.neutral + clicks.bad;
  const avg = (clicks.good * 1 + clicks.bad * -1) / total;
  const positive = (clicks.good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  } else
    return (
      <div>
        <table>
          <tbody>
            <Statistic text="good" value={clicks.good} />
            <Statistic text="neutral" value={clicks.neutral} />
            <Statistic text="bad" value={clicks.bad} />
            <Statistic text="all" value={total} />
            <Statistic text="avg" value={avg} />
            <Statistic text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    );
};

const App = () => {
  // save clicks of each button to its own state
  //const [good, setGood] = useState(0);
  //const [neutral, setNeutral] = useState(0);
  //const [bad, setBad] = useState(0);

  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
  };

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  };
  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
  };

  //This is a way to debug the useState because the values are updated asynchronously
  //useEffect(() => {
  //  console.log(clicks.good);
  //  console.log(clicks.neutral);
  //  console.log(clicks.bad); // Logs after `clicks` state is updated
  //});

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics clicks={clicks} />
      {/*<Statistics value={good} text="good" />
      <Statistics value={neutral} text="neutral" />
      <Statistics value={bad} text="bad" />
      <Statistics value={good + neutral + bad} text="all" />
      <Statistics value={(good + neutral + bad) / 3} text="average" />
      <Statistics
        value={(good / (good + neutral + bad)) * 100}
        text="positive"
      />
  */}
    </div>
  );
};

export default App;
