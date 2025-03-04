import styled from "styled-components";

export const PostTemplateListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const PostTemplateListingSection = styled.div`
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
`;

export const PostTemplateListingTop = styled.div`
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

  .right {
    .menu-bar {
      position: relative;
      .menu-button {
        svg {
          width: 40px;
          height: 40px;

          @media screen and (max-width: 450px) {
            width: 30px;
            height: 30px;
          }

          rect {
            rx: 5;
          }
        }
      }

      .dropdown-menu {
        position: absolute;
        width: 440px;
        top: 42px;
        right: 0;
        border-radius: 8px;
        background: var(--white-color);
        z-index: 20;
        display: flex;
        flex-direction: column;
        padding: 1em 0.5em;

        @media screen and (max-width: 500px) {
          width: 88vw;
        }

        @media screen and (max-width: 450px) {
          top: 32px;
        }

        .particular-menu {
          font-size: 16px;
          font-weight: 400;
          color: var(--black-text);
          user-select: none;
          cursor: pointer;
          border-radius: 8px;
          padding: 0.5em 1em;
          &:hover {
            color: var(--white-constant);
            background: var(--primary);
          }
        }
      }
    }
  }
`;
