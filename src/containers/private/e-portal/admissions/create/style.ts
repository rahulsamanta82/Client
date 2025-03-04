import styled from "styled-components";

export const CreateAdmissionProgramMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0;
  }
`;

export const CreateAdmissionProgramTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const CreateAdmissionProgramFormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;
  background-color: var(--white-color);
  border-radius: 1em;

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

    @media screen and (max-width: 450px) {
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
  .form-top {
    border-bottom: 1px solid var(--field-border);
    padding-bottom: 20px;

    .form-heading {
      font-size: 24px;
      font-weight: 500;
      color: var(--black-text);
    }
    .top-para {
      font-size: 13px;
      font-weight: 400;
      color: var(--lightgray-medium);
    }
    .info {
      color: var(--primary);
      font-weight: 500;
    }
  }
`;
export const ProgramsSection = styled.div`
  .program-box {
    border: 1px solid var(--field-border);
    padding: 15px;
    width: 48%;
    border-radius: 8px;
  }
  ul {
    display: flex;
    gap: 2.5em;
    margin-left: 25px;
    margin-bottom: 20px;
    li {
      cursor: pointer;
    }
    .not-eligible-item::marker {
      color: red;
      font-size: 25px;
      cursor: pointer;
    }
    .eligible-item::marker {
      color: green;
      font-size: 25px;
      cursor: pointer;
    }
  }
  .numbers {
    color: var(--lightgray-medium);
    font-size: 16px;
    font-weight: 600;
  }
  .program-name {
    color: var(--primary);
    font-size: 18px;
    font-weight: 700;
  }
  .department {
    color: var(--black-text);
    font-size: 14px;
    font-weight: 600;
  }
  .flex {
    display: flex;
    gap: 10px;
  }
  .bottom-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: var(--black-text);
    }
  }
  .line {
    border: 1px solid var(--field-border);
  }
  .eligible-programs {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .green-portion {
    background-color: #0fcb0226;
    padding: 5px;
    border-radius: 5px;
  }
  .green-text {
    color: #43ac43;
    font-size: 14px;
    font-weight: 600;
  }
  .red-portion {
    background-color: #db4b4a1a;
    padding: 5px;
    border-radius: 5px;
    margin-block: 20px;
  }
  .red-text {
    color: #ff4b4a;
    font-size: 14px;
    font-weight: 600;
  }
  .not-eligible-programs {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .eligible-item,
  .not-eligible-item {
    cursor: pointer;
    color: var(--black-text);
  }

  .eligible-item.active,
  .not-eligible-item.active {
    color: var(--primary);
    font-weight: bold;
  }

  .eligible-item:hover,
  .not-eligible-item:hover {
    color: var(--primary);
  }
`;
