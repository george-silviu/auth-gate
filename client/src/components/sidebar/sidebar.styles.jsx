import styled from "styled-components";

import { ListItemIcon } from "@mui/material";

import { containerBackground, iconColor } from "../../styles/global.styles";

export const SidebarContainer = styled.div`
  border: 1px solid #6246ea;

  grid-area: side;

  background-color: ${containerBackground};

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2.5px;
  border-radius: 5px;
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  color: ${containerBackground};
`;
