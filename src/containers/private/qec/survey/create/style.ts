import styled from "styled-components";

export const CreateSurveyMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
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

    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
  }

  .upload-input-field {
    @media screen and (max-width: 800px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .detail-fields {
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .action-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .buttons {
      display: flex;
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
`;
