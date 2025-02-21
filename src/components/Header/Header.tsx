import * as styled from "./style";
import * as sharedStyled from "../../style/sharedStyle";
import logo from "../../assets/image/logo.png";

const Header = () => {
  return (
    <styled.mainHeaderContainer>
      <sharedStyled.whiteColorText>
        <styled.customImg src={logo} />
      </sharedStyled.whiteColorText>
    </styled.mainHeaderContainer>
  );
};

export default Header;
