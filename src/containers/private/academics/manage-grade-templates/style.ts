import styled from "styled-components";

export const ManageGradeTemplatesMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ManageGradeTemplatesSection = styled.div`
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
  .table-heading {
    border-bottom: 1px solid var(--gray-light);
    color: var(--black-text);
    padding-bottom: 15px;
    font-size: 24px;
    font-weight: 500;
  }
`;

export const ManageGradeTemplatesTop = styled.div`
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
    border-bottom: 2px solid var(--lightgray-extralight);
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
