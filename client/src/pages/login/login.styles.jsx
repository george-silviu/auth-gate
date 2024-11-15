import styled from "styled-components";

import { background, containerBackground } from "../../styles/global.styles";

export const LoginContainer = styled.div`
  background-color: ${background};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added shadow style */
`;

export const LoginForm = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  max-width: 90vw;
  height: auto;
  min-height: 40vh;
  background-color: ${containerBackground};
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

export const LoginFormHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px;
`;
