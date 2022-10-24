import FilterForm from './Components/FilterForm'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Components/Countries';

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    //console.log("Effect")
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        //console.log('promise fullfiled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    console.log("Filter: ", filter)

    filter ? setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(filter))) : setCountriesToShow(countries)
  }

  return (
    <div>
      <FilterForm filter={filter} handleFilter={handleFilter}></FilterForm>
      <Countries countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
