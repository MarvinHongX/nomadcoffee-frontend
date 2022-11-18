import styled from "styled-components";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;
function NotFound() {
    return <Title>404 Not Found.</Title>
}

export default NotFound;