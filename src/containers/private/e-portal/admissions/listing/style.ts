import styled from "styled-components";

export const MainApplicationList = styled.div`
  padding: 2em;
  width: 100%;
  height: 100%;
`;

export const HeadingDiv = styled.div`
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
    .create-btn button {
      &.link-btn {
        display: flex;
        gap: 0.5em;
        align-items: center;
      }
    }
    @media screen and (max-width: 490px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
export const ApplicationListSection = styled.form`
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 20px;
  margin-top: 2%;
  .form-heading {
    font-size: 24px;
    font-weight: 500;
    color: var(--black-text);
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .info-icon {
    @media (max-width: 425px) {
      width: 27%;
      height: 35%;
    }
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
  }
  .challan-input-main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1024px) {
      flex-wrap: wrap;
    }
  }
  .challan-label {
    font-size: 16px;
    font-weight: 400;
    color: var(--black-text);
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  .challan-input {
    border: 1px solid var(--field-border);
    width: 400px;
    height: 49.99px;
    border-radius: 8px;
    color: var(--black-text);
    padding-left: 10px;
    @media (max-width: 425px) {
      width: 360px;
    }
    @media (max-width: 400px) {
      width: 340px;
    }
    @media (max-width: 380px) {
      width: 320px;
    }
    @media (max-width: 355px) {
      width: 290px;
    }
    @media (max-width: 320px) {
      width: 270px;
    }
    @media (max-width: 320px) {
      width: 240px;
    }
  }
  .uploaded-parent {
    display: flex;
    gap: 2rem;
    margin-top: 1em;

    @media (max-width: 690px) {
      flex-wrap: wrap;
    }
  }
  .main-heading-div {
    display: flex;
    justify-content: space-between;

    @media (max-width: 690px) {
      flex-wrap: wrap;
    }

    .city-name {
      font-size: 15px;
      margin-left: 4px;
      color: var(--lightgray-medium);
    }
  }
  .sub-heading-div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    @media (max-width: 690px) {
      flex-wrap: wrap;
    }

    .apply-date-div {
      display: flex;
      gap: 7px;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
      background-color: #128bab33;
      border-radius: 5px;
    }
    .apply-date {
      color: var(--primary);
      font-size: 15px;
      font-weight: 400;
    }
  }
  .sub-heading {
    font-size: 15px;
    font-weight: 400;
    color: var(--lightgray-medium);
  }
  .apply-date-main-div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .line {
    border: 1px solid var(--field-border);
    margin-top: 20px;
  }

  .info-div {
    background-color: var(--info-bg);
    margin-top: 15px;
    border-radius: 4px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 15px;
    gap: 10px;

    .info-para {
      font-size: 15px;
      font-weight: 400;
      color: var(--lightgray-medium);
    }
  }

  .status-div {
    display: flex;
    margin-top: 10px;
    /* justify-content: center; */
    align-items: center;
    gap: 20px;
    @media (max-width: 690px) {
      flex-wrap: wrap;
    }
  }
  .status {
    display: flex;
    background-color: #db4b4a1a;
    border-radius: 5px;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .status-para {
      font-size: 15px;
      font-weight: 400;
      color: #ff4b4a;
    }
  }
  .last-date-div {
    display: flex;
    margin-top: 10px;

    align-items: center;
    gap: 20px;
    @media (max-width: 690px) {
      flex-wrap: wrap;
    }
  }
  .last-date {
    display: flex;
    background-color: #ffbb3826;
    border-radius: 5px;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .last-date-para {
      font-size: 15px;
      font-weight: 400;
      color: #ffbb38;
    }
  }
  .action-button {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    @media (max-width: 690px) {
      flex-wrap: wrap;
    }

    button {
      padding: 0.4em 0.5em;
      color: var(--white-constant);
      background: var(--lightgreen-medium);
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;

      &.upload-btn {
        color: var(--white-color);
        background: var(--black-text);
      }
      &.download-btn {
        color: var(--white-constant);
        background: var(--primary);
      }
      &.pay-btn {
        background: var(--medium-red);
      }
    }
  }
`;

export const ApplicationsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
