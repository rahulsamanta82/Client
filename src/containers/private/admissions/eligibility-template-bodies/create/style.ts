import styled from "styled-components";

export const CreateAdmissionETBMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateAdmissionETBTop = styled.div`
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

    .page-heading{
      max-width: 700px;
    }
  }
`;

export const CreateAdmissionETBFormSection = styled.form`
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

    @media screen and (max-width: 650px) {
      width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
  }

  .submit-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1em;

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
