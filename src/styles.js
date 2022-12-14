import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    warning: "tomato",
    borderColor: "rgb(219, 219, 219)",
    fontColor:"rgb(38, 38, 38)",
    bgColor:"#fafafa",
};
export const darkTheme = {
    accent: "#0095f6",
    warning: "tomato",
    borderColor: "rgb(219, 219, 219)",
    fontColor:"#fafafa",
    bgColor:"rgb(10, 10, 10)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a {
        text-decoration: none;
    }
`
