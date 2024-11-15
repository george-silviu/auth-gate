import AccountMenu from "../account-menu/account-menu.component";

import { HeaderContainer, SidebarDisplayIcon } from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <SidebarDisplayIcon fontSize="large" />
      <AccountMenu />
    </HeaderContainer>
  );
};

export default Header;
