import styled from "styled-components";

export const AppContainer = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 60px 1fr;
  grid-template-areas:
    "logo header"
    "side breadcrumb"
    "side main";
`;
