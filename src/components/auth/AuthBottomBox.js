import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const BottomBox = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    font-size: 13px;
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${props => props.theme.accent};
    }
`;

function AuthBottomBox({callToAction, link, linkText}){
    return (
        <BottomBox>
            <span>{callToAction}</span> 
            <Link to={link}>{linkText}</Link>
        </BottomBox>
    );
}
export default AuthBottomBox;