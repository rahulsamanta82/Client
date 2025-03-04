import styled from "styled-components";


export const AppliedApplicantMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;

export const AppliedApplicantTop = styled.div`
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


export const AppliedApplicantSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5em;
    padding: 2em;
    background-color: var(--white-color);
    border-radius: 20px;

    @media screen and (max-width: 630px){
        padding: 1em;
    }
    .top-heading{
        font-weight: 700;
        font-size: 24px;
        color: var(--black-text);
        border-bottom: 2px solid var(--lightgray-extralight);
        width: 60px;
    }
    .btn-parent{
        margin-top: 25px;
    }
    .flex{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .table-search-field {
    width: 255px;
    height: 40px;
    border: 1px solid var(--field-border);
    border-radius: 6px;
    display: flex;
    gap: 0.5em;
    padding: 0 1em;
    color: var(--lightgray-light);
    background: var(--input-field-bg);
    @media (max-width:690px) {
        margin-top: 15px; 
    }
}

    .main-buttons{
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 8px;
        width: 86px;
        height: 40px;
        font-size: 18px;
        font-weight: 400;
        background-color: var(--3d-gray);
    }
    .button-flex{
        display: flex;
        gap: 6px;
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
    .last-portion{
        display: flex;
        justify-content: space-between;
    }
    .drop-down{
        border: 1px solid var(--field-border);
        padding-inline: 10px;
        padding-block: 5px;
        border-radius: 4px;
        margin-inline: 6px;
    }
    .common-fields{
        width: 100%;
        display: flex;
       
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 690px){
           flex-wrap: wrap;
        }
    }
    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: end;
        padding-bottom: 2em;
        margin-top: 20px;

        .buttons{
            display: flex;
            gap: 2.5em;

            @media screen and (max-width: 600px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
    .input-field {
    width: 33%;
    display: flex;
    flex-direction: column;
    gap: .8rem;
    color: var(--lightgray-medium);
    margin-top: 30px;
    @media (max-width:690px) {
        width: 100%;
    }
}

`;