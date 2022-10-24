import React from "react"

const Country = ({ temp, country }) => {
  return (
    <div>
      {temp === 1 ?
        <div>
          <h1>{country.name.common}</h1>
          <h4>Capital: {country.capital}</h4>
          <h4>Area: {country.area}</h4>
          <h2>Languages:</h2>
          <ul>{Object.values(country.languages).map(value => <li key={value}>{value}</li>)}</ul>
          <img src={country.flags.png} alt="flag" />
        </div>
        : <li>{country.name.common}</li>}

      {console.log("temp:", temp)}
    </div>
  )
}

export default Country;
