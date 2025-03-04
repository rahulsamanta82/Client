import styled from "styled-components";

export const SetOffDaysMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
  .days-main {
    display: flex;
    justify-content: space-between;
    padding: 30px;
  }
  .days-name-selected {
    background-color: #ffbb3826;
    color: #ffbb38 !important;
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
  }
  .days-name {
    padding: 5px 15px;
    color: var(--black-text);
    cursor: pointer;
  }
`;

export const SetOffDaysTop = styled.div`
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
