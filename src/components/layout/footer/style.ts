import styled from "styled-components";

export const FooterMain = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--white-color);
`;

export const CopyrightText = styled.div`
    display: flex;
    gap: 0.5em;
    font-size: 13px;
    font-weight: 400;
    color: var(--black-text);

    @media screen and (max-width: 530px){
        flex-direction: column;
    }

    .cyfy-logo{

        @media screen and (max-width: 530px){
            width: 100%;
            display: flex;
            justify-content: center;
        }
        
        .icon{
        width: 121px;
        height: 23px;
        }
    }
`;