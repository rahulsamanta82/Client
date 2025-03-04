import styled from "styled-components";

export const MainLayoutWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 0;
`;

export const SidebarSection = styled.div<{ opened: boolean }>`
    height: 100%;
    position: absolute;
    z-index: 5;
    left: ${({ opened }) => opened ? '0' : '-280px'};
    transition: all 0.3s ease-in-out;
`;

export const ContentSection = styled.div<{ isSidebarOpened: boolean }>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;

    @media screen and (min-width: 1280px){
    margin-left: ${({ isSidebarOpened }) => isSidebarOpened ? '280px' : '0px'};
    transition: all 0.3s ease-in-out;
    }
`;

export const HeaderSection = styled.div`
    width: 100%;
    display: flex;
`;

export const RouterOutlet = styled.div`
    width: 100%;
    height: 100%;
    padding: 2em;
    overflow-y: auto;

    @media screen and (max-width: 800px){
        padding: 1em;
    }

    @media screen and (max-width: 450px){
        padding: .5em;
    }
`;


export const FooterSection = styled.div`
    width: 100%;
`;