import { createGlobalStyle } from "styled-components";

const LoaderStyles = createGlobalStyle`
    .sm-primary-loader{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border-top: 4px solid transparent;
        border-left: 4px solid var(--primary);
        border-right: 4px solid var(--primary);
        border-bottom: 4px solid var(--primary);
        animation: loader 2s linear infinite;
    }
`;

export default LoaderStyles;
