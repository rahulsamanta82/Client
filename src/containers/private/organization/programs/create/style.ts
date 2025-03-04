import styled from "styled-components";
import ReactSlider from "react-slider";


export const CreateProgramMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const CreateProgramTopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em;

    @media screen and (max-width: 630px){
        padding: 1em;
    }

    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .input-field .field-wrap{
            .value-display{
                width: 100%;
                display: flex;
                justify-content: space-between;
                gap: 1em;
                padding-bottom: .5em;

                .particular-display{
                    height: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--black-text);
                }

            }
            .slider-field{
            width: 100%;
            height: 50px;
            background: transparent;
            border: none;
        }
        }
    }

    .submit-buttons{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .buttons{
            display: flex;
            gap: 1em;

            @media screen and (max-width: 650px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }


    .rc-slider-handle {
        position: absolute;
        z-index: 1;
        width: 22px;
        height: 22px;
        margin-top: -5px;
        background-color: #128B9B;
        border-radius: 50%;
        cursor: pointer;
        touch-action: pan-x;
        opacity: 10;
    }
    .rc-slider-step {
        position: absolute;
        width: 100%;
        height: 10px;
        background: #878A99;
        border-radius: 12px;
    }
`;