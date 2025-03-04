import styled from "styled-components";

export const FinanceDashboardMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const FDTopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const FDContentSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
`;

export const HeadlineCards = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* display: flex; */
    gap: 1em;
`;

export const HeadlineCard = styled.div`
    /* width: 24%; */
    display: flex;
    flex-direction: column;
    gap: 2em;
    background: var(--white-color);
    border-radius: 20px;
    padding: 1em;

    .header{
        width: 100%;
        display: flex;
        gap: .8em;
        align-items: center;

        .title{
            color: var(--black-text);
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 400;
        }
    }

    .lower-part{
        width: 100%;
        display: flex;
        gap: 1em;
        align-items: flex-end;

        .stats{
            display: flex;
            flex-direction: column;
            .total{
                font-size: 14px;
                font-weight: 600;
                color: var(--black-text);
            }

            .percentage{
                font-size: 14px;
                font-weight: 400;
                color: var(--primary);
            }
        }
    }
`;

export const MainStatCards = styled.div`
    width: 100%;
    display: flex;
    gap: 1em;

    @media screen and (max-width: 950px){
        flex-direction: column;
    }
`;

export const MainStatCard = styled.div`
    width: 50%;
    background-color: var(--white-color);
    border-radius: 20px;
    padding: 1em;

    @media screen and (max-width: 950px){
        width: 100%;
    }

    .header-section{
        display: flex;
        flex-direction: column;
        gap: .5em;
        .title{
            span{
                font-size: 32px;
                font-weight: 500;
                color: var(--black-text);

                @media screen and (max-width: 1280px){
                    font-size: 24px;
                }
            }
        }

        .description{
            color: var(--black-text);
            font-size: 14px;
            font-weight: 400;
        }
    }
`;