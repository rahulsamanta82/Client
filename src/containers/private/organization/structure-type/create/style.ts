import styled from "styled-components";

export const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const STCreateTop = styled.div`
    .header{
        display: flex;
        flex-direction: column;
        gap: .5em;
    }
`;

export const STCreateContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em;

    @media screen and (max-width: 630px){
        padding: 1em;
    }

    .detail{
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding-bottom: 1.5em;
        border-bottom: 1px solid var(--lightgray-extralight);
        
        .description .text{
            color: var(--lightgray-light);
            font-size: 13px;
            font-weight: 400;
        }
    }

    .form-section{
        width: 100%;

        form{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2em;

        .fields-section{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        flex-wrap: wrap;
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
        }

            .action-buttons{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .buttons{
            display: flex;
            gap: 1em;
            
            .green{
                background-color: var(--lightgreen-medium);
            }

            @media screen and (max-width: 500px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
    }
    }
    .link-text{
        font-weight: 700;
    }
`;