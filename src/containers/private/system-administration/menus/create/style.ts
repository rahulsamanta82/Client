import styled from "styled-components";

export const CreateUserSection = styled.form`
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
  .radio-field {
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding-top: 0.5em;
    width: 100%;
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
  }

  .form-quotas-main {
    display: flex;
    gap: 1.5rem;
    @media screen and (max-width: 690px) {
      flex-wrap: wrap;
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
  }
`;

export const CreateUserMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const CreateUserTop = styled.div`
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
