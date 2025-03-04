import styled from "styled-components";

export const FinanceDashboardMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const FDTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const FDContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  .line-graph-container {
    width: 100%;
    display: flex;
    gap: 20px;
  }
`;

export const HeadlineCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const HeadlineCard = styled.div`
  /* width: 24%; */
  display: flex;
  flex-direction: column;
  gap: 2em;
  background: var(--white-color);
  border-radius: 20px;
  padding: 1em;

  .header {
    width: 100%;
    display: flex;
    gap: 0.8em;
    align-items: center;

    .title {
      color: var(--black-text);
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .lower-part {
    width: 100%;
    display: flex;
    gap: 1em;
    align-items: flex-end;
    justify-content: space-between;

    .stats {
      display: flex;
      flex-direction: column;
      .total {
        font-size: 14px;
        font-weight: 600;
        color: var(--black-text);
      }

      .percentage {
        font-size: 14px;
        font-weight: 400;
        color: var(--primary);
      }
    }
  }
`;

export const MainStatCards = styled.div`
  width: 50%;
  display: flex;
  gap: 1em;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
  .pie-chart-section {
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 101%;
    height: 83%;
  }
`;

export const MainStatCard = styled.div`
  width: 100%;
  background-color: var(--white-color);
  border-radius: 20px;
  padding: 1em;

  @media screen and (max-width: 950px) {
    width: 100%;
  }

  .header-section {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    .title {
      span {
        font-size: 32px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 1280px) {
          font-size: 24px;
        }
      }
    }

    .description {
      color: var(--black-text);
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 3em;

  @media screen and (max-width: 630px) {
    padding: 1em 1.5em;
  }
  .filter-fields {
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
  .stats-container {
    background-color: var(--win-bg-color);
    padding: 25px;
    border-radius: 27px;
  }
  .stats-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .stats-heading {
    font-size: 28px;
    font-weight: 500;
    color: var(--black-text);
    margin-bottom: 1em;
  }
  .sats-item {
    display: flex;
    flex-direction: column;
  }
  .stats-title {
    font-size: 16px;
    font-weight: 400;
    color: var(--black-text);
    border-bottom: 1px solid var(--lightgray-medium-light);
    width: 100%;
    padding-bottom: 4px;
  }
  .stats-value {
    padding-top: 10px;
    color: var(--lightgray-light);
    font-weight: 400;
    font-size: 15px;
  }
  .stats-heading-main {
    display: flex;
    justify-content: space-between;
  }
  .stat-heading-right {
    display: flex;
    gap: 10px;
  }
  .stats-amount {
    font-size: 16px;
    font-weight: 400;
    color: var(--black-text);
    width: 100%;
    padding-bottom: 4px;
    padding-top: 10px;
  }

  .table-radio-field {
    display: flex;
    gap: 15px;
    align-items: center;
    padding-top: 4px;
    .radio label {
      padding-right: 5px;
    }
  }
`;
