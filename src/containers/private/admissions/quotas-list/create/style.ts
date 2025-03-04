import styled from "styled-components";

export const CreateQuotaListSection = styled.form`
  width: 100%;
  /* height: 100%; */
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 0;
  padding: 0px 20px;
  border-radius: 30px;
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
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    /* padding-top: 3em; */
    padding: 30px 50px;

    @media screen and (max-width: 1080px) {
      width: 100%;
      padding: 3em 2em 0 2em;
    }
    @media screen and (max-width: 880px) {
      padding: 1em;
    }

    .common-fields {
      width: 100%;
      display: flex;
      gap: 1.5em;
      color: var(--lightgray-medium);
      font-size: 15px;
      font-weight: 400;

      @media screen and (max-width: 690px) {
        flex-wrap: wrap;
      }
      .input-fields {
        width: 100%;
      }

      .key-body {
        width: 100%;
        height: 95px;
        padding: 0 0.5em;
        border-radius: 5px;
        border: 1px solid var(--field-border);
        background: var(--input-field-bg);
        outline: none;
      }
    }
    .key-body-label {
      color: var(--black-text);
      font-size: 16px;
      font-weight: 400;
      line-height: 35px;
    }
    .merit-section {
      border: 1px solid var(--field-border);
      width: 100%;
      height: 274px;
      border-radius: 10px;
      padding: 10px;
      font-size: 13px;
      font-weight: 400;
      color: var(--lightgray-medium);
      p {
        margin-top: 4px;
      }
    }

    .action-buttons {
      width: 100%;
      display: flex;
      justify-content: end;
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

  .form-quotas-main {
    display: flex;
    gap: 1.5rem;
    @media screen and (max-width: 690px) {
      flex-wrap: wrap;
    }
  }

  .form-quotas,
  .from-quotas-2 {
    width: 50%;
    @media screen and (max-width: 690px) {
      width: 100%;
    }
  }
  /* .form-quotas{
    width: 50% !important;
  } */
`;
export const QuotaListDropdownMain = styled.div`
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
export const CreateQuotaListMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const QuotaListTop = styled.div`
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
