import styled from "styled-components";

export const HostelPortalMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const HostelPortalTop = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5em;
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 1em;

  @media screen and (max-width: 1050px){
    flex-wrap: wrap;
    justify-content: center;
  }

  .tab-button {
    @media screen and (max-width: 430px){
      width: 100%;
    }
    button {
      min-width: 170px;
      font-weight: 700;
      background: transparent;
      color: var(--black-text);

      @media screen and (max-width: 430px){
        width: 100%;
        background: var(--reset-button-bg);
      }

      &.active{
        background-color: var(--primary);
        color: var(--white-constant);
      }
    }
  }
`;

export const ContentSection = styled.div`
    width: 100%;
`;