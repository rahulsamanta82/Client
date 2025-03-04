import styled from "styled-components";

export const CreateOrgSTMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const OrgSTCreateTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const OrgSTContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--white-color);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const FormStepper = styled.div`
  width: 100%;
  padding: 2em 0 3.5em 0;
  display: flex;
  border: 1px solid var(--lightgray-medium-light);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const FormSection = styled.div`
  width: 100%;
  padding: 2em 0;

  form {
    padding: 2.5em;

    @media screen and (max-width: 630px) {
      padding: 1em;
    }

    .submit-buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      @media screen and (max-width: 650px) {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }

      .buttons {
        display: flex;
        gap: 1.5em;

        @media screen and (max-width: 650px) {
          width: 100%;
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }
    }

    .step-4 {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 4em;
      align-items: center;
      .success-popup {
        width: 728px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1.5em;

        @media screen and (max-width: 940px) {
          width: 100%;
        }

        .success-icon {
          width: 100%;
          display: flex;
          justify-content: center;

          .icon {
            width: 180px;
            height: 165px;
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 1em;

          .heading {
            text-align: center;
            span {
              font-weight: 600;
            }
          }

          .text {
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: var(--black-text);
          }
        }
      }
    }

    .input-field {
      color: var(--lightgray-medium);
    }
    .step-1 {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2em;

      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;

        @media screen and (max-width: 450px) {
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
      }
    }

    .step-2 {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2em;

      .common-fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
      }

      .upload-input-field {
        @media screen and (max-width: 800px) {
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }

    .step-3 {
      display: flex;
      flex-direction: column;
      gap: 2em;
      .detail-fields {
        padding-top: 1em;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
      }
      .submit-button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;
