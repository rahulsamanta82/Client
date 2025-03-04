import styled from "styled-components";

export const SubjectManagementCreateMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const SubjectManagementCreateTop = styled.div`
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


export const SubjectManagementCreateSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 630px){
        padding: 1em 1.5em;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2em;
    transition: all 2s ease-in-out;


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
        margin-top: 1.5em;

        .buttons{
            display: flex;
            gap: 1em;

            @media screen and (max-width: 690px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
    .particular-info {
            display: flex;
            gap: 10px;
            .title {
              /* min-width: 170px; */
              color: var(--black-text);
              font-size: 15px;
              font-weight: 400;
            }
            .info {
                font-size: 15px;
                font-weight: 400;
                color: var(--lightgray-medium);
              }
        }
        .main-drop-down{
            display: flex;
            justify-content: space-between;
            padding: 15px 0px;
            border-bottom: 1px solid var(--lightgray-extralight);

        }
        .table-radio-field{
        display: flex;
        gap: 20px;
    }
    .radio{
        display: flex;
        justify-content: center;
        gap: 5px;
    }
  
`;


