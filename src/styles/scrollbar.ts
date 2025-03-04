import { createGlobalStyle } from "styled-components";

const ScrollBarStyles = createGlobalStyle`
        .p-custom-scrollbar-8{
        &::-webkit-scrollbar {
            width: 8px;
          }
          
          &::-webkit-scrollbar-thumb {
            background-color: var(--primary);
            border-radius: 200px;
          }
    }

            .p-custom-scrollbar-4{
        &::-webkit-scrollbar {
            width: 4px;
          }
          
          &::-webkit-scrollbar-thumb {
            background-color: var(--primary);
            border-radius: 200px;
          }
    }
`;

export default ScrollBarStyles;