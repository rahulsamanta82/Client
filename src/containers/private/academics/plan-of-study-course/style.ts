import styled from "styled-components";

export const StudyPlanCourseListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const StudyPlanCourseListingSection = styled.div`
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

  table td {
    .org-logo {
      width: 38px;
      height: 35px;
      background: var(--lightgray-extralight);
    }

    .mw-150 {
      min-width: 150px;
    }
    .mw-100 {
      min-width: 100px;
    }

    .expanded-content {
      display: flex;
      flex-direction: column;
      gap: 0.7em;

      .particular-info {
        display: flex;
        gap: 1em;
        .title {
          min-width: 170px;
          color: var(--black-text);
          font-size: 15px;
          font-weight: 400;
        }

        .info {
          font-size: 15px;
          font-weight: 400;
          color: var(--lightgray-medium);

          .table-action-icons {
            .action-icon {
              &.download {
                svg rect {
                  fill: var(--warning-yellow);
                  rx: 5;
                }
              }
            }
            @media screen and (max-width: 900px) {
              flex-wrap: wrap;
            }
          }
        }
      }
    }
  }
`;

export const StudyPlanCourseListingTop = styled.div`
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

  .download-list-button {
    display: flex;
    gap: 10px;
  }
`;
export const StudyPlanCourseListingStatsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 3em;

  @media screen and (max-width: 630px) {
    padding: 1em 1.5em;
  }
  .stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
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
    color: var(--black-text);
    font-weight: 400;
    font-size: 15px;
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
