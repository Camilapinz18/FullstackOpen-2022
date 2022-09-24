import { useState } from 'react'
const Statistics = ({text,value}) => {
  return (
    <div>
      <h2>{text} {value}</h2>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all=good+bad+neutral
  const average = all > 0 ? ((good - bad) / all) : 0;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={()=> setGood(good+1)}>Good</button>
      <button onClick={()=> setNeutral(neutral+1)}>Neutral</button>
      <button onClick={()=> setBad(bad+1)}>Bad</button>
      <h1>Statistics</h1>
      <Statistics text="Good:" value={good}></Statistics>
      <Statistics text="Neutral:" value={neutral}></Statistics>
      <Statistics text="Bad:" value={bad}></Statistics>
      <Statistics text="All:" value={good+neutral+bad}></Statistics>
      <Statistics text="Average:" value={average}></Statistics>
      <Statistics text="Positive:" value={(good*100)/(good+neutral+bad)+"%"}></Statistics>

    </div>
  )
}

export default App