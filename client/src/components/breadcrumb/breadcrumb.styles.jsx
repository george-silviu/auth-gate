import styled from "styled-components";

import { containerBackground } from "../../styles/global.styles";

export const BreadcrumbContainer = styled.div`
  grid-area: breadcrumb;

  border: 1px solid #6246ea;

  background-color: ${containerBackground};

  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 2.5px;
  padding-left: 20px;
  border-radius: 5px;
`;
