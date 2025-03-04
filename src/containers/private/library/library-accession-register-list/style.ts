import styled from "styled-components";

export const AccessRegisterListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }

`;

export const AccessRegisterListingTop = styled.div`
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
    display: flex;
    gap: 10px;
  }
`;

export const AccessRegisterListingSection = styled.form`
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

`;
