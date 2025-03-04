import styled from "styled-components";

export const InstallmentSlotsListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const InstallmentSlotsListingTop = styled.div`
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

export const InstallmentSlotsListingSection = styled.div`
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
  }
  .action-button {
    button {
      padding: 0.4em 0.5em;
      color: var(--white-constant);
      background: var(--lightgreen-medium);
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      &.black-btn {
        color: var(--white-color);
        background: var(--black-text);
        white-space: nowrap;
      }
      &.gray-btn {
        color: var(--white-color);
        background: var(--lightgray-medium);
        white-space: nowrap;
      }
    }
  }
`;
