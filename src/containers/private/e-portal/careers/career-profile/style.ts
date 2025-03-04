import styled, { css } from "styled-components";

export const EportalViewProfileMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const EportalViewProfileTopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: center;

  @media screen and (max-width: 560px) {
    justify-content: unset;
    flex-direction: column;
    align-items: unset;
    gap: 1em;

    .edit-profile-button {
      width: 100%;
      button {
        width: 100%;
      }
    }
  }
`;

export const StudentInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;
  @media screen and (max-width: 1167px) {
    flex-direction: column;
  }
  .profile-pic-section {
    width: 260px;
    min-height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2em;

    @media screen and (max-width: 1167px) {
      width: 100%;
    }
    .content-section {
      width: 180px;
      display: flex;
      flex-direction: column;
      gap: 1em;
      align-items: center;

      .profile-picture {
        img {
          width: 118px;
          height: 118px;
          border-radius: 50%;
        }
      }

      .user-name {
        width: 100%;
        color: var(--black-text);
        text-align: center;
        font-size: 16px;
        font-weight: 500;
      }

      .designation {
        color: var(--lightgray-medium);
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
    }
  }

  .employee-info {
    width: calc(100% - (260px + 1.5em));
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    @media screen and (max-width: 1167px) {
      width: 100%;
    }

    .fields-section {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5em;

      @media screen and (max-width: 450px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  .info-container {
    border-radius: 10px;
    background: var(--white-color);
    padding: 2em 1.5em;

    .header-part {
      width: 100%;
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 560px) {
        justify-content: unset;
        flex-direction: column;
        gap: 1em;

        .download-profile-button {
          width: 100%;
          button {
            width: 100%;
          }
        }
      }

      .heading-part {
        display: flex;
        gap: 0.5em;
        align-items: center;
        .icon-part {
          .icon {
            g {
              path {
                fill: var(--black-text);
              }
            }
          }
        }

        .heading {
          color: var(--black-text);
          font-weight: 500;
        }
      }
    }
  }
`;

export const InfoField = styled.div<{ gray: boolean; studentInfo?: boolean }>`
  width: 100%;
  height: 42px;

  @media screen and (max-width: 780px) {
    height: unset;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 1em;
  background: ${({ gray }) =>
    gray ? "var(--info-field-bg2)" : "var(--info-field-bg1)"};

  ${({ studentInfo }) =>
    !studentInfo &&
    css`
      justify-content: unset;
      gap: 3em;

      .title {
        width: 160px;
      }
    `}

  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--black-text);
  }

  .info {
    font-size: 14px;
    font-weight: 600;
    color: var(--lightgray-medium);
  }
`;

export const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .fields-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5em;

    @media screen and (max-width: 450px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const EducationalInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .data-table {
    table {
      tr:nth-child(odd) {
        background-color: var(--info-field-bg1);
      }

      tr:nth-child(even) {
        background-color: var(--info-field-bg2);
      }

      tr:first-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  .reason {
    color: var(--primary);
  }
`;
