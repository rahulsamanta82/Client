import styled from "styled-components";


export const BreadCrumbMain = styled.div`
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
`;

export const BreadCrumbLink = styled.span<{ active: boolean }>`
    font-size: 14px;
    font-weight: 400;
    color: ${({ active }) => active ? 'var(--primary)' : 'var(--lightgray-medium)'};
    cursor: pointer;

    @media screen and (max-width: 630px){
        font-size: 13px;
    }
`;