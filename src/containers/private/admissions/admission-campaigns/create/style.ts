import styled from "styled-components";

export const CreateAdmissionCampaignMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const CreateAdmissionCampaignTop = styled.div`
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const CreateACFormSection = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em;
  @media screen and (max-width: 630px) {
    padding: 1em;
  }

  .multiselect-field {
    .input-field {
      .selected-items {
        user-select: none;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 0.5em;
        align-items: center;
        cursor: pointer;

        .item {
          padding: 0.2em 0.5em;
          background: var(--primary);
          font-size: 13px;
          font-weight: 400;
          color: var(--white-constant);
          border-radius: 2px;
          min-width: 80px;
        }
      }
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
  .action-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 1em;

      @media screen and (max-width: 500px) {
        width: 100%;
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  }
`;
