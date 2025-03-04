import styled from "styled-components";

export const LeaveCancellationListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const LeaveCancellationListingSection = styled.div`
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
    .emp-detail{
      min-width: 150px;
      display: flex;
      flex-direction: column;
      gap: .3em;
      .name{
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
        color: var(--primary);
      }
      .designation{
        color: var(--lightgray-medium);
        font-size: 14px;
        font-weight: 500;
      }
    }

    .leave-type{
      min-width: 150px;
      display: flex;
      flex-direction: column;
      gap: .3em;
      color: var(--lightgray-medium);

      .type{
        font-size: 16px;
        font-weight: 500;
      }

      .dated{
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

export const LeaveCancellationListingTop = styled.div`
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

export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 3em;

  @media screen and (max-width: 630px) {
    padding: 1em 1.5em;
  }
`;

export const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2em;
  transition: all 2s ease-in-out;

  .filter-fields {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5em;
    color: var(--lightgray-medium);
    font-size: 15px;
    font-weight: 400;

    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
  }
  .submit-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .buttons {
      display: flex;
      gap: 1em;

      @media screen and (max-width: 500px) {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`;

export const FilterHeader = styled.div<{ showFilterDropdown: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .filter-heading {
    font-size: 24px;
    font-weight: 700;
    border-bottom: 1px solid var(--lightgray-extralight);
    color: var(--black-text);

    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }

  .dropdown-arrow {
    .icon {
      width: 20px;
      height: 28px;
      rotate: ${({ showFilterDropdown }) =>
    showFilterDropdown ? "0" : "180deg"};
      transition: all 0.1s ease-in-out;

      path {
        fill: var(--lightgray-medium);
      }

      @media screen and (max-width: 480px) {
        width: 18px;
        height: 24px;
      }
    }
  }
`;
