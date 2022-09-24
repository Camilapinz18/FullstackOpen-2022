import { useState } from 'react'
const Statistics = ({ good, neutral, bad }) => {

  const all = good + bad + neutral
  const average = all > 0 ? ((good - bad) / all) : 0;


  if (all == 0)
    return (
      "No feedback given yet"
    )

  return (
    <div>
      <h2>Good: {good}</h2>
      <h2>Neutral: {neutral}</h2>
      <h2>Bad: {bad}</h2>
      <h2>All: {all}</h2>
      <h2>Average: {average}</h2>
      <h2>Positive: {(good * 100) / (all) + "%"}</h2>
    </div>

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
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>


    </div>
  )
}

export default App