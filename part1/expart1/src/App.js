import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={ ()=>setGood(good+1) }>Good</button>
      <button onClick={ ()=>setNeutral(neutral+1) }>Neutral</button>
      <button onClick={ ()=>setBad(bad+1) }>Bad</button>

      <h1>Statistics</h1>
      <h2>Good: {good}</h2>
      <h2>Neutral: {neutral}</h2>
      <h2>Bad: {bad}</h2>
    </div>
  )
}

export default App