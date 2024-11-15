import { StyledButton } from "./button.styles";

const Button = ({ label, variant, endIcon }) => {
  return (
    <StyledButton variant={variant} endIcon={endIcon}>
      {label}
    </StyledButton>
  );
};

export default Button;
