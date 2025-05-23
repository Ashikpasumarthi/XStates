import React, { useEffect, useState } from 'react';
// import * as React from 'react';
// import axios from axios;
import './App.css';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function States() {

  const [countries, setCountries] = useState([]);
  const [countryInput, setCountryInput] = useState("");
  const [states, setStates] = useState([]);
  const [stateInput, setStateInput] = useState("");
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  // const [disable, setDisable] = useState(true); // previously by-default we are making unable on click
  // const [disableCity, setDisableCity] = useState(true);
  console.log("Countries are fetched :", countries);
  console.log("States are fetched :", states);
  console.log(typeof states)
  useEffect(() => {
    async function getCountries() {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    }

    getCountries();
  }, []) // first them when the component appears on browser , that time only it will render which means no multiple renders on browser load.

  useEffect(() => {
    console.log("checking input", countryInput)
    async function getStates() {
      if (countryInput) {
        // setDisable(false);
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryInput}/states`);
          const data = await response.json();
          console.log("Fetched states:", data);
          // setStates(Array.isArray(data.states) ? data.states : []); 
          setStates(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getStates();
  }, [countryInput]);


  useEffect(() => {
    console.log("checking input", countryInput, stateInput)
    async function getCities() {
      if (countryInput && stateInput) {
        // setDisableCity(false);
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryInput}/state=${stateInput}/cities`);
          const data = await response.json();
          console.log("Fetched states:", data);
          // setStates(Array.isArray(data.states) ? data.states : []); 
          setCities(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getCities();
  }, [countryInput, stateInput]);

  return (
    <>
      {/* <div>States</div> */}
      <div style={{ display: "flex", flexDirection: "row", gap: "3rem", justifyContent: "center" }}>
        <Select
          native
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryInput}
          label="Select Country"
          onChange={(e) => setCountryInput(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country, i) => (
            <option key={i} value={country}>{country}</option>
          ))}
        </Select>



        <Select
          native
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stateInput}
          label="Select State"
          onChange={(e) => setStateInput(e.target.value)}
          disabled={!countryInput}
        >
          <option value="">Select State</option>
          {states.map((state, i) => (
            <option key={i} value={state}>{state}</option>
          ))}
        </Select>


        <Select
          native
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cityInput}
          label="Select City"
          onChange={(e) => setCityInput(e.target.value)}
          disabled={!stateInput}
        >
          <option value="">Select City</option>
          {cities.map((city, i) => (
            <option key={i} value={city}>{city}</option>
          ))}
        </Select>
      </div>
      {
        cityInput && (<p>You selected {cityInput}, {stateInput}, {countryInput}</p>)
      }
      


    </>
  )
}

//important :::: In MUI (@mui/material), the native prop on a <Select> component tells it to render a native HTML <select> element rather than using MUI's custom-styled dropdown (which uses <MenuItem> under the hood).