import styled from "styled-components";
import { FatLink } from "../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
`;
const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
    line-height: 130%;
`;

function AuthHeaderContainer({icon, size, subtitle}){
    return (
        <HeaderContainer>
            <FontAwesomeIcon icon={icon} size={size}/>
            <Subtitle>
                {subtitle}
            </Subtitle>
        </HeaderContainer>
    );
}

export default AuthHeaderContainer;
