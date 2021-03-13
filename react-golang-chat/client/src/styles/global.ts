import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: sans-serif;
    background-color: #f7f7f7;
  }
`;
