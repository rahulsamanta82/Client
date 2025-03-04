import styled from "styled-components";


export const CreateBuildingMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const CreateBuildingTopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em;

    @media screen and (max-width: 630px){
        padding: 1em;
    }

    .upload-field {
      display: flex;
      flex-direction: column;
      gap: .5em;
      width: 100%;
      @media (max-width:690px) {
       width :100% ;
      }

      label {
        font-size: 16px;
        color: var(--black-text);
        font-weight: 400;
      }

      .field-wrapper {
        width: 95%;
        display: flex;
        gap: 1em;
        align-items: start;
        flex-direction: row;

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
          height: 106px;
          width: 325px;
          @media screen and (max-width:690px) {
            width: 153%;
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

        .uploaded-image {
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
          }

          &.cnic {
            img {
              width: 111px;
              height: 105px;
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

    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;
        @media screen and (max-width: 450px){
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
    }

    .submit-buttons{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .buttons{
            display: flex;
            gap: 1em;

            @media screen and (max-width: 650px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
`;