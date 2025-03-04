import styled from "styled-components";

export const ViewOrgMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ViewOrgTop = styled.div`
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
`;

export const ViewOrgContent = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;

  @media screen and (max-width: 1030px) {
    flex-direction: column;
  }
`;

export const VOCLeftSection = styled.div`
  width: 280px;
  height: 710px;
  padding: 2em 1.2em;

  @media screen and (max-width: 1030px) {
    width: 100%;
    flex-direction: column;
  }

  .org-detail-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .particular-org-detail {
      width: 100%;
      display: flex;
      gap: 1em;
      align-items: center;

      .text {
        font-size: 15px;
        font-weight: 400;
        color: var(--lightgray-medium);
      }
    }
  }

  .buttons-section {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-top: 3em;

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1em;

      @media screen and (max-width: 1030px) {
        justify-content: flex-start;
      }
      .action-btn {
        width: 50%;
        height: 40px;
        cursor: pointer;
        display: flex;
        gap: 0.5em;
        border-radius: 5px;
        background-color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;

        &.delete {
          background-color: var(--medium-crimson);
        }

        .text {
          color: var(--white-constant);
          font-size: 16px;
          font-weight: 400;
        }

        .icon-part {
          .icon {
            width: 18px;
            height: 18px;
            color: var(--white-constant);
          }
        }
      }
    }

    .add-button {
      width: 100%;

      button {
        width: 100%;
        height: 40px;
        color: var(--white-color);
        background-color: var(--black-text);
        font-size: 16px;
        font-weight: 500;
        border-radius: 5px;
      }
    }
  }
`;

export const VOCRightSection = styled.div`
  width: calc(100% - 280px - 2em);
  padding: 1em 2em 2em 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;

  @media screen and (max-width: 1030px) {
    width: 100%;
  }

  @media screen and (max-width: 760px) {
    padding: 1.5em 1em;
  }

  .logo-section {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    /* border: 1px solid var(--lightgray-light); */
      border-radius: 8px;
    }
  }

  .cms-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);
      }
    }

    .cms-wrapper {
      * {
        color: var(--lightgray-medium) !important;
      }
    }
  }
`;
