import styled from "styled-components";

export const ResetMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media screen and (max-width: 630px){
    padding: 0 1em;
  }
`;

export const ResetForm = styled.form`
  width: 560px;
  overflow-y: auto;
  padding: 2.5em 3em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  border-radius: 12px !important;
  background-color: var(--win-bg-color);

  @media screen and (max-width: 1260px){
    border-radius: 12px !important;
    margin: auto;
  }

  @media screen and (max-width: 630px){
    width: 100%;
    padding: 2.5em 1em;
  }
  .sign{
        color: var(--primary);
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

.radio-input{
  padding-left: 5px;
}
.radio{
  width: 18px;
  height: 18px;
  background-color: var(--primary);
  margin-top: 5px;

}
  .form-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
    text-align: center;

        /* &.reset-password{
      padding-top: 5em;
    } */
     
    .heading {
        font-size: 27px;
    font-weight: 400;
    color: var(--primary);

      @media screen and (max-width: 610px){
        font-size: 20px;
      }
    }
    .sub-heading {
      font-size: 16px;
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
  .link-text{
    font-weight: 400;
    font-size: 16px;
    color: var(--black-text);
  }
`;

export const SiteLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 319px;
  }
`;