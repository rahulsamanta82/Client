import styled from "styled-components";


export const LineLoaderMain = styled.div`
    width: 100%;
    .loader-line {
            width: 100%;
            height: 5px;
            position: relative;
            overflow: hidden;
            background-color: var(--white-color);
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
        }

        .loader-line:before {
            --duration: 1s;
            content: "";
            position: absolute;
            left: -50%;
            height: 5px;
            width: 40%;
            background-color: var(--primary);
            -webkit-animation: lineAnim var(--duration) linear infinite;
            -moz-animation: lineAnim var(--duration) linear infinite;
            animation: lineAnim var(--duration) linear infinite;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
        }

        @keyframes lineAnim {
            0% {
                left: -40%;
            }
            50% {
                left: 20%;
                width: 80%;
            }
            100% {
                left: 100%;
                width: 100%;
            }
        }
`;