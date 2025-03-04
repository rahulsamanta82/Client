import styled from "styled-components";


export const SAuthLayoutMain = styled.div`
    max-width: 100%;
    min-height: 100vh;
    align-items: center;
    padding: 2em 0;
    display: flex;
    justify-content: center;
`;

export const SAContentSection = styled.div`
    width: 1120px;
    display: flex;

    @media screen and (max-width: 1260px){
        width: 100%;
    }
`;

export const SALeftSection = styled.div`
    width: 50%;
    height: inherit;
    display: flex;
    border-radius: 12px 0 0 12px;

    @media screen and (max-width: 1260px){
        display: none;
    }

    img{
        width: 100%;
        height: inherit;
        object-fit: cover;
    }
`;

export const SARightSection = styled.div`
    width: 50%;
    @media screen and (max-width: 1260px){
        width: 100%;
    }
    display: flex;
    /* border-radius: 0 12px 12px 0; */
    /* margin: auto; */
`;