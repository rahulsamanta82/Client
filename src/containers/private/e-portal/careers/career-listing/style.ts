import styled from "styled-components";

export const JobListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
  .container {
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }
`;

export const JobListingTop = styled.div`
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

export const JobListingLeft = styled.div`
  background-color: var(--white-color);
  width: 100%;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
  padding: 1rem;
  border-radius: 20px;

  .search-input {
    border-radius: 40px;
    background-color: var(--header-utility-icons-bg);
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1em;

    .search-icon {
      width: 19.45px;
      height: 20.82px;
    }

    input {
      color: var(--metalic-gray);
      margin-left: 5px;
      padding-left: 5px;
    }
  }
  .search-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-title {
    font-size: 16px;
    font-weight: 600;
    margin-top: 15px;
    color: var(--black-text);
  }
  .common-fields {
    width: 100%;
    padding-top: 2em;
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

  .action-buttons {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 1em;
    margin-top: 20px;
    flex-wrap: wrap;
  }
`;
export const JobListingRight = styled.div`
  width: 100%;

  .left-top {
    display: flex;
    justify-content: space-between;
    border-bottom: 4px solid var(--gray-light);
    padding-bottom: 10px;
  }
  .main-heading {
    color: var(--primary);
    font-size: 28px;
    font-weight: 500;
  }
  .select-field {
    width: 150px;
    height: 36px;
    border: 1px solid var(--gray-light);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    select {
      color: var(--metalic-gray);
      background: var(--win-bg-color);
    }
  }
  .job-description-main {
    background-color: var(--white-color);
    padding: 16px;
    border-radius: 20px;
    margin-top: 2rem;
  }
  .description-title {
    color: var(--primary);
    font-size: 22px;
    font-weight: 500;
  }
  .title-main {
    display: flex;
    justify-content: space-between;
  }
  .job-description {
    font-size: 15px;
    padding-block: 27px;
    color: var(--black-text);
  }
  .department {
    color: var(--black-text);
    font-size: 16px;
    font-weight: 700;
  }
  .office {
    color: var(--modal-grey);
    font-size: 16px;
    margin-left: 10px;
    font-weight: 400;
  }
  .job-title {
    font-size: 14px;
    color: var(--lightgray-medium);
  }
  .job-data {
    font-size: 14px;
    color: var(--lightgray-light);
  }
  .detail {
    display: flex;
    gap: 5px;
  }
  .job-details {
    display: flex;
    gap: 10px;
    padding-block: 1rem;
    flex-wrap: wrap;
  }
  .submit-buttons {
    display: flex;
    justify-content: end;
  }

  .jobs-listing {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`;
