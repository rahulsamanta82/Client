import styled from "styled-components";

export const HostelApplyNowMain = styled.div`

`;

export const HostelListingSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5em;
  padding: 2em;
  background-color: var(--white-color);
  border-radius: 20px;

  @media screen and (max-width: 630px) {
    padding: 1em;
  }
  .table-header {
    padding-bottom: 1em;
    border-bottom: 1px solid var(--lightgray-extralight);

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);
      }
    }
  }

  table td {
    .apply-now-button {
      button {
        width: 90px;
        height: 30px;
        background: var(--primary);
        color: var(--white-constant);
        border-radius: 5px;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
`;