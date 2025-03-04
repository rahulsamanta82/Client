import styled from "styled-components";

export const AdmissionDocumentsMasterListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const AdmissionDocumentsMasterListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 670px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 670px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 670px) {
      width: 100%;
    }
    .add-new-button {
      @media screen and (max-width: 670px) {
        width: 100%;

        button {
          width: 100%;
        }
      }
    }
  }
`;

export const AdmissionDocumentsMasterListingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }

  .list-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 630px) {
      flex-direction: column;
      gap: 1em;
    }
  }

  table td {
    .mw-150 {
      min-width: 150px;
    }
    .mw-200 {
      min-width: 200px;
    }
  }
`;
