import React from "react"
import CountryDetail from './CountryDetail'

const Country = ({ temp, detail }) => {
  return (
    <div>
      <li>{detail.name}</li>

      <CountryDetail detail={detail.name} />
      <CountryDetail detail={detail.capital} />
      {console.log("temp:", temp)}
    </div>

  )
}

export default Country;
