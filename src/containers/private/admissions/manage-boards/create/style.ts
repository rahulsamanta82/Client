import styled from "styled-components";

export const BoardManagementCreateMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const BoardManagementCreateTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 690px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 690px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 690px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;

export const BoardManagementCreateSection = styled.div`
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


      .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
    }

  .custom-multi-select {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
    border: 1px solid var(--field-border);
    padding: 8px;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background-color: var(--input-field-bg);

    .dropdown-icon {
      padding-top: 0.4em;
      svg {
        width: 15px;
        height: 8px;
        rotate: 180deg;

        path {
          fill: var(--lightgray-medium);
        }
      }
    }
  }

  .field-wrap.multiselect {
    position: relative;
  }

  .selected-options-container {
    width: 100%;
    display: flex;
    gap: 5px;
    min-height: 30px;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .selected-option {
    display: flex;
    align-items: center;
    background-color: var(--primary);
    color: var(--white-constant);
    padding: 5px 10px;
    border-radius: 5px;
  }

  .selected-option button {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .dropdown-wrapper {
    padding-top: 1em;
  }

  .submit-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;

    .buttons {
      display: flex;
      gap: 1em;

      @media screen and (max-width: 690px) {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`;
