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

  thead th {
    white-space: nowrap;
  }
  
  .ant-table-row:nth-child(even) {
    background-color: #272727;
  }

  tbody .ant-table-cell-fix-left {
    background-color: inherit !important;
  }

  td {
    max-width: 400px;
  }

  .ant-tooltip {
    background-color: green;
  }

  .ant-tooltip-placement-bottom .ant-tooltip-arrow, .ant-tooltip-placement-bottomLeft .ant-tooltip-arrow, .ant-tooltip-placement-bottomRight .ant-tooltip-arrow {
    border-bottom-color: green;
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
