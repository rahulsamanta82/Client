import styled from "styled-components";

export const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;

export const STListingTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5em;

    @media screen and (max-width: 490px){
        flex-direction: column;
    }

    .left{
        display: flex;
        flex-direction: column;
        gap: .5em;

        @media screen and (max-width: 490px){
            width: 100%;
        }
    }

    .right{
        @media screen and (max-width: 490px){
            width: 100%;

            button{
                width: 100%;
            }
        }
    }
`;

export const STListingSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em;

    @media screen and (max-width: 630px){
        padding: 1em;
    }

    .list-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: 630px){
            flex-direction: column;
            gap: 1em;
        }
    }
    .list-detail{
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
    .link-text{
        font-weight: 700;
    }
`;