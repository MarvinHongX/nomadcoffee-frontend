import styled from "styled-components";

const ShopInput = styled.input`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: ${(props) => props.theme.bgColor};
    border: ${(props) => (props.hasError ? "2px" : "0.5px")} 
            solid 
            ${(props) => (props.hasError ? props.theme.accent : props.theme.borderColor)};
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
    &:focus {
        border-color: rgb(38, 38, 38);
    }
`;

export default ShopInput;