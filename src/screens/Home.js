import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;
function Home() {
    return (
        <Container>
        <Title>Hello Nico</Title>
        <button onClick={() => isLoggedInVar(false)}>Logout</button>
        </Container>
    );
}
export default Home;