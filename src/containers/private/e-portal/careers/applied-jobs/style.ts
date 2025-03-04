import styled, { css } from "styled-components";

export const AcademicSessionListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const AcademicSessionListingSection = styled.div<{
  isTableOverflowing: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }
  .table-heading {
    color: var(--black-text);
    font-size: 18px;
    font-weight: 700;
  }
  .info-div {
    margin-top: 1rem;
  }

  .table-info {
    color: var(--medium-red);
    font-size: 16px;
    font-weight: 400;
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

    .expanded-content {
      display: flex;
      gap: 0.7em;
      flex-wrap: wrap;

      .action-button {
        button {
          height: 35px;
          padding: 0 1em;
          background: var(--primary);
          border-radius: 8px;
          color: var(--white-constant);
          font-size: 14px;
          font-weight: 700;

          &.red {
            background-color: var(--light-medium-crimson);
          }
        }
      }
    }
  }
  .action-menu {
    width: 30px;
    position: relative;

    .menu-icon {
      .icon {
        rect {
          fill: var(--primary);
        }
      }
    }
  }
`;

export const AcademicSessionListingTop = styled.div`
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
