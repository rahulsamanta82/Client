import styled from "styled-components";

export const UploadBankScrollMain = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--modal-backshadow);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
`;

export const UBSContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;
  align-items: flex-end;
`;

export const UBSContentWrapper = styled.div`
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

    @media screen and (max-width: 520px){
        padding: 0 1em 1em 1em;
    }

    .heading {
      span {
        font-size: 32px;
        color: var(--black-text);
        font-weight: 500;

        @media screen and (max-width: 520px){
            font-size: 28px;
        }
      }
    }

    .close-icon {
      .icon {
        width: 20px;
        height: 19px;

        @media screen and (max-width: 520px){
            width: 18px;
            height: 17px;
        }
        path {
          fill: var(--black-text);
        }
      }
    }
  }

  form{
    width: 990px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-top: 3em;

    @media screen and (max-width: 1080px){
        width: 100%;
        padding: 3em 2em 0 2em;
    }
    @media screen and (max-width: 880px){
        padding: 1em;
    }

    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
      }
    }

    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 2em;

        .buttons{
            display: flex;
            gap: 2.5em;

            @media screen and (max-width: 600px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
  }
`;
