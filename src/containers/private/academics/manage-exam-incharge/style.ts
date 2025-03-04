import styled from "styled-components";

export const ManageExamInchargeListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ManageExamInchargeListingSection = styled.div`
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

  .table-info-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1em;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--lightgray-light);
    padding-bottom: 1em;

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 780px) {
          font-size: 18px;
        }
      }
    }
  }
  .action-button {
    button {
      padding: 0.4em 0.5em;
      color: var(--white-constant);
      background: var(--lightgreen-medium);
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;

      &.primary {
        color: var(--white-constant);
        background: var(--primary);
      }
    }
  }
`;

export const ManageExamInchargeListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 490px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 490px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
