import styled from "styled-components";


export const BuildingsListingMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;
    
    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;

export const BuildingsListingSection = styled.div`
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

    .tooltip {
        position: relative;
        display: inline-block;
      }
      
      /* Tooltip text */
    .tooltip .tooltiptext {
       visibility: hidden;
       background-color: var(--black-text);
       color: var(--white-color);
       text-align: center;
       padding: 2px 0;
       border-radius: 6px;
       width: 80px;
       bottom: 100%;
       left: 50%;
       margin-left: -40px;
       position: absolute;
       z-index: 1;
       margin-bottom: 2px;
    }
      /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
        visibility: visible;
      }
`;

export const BuildingsListingTop = styled.div`
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