import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import routes from "../screens/routes";
import { Link, useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";


const SHeader = styled.header`
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.bgColor};
    padding: 18px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div`
    a {
        font-weight: 600;
        margin-left: 5px;
        color: ${props => props.theme.fontColor};
    }
`;

const Icon = styled.span`
    margin-left: 15px;
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center;
`;

function Header(){
    const navigate = useNavigate();
    return (
        <SHeader>
            <Wrapper>
                <Column>
                    <IconsContainer>
                        <Icon>
                            <Link to={routes.home}>
                            <FontAwesomeIcon icon={faHome} size="lg" />
                            </Link>
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                        </Icon>
                        <Icon>
                            <Link to={routes.add}>
                            <FontAwesomeIcon icon={faSquarePlus} size="lg" />
                            </Link>
                        </Icon>
                    </IconsContainer>
                </Column>
                <Column>
                    <Link onClick={() => logUserOut(navigate)}>Log out</Link>
                </Column>
            </Wrapper>
        </SHeader>
    );
}


export default Header;