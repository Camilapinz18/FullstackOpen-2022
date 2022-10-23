import React from "react"
import Country from './Country'

const Countries = ({ countriesToShow }) => {

  let tempSize=Object.keys(countriesToShow).length
  
  return (
    <ul>
        {tempSize>10?"Too many matches. Please specify another filter":countriesToShow.map(country => <Country key={country.tld} 
        detail={country} />)}


        
        {console.log("longitudTemporal",tempSize)}
    </ul>
  )
}

export default Countries;