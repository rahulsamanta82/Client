import styled, { css } from "styled-components";

export const EditEPortalProfileMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const EditEPortalProfileTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const EditProfileContentSection = styled.div`
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

    .common-fields {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5em;

      @media screen and (max-width: 450px) {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }
    }

    .submit-buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 1em;

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
  }
`;

export const Step1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .upload-cnic-card {
    width: 100%;
    display: flex;
    gap: 2em;

    @media screen and (max-width: 1060px) {
      flex-wrap: wrap;
    }

    .upload-field {
      width: 50%;

      @media screen and (max-width: 1060px) {
        width: 100%;
      }

      .uploaded-image {
        img {
          width: 100px;
          height: 118px;
          border-radius: 15px;
        }
      }
    }
  }
`;

export const Step2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const Step3 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .skills-questions {
    width: 100%;
    display: flex;
    gap: 3em;
  }

  .next-of-kins-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-top: 1em;

    .heading {
      span {
        color: var(--lightgray-medium);
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`;

export const Step4 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7em;

  .back-button {
    gap: 10px;
    display: flex;
  }
`;

export const TableWrapper = styled.div<{ isTableOverflowing: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  /* 
  .data-tables {
    width: 100%;
  } */
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 640px) {
      flex-direction: column;
      gap: 1em;
    }
    .heading {
      span {
        font-size: 32px;
        font-weight: 500;
        color: var(--primary);

        @media screen and (max-width: 920px) {
          font-size: 28px;
        }

        @media screen and (max-width: 450px) {
          font-size: 24px;
        }
      }
    }
    .add-btn {
      @media screen and (max-width: 640px) {
        width: 100%;
        .lg-rounded-btn {
          width: 100%;
        }
      }
    }
  }

  table {
    td {
      .checkbox {
        input[type="checkbox"] {
          width: 20px;
          height: 20px;
          accent-color: var(--primary);
        }
      }

      .action-menu {
        width: 30px;
        position: relative;

        .menu-icon {
          .icon {
            rect {
              fill: var(--primary);
            }
          }
        }
      }
    }
  }
`;
