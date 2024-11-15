import styled from "styled-components";
import Button from "@mui/material/Button";
import { buttonColor, buttonTextColor } from "../../styles/global.styles";

export const StyledButton = styled(Button).attrs({
  style: {
    backgroundColor: buttonColor,
    color: buttonTextColor,
  },
})``;
