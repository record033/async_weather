import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid darkgrey;
  border-right: 2px solid darkgrey;
  border-bottom: 2px solid darkgrey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  margin-top: 35%;
`;

export const WeatherCardWrapper = styled.div`
  align-content: center;
  justify-content: center;
  display: flex;
  background-color: cadetblue;
  width: 20%;
  height: 25vh;
  margin-left: 40%;
  margin-top: 10vh;
`;
