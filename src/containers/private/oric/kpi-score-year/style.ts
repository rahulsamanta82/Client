import styled from "styled-components";

export const KPIScoreYearMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const KPIScoreYearSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }

  .tableHeading {
    font-size: 24px;
    font-weight: 700;
    border-bottom: 1px solid var(--lightgray-extralight);
    color: var(--black-text);

    @media screen and (max-width: 480px) {
      font-size: 20px;
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
    z-index: 9999;
    bottom: 35px;
  
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

export const KPIScoreYearTop = styled.div`
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

          @media screen and (max-width: 450px){
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

        @media screen and (max-width: 500px){
          width: 88vw;
        }

        @media screen and (max-width: 450px){
          top: 32px;
        }

        .particular-menu {
          font-size: 16px;
          font-weight: 400;
          color: var(--black-text);
          user-select: none;
          cursor: pointer;
          border-radius: 8px;
          padding: .5em 1em;
          &:hover {
            color: var(--white-constant);
            background: var(--primary);
          }
        }
      }
    }
  }
`;


