import { useState } from 'react'
const Statistics = ({ good, neutral, bad }) => {

  const all = good + bad + neutral
  const average = all > 0 ? ((good - bad) / all) : 0;
  const positive = (good * 100) / (all)

  if (all == 0)
    return (
      <h4>No feedback given yet</h4>
    )
  return (
    <div>
      <StatisticLine text="Good: " value={good}></StatisticLine>
      <StatisticLine text="Neutral: " value={neutral}></StatisticLine>
      <StatisticLine text="Bad: " value={bad}></StatisticLine>
      <StatisticLine text="All: " value={all}></StatisticLine>
      <StatisticLine text="Average: " value={average}></StatisticLine>
      <StatisticLine text="Positive: " value={positive}></StatisticLine>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <h2>{text}{value}</h2>
    </div>
  )
}


const Button = ({ handler, text }) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handler={() => setGood(good + 1)} text="Good"></Button>
      <Button handler={() => setNeutral(neutral + 1)} text="Neutral"></Button>
      <Button handler={() => setBad(bad + 1)} text="Bad"></Button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App