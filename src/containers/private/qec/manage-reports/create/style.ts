import styled from "styled-components";

export const CreateReportManageMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateReportManageTop = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const CreateReportManageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
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


    .upload-container {
    display: flex;
  }
  /* Upload section styling */
  .upload-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
  .upload-label {
    display: flex;
    background-color: var(--field-border);
    color: var(--black-text);
    border-radius: 8px 0px 0px 8px;
    cursor: pointer;
    width: 100%;
    height: 50px;
    align-items: center;
    padding: 5px 10px;
    font-size: 14px;
  }
  .file-input {
    display: none;
  }
  /* File details section styling */
  .file-details-section {
    padding: 10px;
    background-color: var(--input-field-bg);
    border-radius: 4px;
    width: 75%;
    height: 50px;
    border: 1px solid var(--field-border);
  }
  .file-placeholder {
    margin: 0;
    color: #777;
    text-align: center;
  }
`;
