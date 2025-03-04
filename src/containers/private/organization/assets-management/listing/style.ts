import styled from "styled-components";


export const AssetsListingMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;

export const AssetsListingSection = styled.div`
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

    table td{
        .org-logo{
            width: 38px;
            height: 35px;
            background: var(--lightgray-extralight);
        }

        .mw-150{
            min-width: 150px;
        }
    }
`;

export const AssetsListingTop = styled.div`
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
        display: flex;
        gap: 10px;
        @media screen and (max-width: 490px){
            width: 100%;

            button{
                width: 100%;
            }
        }
        .lg-rounded-btn{
            display: flex;
            gap: 5px;
            justify-content: center;
            align-items: center;
        }
    }
`;