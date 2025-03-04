import { createGlobalStyle } from "styled-components";

const FormsStyles = createGlobalStyle`

    .input-field{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: .8rem;
        color: var(--lightgray-medium);

        label{
            color: var(--black-text);
            font-size: 16px;
            font-weight: 400;
        }

        .field-wrap{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.2em;
            .field{
            width: 100%;
            height: 50px;
            display: flex;
            gap: 0.2em;
            padding: 0 0.5em;
            border-radius: 5px;
            border: 1px solid var(--field-border);
            background: var(--input-field-bg);

            input,select,textarea{
                width: 100%;
                height: 100%;
                resize: none;

                &::placeholder{
                    color: inherit;
                }
            }

            textarea{
              min-height: 150px;
              /* padding: .5em 0 0 .5em; */
              padding-top: .5em;
            }

            option{
                background: var(--white-color);
                padding: 1em;
            }

            .field-icon{
                height: 100%;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
        }
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

  .placeholder-text{
    color: var(--lightgray-medium);
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

            .radio-field {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding-top: 0.5em;
      label {
        color: var(--black-text);
        font-size: 16px;
        font-weight: 400;
      }

      .field-wrap {
        display: flex;
        gap: 3em;

        @media screen and (max-width: 1120px) {
          gap: 1.5em;
          flex-wrap: wrap;
        }

        .field {
          display: flex;
          gap: 0.5em;
          align-items: center;

          input {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .upload-profile-image-field{
        width: 100%;
        .field{
        display: flex;
        flex-direction: column;
        gap: .8em;

        .image{
            width: 150px;
            height: 150px;

            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        label{
            width: 150px;
            text-align: center;
            color: var(--black-text);
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
        }
    }
    }
    
    .editor-field{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1em;

        label{
        color: var(--black-text);
        font-size: 16px;
        font-weight: 400; 
        }

        .field-wrap{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.2em;
        .field{
            width: 100%;
        }
        }
    }

    input[type="checkbox"], input[type="radio"]{
        accent-color: var(--primary);
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

      label{
        user-select: none;
      }
    }
    .upload-field {
      display: flex;
      flex-direction: column;
      gap: .5em;

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

          @media screen and (max-width: 450px){
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
                @media screen and (max-width: 450px){
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

        .uploaded-file {
          width: 150px;
          height: 115px;
          border: 1px solid var(--lightgray-light);
          border-radius: 4px;
          img{
            width: 100%;
            height: 100%;
            /* border-radius: 50%; */
            object-fit: cover;
          border-radius: 4px;

          }
        }
      }
    }
`;

export default FormsStyles;
