import styled from "styled-components";

export const CreateSurveyTypesMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateSurveyTypesTop = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const CreateSurveyTypesFormSection = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;
  @media screen and (max-width: 630px) {
    padding: 1em;
  }

  .multiselect-field {
    .input-field {
      .selected-items {
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 0.5em;
        align-items: center;
        cursor: pointer;

        .item {
          padding: 0.2em 0.5em;
          background: var(--primary);
          font-size: 13px;
          font-weight: 400;
          color: var(--white-constant);
          border-radius: 2px;
          min-width: 80px;
        }
      }
    }
  }

  .common-fields {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(308px, 1fr));
    gap: 1.5em;
    color: var(--lightgray-medium);
    font-size: 15px;
    font-weight: 400;

    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
  }
  .action-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    .buttons {
      display: flex;
      flex-direction: row;
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
  .upload-field {
    display: flex;
    flex-direction: column;
    gap: 1em;

    label {
      font-size: 16px;
      color: var(--black-text);
      font-weight: 400;
    }

    .field-wrapper {
      width: 100%;
      display: flex;
      gap: 1em;
      align-items: center;

      @media screen and (max-width: 500px) {
        gap: 0.5em;
      }
      /* @media screen and (max-width: 450px) {
          flex-direction: column;
        } */

      .file-name-section {
        width: 100%;
        border: 1px dashed var(--lightgray-medium);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        padding: 1em 0;
        cursor: pointer;

        @media screen and (max-width: 450px) {
          padding: 1em 0.5em;
        }

        .inner-content {
          display: flex;
          flex-direction: column;
          gap: 0.3em;
          max-width: 200px;

          .upload-text {
            display: flex;
            gap: 0.5em;
            align-items: center;
            .text {
              font-size: 16px;
              font-weight: 700;
              color: var(--black-text);
              text-align: center;

              @media screen and (max-width: 860px) {
                font-size: 14px;
              }
              @media screen and (max-width: 500px) {
                font-size: 12px;
              }
            }

            .icon {
              @media screen and (max-width: 450px) {
                display: none;
              }
              path {
                fill: var(--black-text);
              }
            }
          }

          .upload-restrictions {
            font-size: 13px;
            font-weight: 400;
            text-align: center;
            color: var(--lightgray-medium);

            @media screen and (max-width: 860px) {
              font-size: 11px;
            }
            @media screen and (max-width: 500px) {
              font-size: 10px;
            }
          }
        }
      }

      .uploaded-image {
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }

        &.cnic {
          /* @media screen and (max-width: 450px) {
              width: 100%;
            } */
          img {
            width: 140px;
            height: 140px;
            border-radius: 5px;

            @media screen and (max-width: 860px) {
              height: 106px;
            }
            @media screen and (max-width: 630px) {
              width: 120px;
            }
            @media screen and (max-width: 500px) {
              width: 100px;
              height: 97px;
            }
            /* @media screen and (max-width: 450px) {
                width: 100%;
                height: 106px;
              } */
          }
        }

        &.domicile {
          img {
            width: 140px;
            height: 120px;
            border-radius: 5px;

            @media screen and (max-width: 860px) {
              height: 86px;
            }
            @media screen and (max-width: 450px) {
              width: 120px;
              height: 80px;
            }
          }
        }
      }
    }
    .file {
      display: none;
    }
  }
  .form-data {
    background-color: var(--win-bg-color);
    padding: 20px;
    border-radius: 30px;
    width: 100%;
    overflow-y: auto;
  }
  .data-fields {
    width: 100%;
    display: flex;
    gap: 1.5em;
    color: var(--lightgray-medium);
    font-size: 15px;
    font-weight: 400;
    flex-wrap: wrap;
    .input-field {
      width: 30%;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      color: var(--lightgray-medium);
    }
    .input-field .field-wrap .field {
      background: var(--white-color);
    }
    .radio-field {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding-top: 0.5em;
      width: 30%;
    }
  }
  .dynamic-heading {
    color: var(--black-text);
    font-size: 18px;
    padding: 10px;
  }
`;
