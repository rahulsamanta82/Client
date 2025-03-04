import styled from "styled-components";

export const AddVisitorMain = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--modal-backshadow);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;
  align-items: flex-end;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 1em;
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
    width: 650px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-top: 3em;

    @media screen and (max-width: 700px){
      width: 100%;
      padding: 3em 1.5em 0 1.5em;
    }

    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 700px){
          display: flex;
          flex-direction: column;
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

        .file-name-section {
          width: 320px;
          border: 1px dashed var(--lightgray-medium);
          border-radius: 8px;
          display: flex;
          justify-content: center;
          padding: 1em 0;
          cursor: pointer;

          @media screen and (max-width: 700px){
            width: 100%;
          }

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
                /* @media screen and (max-width: 500px) {
                  font-size: 12px;
                } */
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

        .uploaded-image {
          padding-top: .2em;
          img {
            width: 95px;
            height: 95px;
            border-radius: 4px;
            object-fit: cover;
          }
        }
      }
    }

    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2em 0;

        .buttons{
            display: flex;
            gap: 2.5em;

            @media screen and (max-width: 600px){
                width: 100%;
                flex-direction: column;
                gap: 1.5em;

                button{
                    width: 100%;
                }
            }
        }
    }
  }
`;
