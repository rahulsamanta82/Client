import styled from "styled-components";

export const CreateConferenceMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateConferenceTop = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const CreateConferenceForm = styled.form`
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
    grid-template-columns: repeat(auto-fit, minmax(308px, 1fr));
    gap: 1.5em;
    color: var(--lightgray-medium);
    font-size: 15px;
    font-weight: 400;

    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
    textarea {
      border: 1px solid var(--field-border);
      background-color: var(--input-field-bg);
      padding: 10px;
      border-radius: 10px;
    }
  }

  .upload-file-field {
    display: flex;
    gap: 2em;
    @media screen and (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .action-buttons {
    display: flex;
    gap: 0.5em;
    padding-left: 1em;
    .particular-btn {
      svg {
        rect {
          fill-opacity: 1;
        }
        path {
          fill: var(--white-constant);
        }
      }
    }
  }
  .submit-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .buttons {
      display: flex;
      gap: 1em;

      @media screen and (max-width: 650px) {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`;
