import styled from "styled-components";

export const ResultTypeListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ResultTypeListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 650px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 650px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
    .action-buttons {
      gap: 1em;
      display: flex;
      @media (max-width: 650px) {
        flex-direction: column;
      }
    }
    .me-5 {
      margin-right: 0.5em;
    }
  }
`;

export const ResultTypeListingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5em;
  padding: 2em;
  background-color: var(--white-color);

  @media screen and (max-width: 630px) {
    padding: 1em;
  }
  .flex {
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
    @media (max-width: 690px) {
      margin-top: 15px;
    }
  }

  .main-buttons {
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
  .button-flex {
    display: flex;
    gap: 6px;
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
    .org-logo {
      width: 38px;
      height: 35px;
      background: var(--lightgray-extralight);
    }

    .mw-150 {
      min-width: 150px;
    }
  }
  .last-portion {
    display: flex;
    justify-content: space-between;
    @media (max-width: 425px) {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }
  .drop-down {
    border: 1px solid var(--field-border);
    padding-inline: 10px;
    padding-block: 5px;
    border-radius: 4px;
    margin-inline: 6px;
  }
  .drop-down-div {
    display: flex;
    align-items: center;
    color: var(--black-text);
    @media (max-width: 425px) {
      justify-content: end;
    }
  }
  .paginate-div {
    @media (max-width: 425px) {
      margin-top: 15px;
    }
  }
`;
