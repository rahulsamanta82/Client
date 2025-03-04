import styled from "styled-components";

export const OvertimeSlotsListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
  .info-main {
    display: flex;
    gap: 15px;
    margin-block: 10px;
  }
  .info-title {
    font-size: 14px;
    color: var(--lightgray-medium);
    font-weight: 600;
  }
  .auth-title {
    font-size: 14px;
    color: #128b9b;
    font-weight: 600;
  }
  .auth-value {
    font-size: 14px;
    font-weight: 400;
    color: #128b9b;
  }
  .info-value {
    font-size: 14px;
    font-weight: 400;
    color: var(--lightgray-light);
  }
  .info-container {
    display: flex;
    gap: 4em;
    flex-wrap: wrap;
  }
  .info-containers {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
  .status {
    color: #43ac43;
    background-color: #0fcb0226;
    padding: 3px;
    font-size: 14px;
    border-radius: 8px;
  }
  .info-card-main {
    width: 100%;
    display: flex;
    gap: 3em;
  }
  .info-heading {
    font-size: 24px;
    color: var(--black-text);
    border-bottom: 1px solid var(--lightgray-medium);
    padding-bottom: 20px;
  }
  .content-radius-shadow {
    width: 100%;
    padding: 1em;
  }
  .progress-container {
    width: 100%;
    background-color: #dfeaf2;
    border-radius: 5px;
    height: 20px;
    margin: 20px 0;
  }

  .progress-bar {
    background-color: #128b9b;
    height: 100%;
    text-align: center;
    line-height: 20px;
    color: white;
    border-radius: 5px;
    transition: width 0.3s ease;
  }

  .progress-heading {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .primary-bar {
    height: 10em;
    border-left: 4px solid #128b9b;
  }
  .green-bar {
    border-left: 4px solid #43ac43;
    height: 10em;
  }
  .red-bar {
    border-left: 4px solid #ff4b4a;
    height: 10em;
  }
  .green-bar-main {
    display: flex;
    margin-left: 10px;
  }
  .main-container {
    display: flex;
    gap: 10px;
    margin: 10px;
  }
  .approved {
    color: #43ac43;
    font-weight: 600;
    font-size: 16px;
  }
  .recommend {
    color: #128b9b;
    font-weight: 600;
    font-size: 16px;
  }
  .initiate {
    color: #ff4b4a;
    font-weight: 600;
    font-size: 16px;
  }
  .bullet {
    margin-left: 6px;
  }
`;

export const OvertimeSlotsListingTop = styled.div`
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
    @media screen and (max-width: 490px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
