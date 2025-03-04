import { createGlobalStyle } from 'styled-components';

const w1 = Math.ceil((1 / window.devicePixelRatio) * 10) / 10;
const CommonStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
    }

    body {
        width: var(--width);
        height: var(--height);
        -webkit-font-smoothing: antialiased;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        --w1: ${w1}px;
        --_w1: ${-w1}px;
        background-color: var(--win-bg-color);
        overflow: hidden;
    }

    input, button, select, textarea{
        border: none;
        outline: none;
        font-size: inherit;
        color: inherit;
        background: transparent;
    }

    input::placeholder{
        color: inherit;
    }

    .cp{
        cursor: pointer;
    }

    button{
        cursor: pointer;

        &:disabled{
            background: var(--gray-medium);
            color: var(--black-constant);
        }
    }
`;

export default CommonStyles;