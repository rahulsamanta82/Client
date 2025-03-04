import styled from "styled-components";

export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 3em;

  @media screen and (max-width: 630px) {
    padding: 1em 1.5em;
  }
  .stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .sats-item {
    display: flex;
    flex-direction: column;
  }
  .stats-title {
    font-size: 16px;
    font-weight: 400;
    color: var(--black-text);
    border-bottom: 1px solid var(--lightgray-medium-light);
    width: 100%;
    padding-bottom: 4px;
  }
  .stats-value {
    padding-top: 10px;
    color: var(--black-text);
    font-weight: 400;
    font-size: 15px;
  }

  .table-radio-field {
    display: flex;
    gap: 15px;
    align-items: center;
    padding-top: 4px;
    .radio label {
      padding-right: 5px;
    }
  }
  .rules {
    li {
      color: red;
      font-size: 16px;
    }
  }
  .rules-heading {
    font-size: 20px;
    color: red;
    font-weight: 500;
    margin-bottom: 20px;
    border-bottom: 2px solid red;
    width: 55px;
  }
  .rules {
    background-color: #fad4d4;
    padding: 30px;
    border-radius: 15px;
  }
`;

export const LeaveRequistionSection = styled.form`
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

    padding: 30px 20px;
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
    padding: 3em 2em 0 2em;
  }
  @media screen and (max-width: 880px) {
    padding: 1em;
  }
  .page-heading {
    font-size: 24px;
    font-weight: 700;
    border-bottom: 1px solid var(--lightgray-extralight);
    color: var(--black-text);
  }

  .common-fields {
    width: 100%;
    display: flex;
    /* flex-wrap: wrap; */
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
    .slot-input {
      width: 31.5%;
      @media screen and (max-width: 690px) {
        width: 100%;
      }
    }
    .radio-field {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding-top: 0.5em;
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

  .form-quotas-main {
    display: flex;
    gap: 1.5rem;
    @media screen and (max-width: 690px) {
      flex-wrap: wrap;
    }
  }
  .text-area {
    border: 1px solid var(--field-border);
    border-radius: 10px;
    background-color: var(--input-field-bg);

    textarea {
      width: 100%;
      height: auto;
      padding: 10px;
    }
  }
  .attachment-heading {
    font-size: 20px;
    color: var(--black-text);
    margin-top: 12px;
  }
  .attachments {
    border-bottom: 1px solid var(--field-border);
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .delete-icon {
    margin-top: 2.3em;
  }
`;

export const LeaveRequistionMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const LeaveRequistionTop = styled.div`
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
