import styled from "styled-components";

export const CreateProjectTimeMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateProjectTimeTop = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const CreateProjectTimeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }
  .right-btn {
    display: flex;
    justify-content: end;
  }

  .rounded-btn-task {
    min-width: 100px;
    padding: 0 1em;
    border-radius: 8px;
    height: 50px;
    color: var(--white-constant);
    background: var(--primary);
  }
  .buttons-tasks{
    display: flex;
    align-items: end;
    gap: 1em;
    justify-content: end;
    margin-top: 1.2em;
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
  .extra-fields{
 
  }
`;
