import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

const Reservation = ({ userReservation }) => {
  const { id, flight, seat, email, givenName, surname } = userReservation;
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    value === '' 
    ? setDisabled(true) 
    : setDisabled(false);
  }, [value, setValue]);

  const handleUserInpt = (ev) => {
    const id = ev.target.value;
    setValue(id);
    //console.log(id)
  };
  
  const handleUserSub = (e) => {
    e.preventDefault();
    setValue('');
    fetch(`/reservations/${value}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const resivationData = data.reservation; 
        console.log(resivationData);
        setStatus('ok');
      })
      .catch((err) => {
        console.log(err);
        setStatus('err')
      });
  };

  return (
    <>
      <SearchWrapper>
        <SearchButtonWrap>
        <Text>Search for your reservation here!</Text>
          <form>
            <Input onChange={handleUserInpt} type="text" value={value} placeholder="Search reservation number..." />
            <Button onClick={handleUserSub} type='submit' value='submit' disabled={disabled}>Search!</Button>
          </form>
        </SearchButtonWrap>
      </SearchWrapper>
      {status === "ok" && (
        <>
          <Wrapper>
          <ReservationsCard>
          <ReservationsTitle> Hi {givenName} {surname}! Here is your flight information.</ReservationsTitle>
            <ReservationContainer>
              <ReservationDetails>
                <span><strong>Reservation #:</strong></span> {id}
              </ReservationDetails>
              <ReservationDetails>
                <span><strong>Flight #:</strong></span> {flight}
              </ReservationDetails>
              <ReservationDetails>
              <span><strong>Seat #:</strong></span> {seat}
              </ReservationDetails>
              <ReservationDetails>
              <span><strong>Name:</strong></span> {givenName} {surname}
              </ReservationDetails>
              <ReservationDetails>
              <span><strong>Email:</strong></span> {email}
        </ReservationDetails>
      </ReservationContainer>
    </ReservationsCard>
  </Wrapper>
        </>
      )}
      {status === 'err' && (
        <>
          <Wrapper>
              <ErrText>Sorry! This resivation number does not exist.</ErrText>
          </Wrapper>
        </>
      )}
    </>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  padding: 50px;
  border: 5px solid ${themeVars.alabamaCrimson};
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(170,0,30, 0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const Text = styled.text`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  font-size: 28px;
  color: ${themeVars.alabamaCrimson};
  font-family: Permanent Marker, Arial, Helvetica, sans-serif;
`

const SearchButtonWrap = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 18px;
  margin-right: 18px;
  width: 380px;
  height: 50px;
  border: none;
  border-radius: 10px;
`;

const Button = styled.button`
  font-size: 18px;
  height: 50px;
  border-radius: 10px;
  position: absolute;
  border: none;
  background-color: ${themeVars.alabamaCrimson};

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const ErrText = styled.p`
  font-size: 24px;
  color: ${themeVars.alabamaCrimson};
  border-bottom: 6px solid ${themeVars.alabamaCrimson};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const ReservationsCard = styled.div`
  padding: 40px;
  border: 5px solid ${themeVars.alabamaCrimson};
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(170,0,30, 0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const ReservationsTitle = styled.h1`
  color: ${themeVars.alabamaCrimson};
  border-bottom: 4px solid ${themeVars.alabamaCrimson};
  padding-bottom: 20px
`;

const ReservationContainer = styled.ul`
  padding: 10px;
`;

const ReservationDetails = styled.li`
  padding: 10px;
`

export default Reservation;