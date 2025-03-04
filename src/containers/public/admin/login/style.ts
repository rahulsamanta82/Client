import styled from "styled-components";

export const LoginMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;


  @media screen and (max-width: 610px){
    padding: 0 1em;
  }
`;

export const LeftSection = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  

  @media screen and (max-width: 1220px){
    width: 100%;
    justify-content: center;
  }
`;

export const LoginForm = styled.form`
  width: 520px;
  padding: 2.5em 3em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: var(--win-bg-color);

  @media screen and (max-width: 610px){
    width: 100%;
  }
  @media screen and (max-width: 500px){
    padding: 2em 1em;
  }
  .forget{
    cursor: pointer;
  }


  .form-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;

    .heading {
      font-size: 27px;
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

export const RightSection = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1220px){
    display: none;
  }
`;

export const Content = styled.div`
  width: 632px;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: flex-start;

  .heading-section{
    width: 95%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 58px;
    color: var(--primary);

    .heading-1{
      font-weight: 700;
    }
  }

  .paragraph{
    font-size: 15px;
    font-weight: 400;
    color: var(--lightgray-medium);
  }
`;