import React, {useEffect} from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({ userReservation }) => {
  const { id, flight, seat, email, givenName, surname } = userReservation;
  return (
    <Wrapper>
    <ConfirmationCard>
      <ConfirmationTitle> Your flight is confirmed.</ConfirmationTitle>
      <ConfirmationContainer>
        <ConfirmationDetails>
          <span><strong>Reservation #:</strong></span> {id}
        </ConfirmationDetails>
        <ConfirmationDetails>
          <span><strong>Flight #:</strong></span> {flight}
        </ConfirmationDetails>
        <ConfirmationDetails>
          <span><strong>Seat #:</strong></span> {seat}
        </ConfirmationDetails>
        <ConfirmationDetails>
          <span><strong>Name:</strong></span> {givenName} {surname}
        </ConfirmationDetails>
        <ConfirmationDetails>
          <span><strong>Email:</strong></span> {email}
        </ConfirmationDetails>
      </ConfirmationContainer>
    </ConfirmationCard>
    <Img src={tombstone} alt='tombstone' />
  </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const ConfirmationCard = styled.div`
  padding: 40px;
  border: 5px solid ${themeVars.alabamaCrimson};
  border-radius: 16px;
  box-shadow: 0 14px 28px rgba(170,0,30, 0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const ConfirmationTitle = styled.h1`
color: ${themeVars.alabamaCrimson};
border-bottom: 4px solid ${themeVars.alabamaCrimson};
padding-bottom: 20px
`;

const ConfirmationContainer = styled.ul`
  padding: 10px;
`;

const ConfirmationDetails = styled.li`
  padding: 10px;
`

const Img = styled.img`
  width: 200px;
  padding-top: 20px;
`

export default Confirmation;
