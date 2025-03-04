import styled, { css } from "styled-components";

export const PoolTeachersListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const PoolTeachersListingSection = styled.div<{
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
    .mw-100 {
      min-width: 100px;
    }

    .expanded-content {
      display: flex;
      flex-direction: column;
      gap: 0.7em;

      .particular-info {
        display: flex;
        gap: 1em;
        .title {
          min-width: 170px;
          color: var(--black-text);
          font-size: 15px;
          font-weight: 400;
        }

        .info {
          font-size: 15px;
          font-weight: 400;
          color: var(--lightgray-medium);

          .table-action-icons {
            @media screen and (max-width: 900px) {
              flex-wrap: wrap;
            }
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

  .menu-dropdown {
    position: absolute;
    z-index: 9999 !important;
    ${({ isTableOverflowing }) =>
        isTableOverflowing
            ? css`
            bottom: 35px;
            top: unset;
          `
            : css`
            top: 30px;
            bottom: unset;
          `}
    top: 30px;
    bottom: unset;
    right: 3px;
    width: 270px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1.5em;
    background: var(--white-color);
    box-shadow: 0px 4px 4px 0px #00000040;

    .particular-menu {
      width: 100%;
      display: flex;
      gap: 1em;
      align-items: center;
      border-bottom: 1px solid var(--gray-medium);

      .title {
        color: var(--black-text);
        font-size: 16px;
        font-weight: 700;
      }

      .action-icon {
        width: 35px;
        height: 35px;

        .icon {
        }
      }
    }
  }
`;

export const PoolTeachersListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 490px) {
      width: 100%;
    }
  }

  .right{
    display: flex;
    gap: 1.5em;
  }
`;
