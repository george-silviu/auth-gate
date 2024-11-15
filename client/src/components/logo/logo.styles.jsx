import styled from "styled-components";

import { textColor, containerBackground } from "../../styles/global.styles";

export const LogoContainer = styled.div`
  grid-area: logo;

  border: 1px solid #6246ea;

  background-color: ${containerBackground};

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 2.5px;
  border-radius: 5px;
`;

export const LogoText = styled.h2`
  color: ${textColor};
`;
