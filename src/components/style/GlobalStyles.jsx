import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  root, html, body, #root {
    height: 100vh;
  }
  
  body {
    font-family: Roboto, sans-serif;
    font-weight: 600;
    background-color: #272727;
    color: white;
  }

  .ant-table-row:nth-child(odd) {
    background-color: #444343;

  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #8d8d8d;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

`;
