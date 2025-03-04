import styled from "styled-components";

export const MedicalOthersMain = styled.div`
  width: 100%;
`;

export const ContentPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;

  @media screen and (max-width: 550px){
    padding: 2em 1em;
  }
  .header-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--lightgray-extralight);

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);
      }
    }
  }

  form {
    width: 100%;
    padding-top: 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
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

    .submit-button{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 1em;

      @media screen and (max-width: 822px){
        button{
          width: 100%;
        }
      }
    }
  }
`;
