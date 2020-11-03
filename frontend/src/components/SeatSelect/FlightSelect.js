import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ flightNumber, handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // TODO: fetch the flight numbers
    fetch('/flights')
    .then((res) => res.json())
    .then((json) => setFlights(json.data))
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      {/* TODO: Create a dropdown from the flight numbers */}
      <Dropdown
        value={flightNumber}
        onChange={handleFlightSelect}
      >
        <option value='Select a flight'>Select a flight</option>
        
        {flights.map((flight) => {
          return (
            <option value={`${flight}`}>
              {flight}
            </option>
          )
        })}
      </Dropdown>
    </Wrapper>
  );
};

const Dropdown = styled.select`
  margin-left: 20px;
  padding: 10px;
  border: none;
  border-radius: 2px;
  background-color: white;
  color: black;
`
const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
