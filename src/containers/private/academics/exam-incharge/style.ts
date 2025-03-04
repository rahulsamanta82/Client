import styled from "styled-components";

export const ExamInchargeMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ExamInchargeSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }

  .list-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 630px) {
      flex-direction: column;
      gap: 1em;
    }
  }

  .table-info-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1em;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--lightgray-light);
    padding-bottom: 1em;

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 780px) {
          font-size: 18px;
        }
      }
    }
  }
  select {
    width: inherit;
  }
  .table-field {
    border: 1px solid var(--field-border);
    width: 100%;
    height: 40px;
    display: flex;
    border-radius: 5px;
  }
`;

export const ExamInchargeTop = styled.div`
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
