import styled from "styled-components";


export const HRMLeavesDashboardMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const HRMLeavesDashboardTopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const QuickInfoCardsContainer = styled.div`
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(24%, 1fr));
        gap: 1.5em;

        @media screen and (max-width: 960px){
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

    .particular-card{
        box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 2.5em;
        padding: 1.5em 1em;
        border-radius: 15px;
        background: var(--white-color);
        color: var(--black-text);
        cursor: pointer;

        .title{
            font-size: 18px;
            font-weight: 500;
        }

        .value{
            font-size: 24px;
            font-weight: 400;
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
    }
`;