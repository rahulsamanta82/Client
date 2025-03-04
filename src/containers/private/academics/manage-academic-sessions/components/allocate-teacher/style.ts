import styled from "styled-components";

export const AddAllocateTeacherMain = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--modal-backshadow);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;

`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;
  align-items: flex-end;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em 1em 2em;
    border-bottom: 1px solid var(--gray-light);

    @media screen and (max-width: 520px) {
      padding: 0 1em 1em 1em;
    }

    .heading {
      span {
        font-size: 32px;
        color: var(--black-text);
        font-weight: 500;

        @media screen and (max-width: 520px) {
          font-size: 28px;
        }
      }
    }

    .close-icon {
      .icon {
        width: 20px;
        height: 19px;

        @media screen and (max-width: 520px) {
          width: 18px;
          height: 17px;
        }
        path {
          fill: var(--black-text);
        }
      }
    }
  }

  form {
    width: 990px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5em;
    padding-top: 3em;

    @media screen and (max-width: 1080px) {
      width: 100%;
      padding: 3em 2em 0 2em;
    }
    @media screen and (max-width: 880px) {
      padding: 1em;
    }

    .common-fields {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5em;
      color: var(--lightgray-medium);
      font-size: 15px;
      font-weight: 400;
      margin-top: 2em;

      @media screen and (max-width: 450px) {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
    }

    .checkbox-field {
      display: flex;
      gap: 0.5em;
      align-items: center;
      color: var(--black-text);
      font-size: 16px;
      font-weight: 400;

      input[type="checkbox"] {
        width: 15px;
        height: 15px;
        accent-color: var(--primary);
      }
    }
    .action-buttons {
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: 2em;

      .buttons {
        display: flex;
        gap: 2.5em;

        @media screen and (max-width: 600px) {
          width: 100%;
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }
    }
  }
`;
export const AllocateTeacherDropdownMain = styled.div`
  width: 100%;

  ul {
    border: 1px solid var(--field-border);
    background-color: var(--input-field-bg);
    width: 100%;
    height: 274px;
    overflow-y: auto;
    padding: 10px;
    top: 2.5em;
    left: 0px;
    z-index: 50;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 400;
    overflow-y: auto;

    .no-options-found {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary);
      display: flex;
      justify-content: center;
    }
  }

  li {
    padding: 0.5em 1em;
    border-radius: 5px;
    color: var(--lightgray-medium);
    list-style: none;
    display: flex;
    gap: 1em;
    align-items: center;

    input[type="checkbox"] {
      accent-color: var(--primary);
    }

    .item-text {
      padding-bottom: 0.3em;
    }
  }
  li:hover {
    background: var(--primary);
    cursor: pointer;
    color: var(--white-constant);
  }

  .text {
    overflow-x: hidden;
  }

  * {
    user-select: none;
  }
`;
