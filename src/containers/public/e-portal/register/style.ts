import styled from "styled-components";

export const StudentRegisterMain = styled.div`
  width: 100%;
  @media screen and (max-width: 630px){
    padding: 0 1em;
  }
`;

export const RegisterForm = styled.form`
  width: 560px;
  height: 90vh;
  overflow-y: auto;
  padding: 2.5em 3em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  border-radius: 0 12px 12px 0 !important;

  @media screen and (max-width: 1260px){
    border-radius: 12px !important;
    margin: auto;
  }

  @media screen and (max-width: 630px){
    width: 100%;
    padding: 2.5em 1em;
  }

    .error-text{
    font-weight: 400;
    font-size: 16px;
    color: var(--black-text);
  }
  .error-box{
    background-color: var(--primary-extralight);
    padding: 10px 20px;
    margin-top: 10px;
  }


  .form-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    /* align-items: center; */

    .heading {
      font-size: 18px;
      font-weight: 400;
      color: var(--primary);

      @media screen and (max-width: 610px){
        font-size: 20px;
      }
    }
    .sub-heading {
      font-size: 14px;
      font-weight: 400;
      color: var(--lightgray-light);

      @media screen and (max-width: 610px){
        font-size: 12px;
      }
    }
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .bottom-options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;

      @media screen and (max-width: 610px){
        font-size: 12px;
      }

    .remember-me {
      display: flex;
      gap: 0.5em;
      align-items: center;
      padding-left: 0.5em;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--primary);
      }

      label{
        color: var(--black-text);
      }
    }

    span {
      color: var(--black-text);
    }
  }

  .submit-button {
    width: 100%;
    padding-top: 1em;

    button {
      width: 100%;
      height: 50px;
      color: white;
      font-size: 20px;
      background: var(--primary);
      border-radius: 5px;
      font-weight: 600;

      @media screen and (max-width: 610px){
        font-size: 16px;
      }

      .loader{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .password-icon{
    width: 14px;
    height: 13px;
  }

  .bottom-text{
    width: 100%;
    display: flex;
    justify-content: center;
    color: var(--black-text);

        @media screen and (max-width: 610px){
        font-size: 12px;
      }
  }
`;

export const SiteLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
`;