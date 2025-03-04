import styled from "styled-components";

export const EligibilityTemplateCreateSection = styled.div`
  width: 100%;
  /* height: 100%; */
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 0;
  padding: 0px 20px;
  border-radius: 30px;

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
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5em;
      color: var(--lightgray-medium);
      font-size: 15px;
      font-weight: 400;

      @media screen and (max-width: 690px) {
        flex-wrap: wrap;
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

    .upload-field {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      width: 49%;
      @media (max-width: 690px) {
        width: 100%;
      }

      label {
        font-size: 16px;
        color: var(--black-text);
        font-weight: 400;
      }

      .field-wrapper {
        width: 65%;
        display: flex;
        gap: 1em;
        align-items: start;
        flex-direction: column;

        @media screen and (max-width: 500px) {
          gap: 0.5em;
        }
        /* @media screen and (max-width: 450px) {
          flex-direction: column;
        } */

        .file-name-section {
          width: 150%;
          border: 1px dashed var(--lightgray-medium);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          padding: 1em 0;
          cursor: pointer;
          height: 79px;
          @media screen and (max-width: 690px) {
            width: 153%;
          }

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
            img {
              width: 94px;
              height: 78px;
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
            }
          }
        }
      }
    }

    .action-buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-bottom: 1em;

      .buttons {
        display: flex;
        gap: 1em;

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
export const QuotaListDropdownMain = styled.div`
  width: 100%;

  ul {
    border: 1px solid var(--field-border);
    background-color: var(--input-field-bg);
    width: 50%;
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
export const EligibilityTemplateCreateMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const EligibilityTemplateCreateTop = styled.div`
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
