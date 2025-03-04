import styled from "styled-components";

export const LinkMeritListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const LinkMeritListingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  /* padding: 2em; */

  .main-top-cls {
    padding: 0.5em 2em;
    @media screen and (max-width: 630px) {
      padding: 1em;
    }
  }
  .heading-table {
    border-bottom: 1px solid #e9ebec;
    p {
      padding: 1em 1.5em;
      font-size: 24px;
      font-weight: 500;
      line-height: 28.8px;
      color: var(--black-text);
    }
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

  .bottom-pagination {
    padding: 2em 0em;
  }
  .data-table {
    padding-top: 2em;
  }

  table td {
    .mw-150 {
      min-width: 150px;
    }
    .mw-120 {
      min-width: 120px;
    }

    .table-radio-field {
      min-width: 150px;
      padding: 0 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;

      .radio {
        display: flex;
        gap: 0.5em;
        align-items: center;

        label {
          font-size: 15px;
          font-weight: 500;
        }

        input[type="radio"] {
          width: 16px;
          height: 16px;
          accent-color: var(--primary);
        }
      }
    }
  }
`;

export const LinkMeritListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 600px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
