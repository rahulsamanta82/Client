import styled from "styled-components";

export const AdmissionStudentsListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const AdmissionStudentsListingSection = styled.div`
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
  .stats-heading {
    font-size: 24px;
    font-weight: 600;
    color: var(--black-text);
    border-bottom: 1px solid var(--gray-medium);
    padding-bottom: 15px;
  }
  /* Table container */
  .table-container {
    width: 100%;
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Table */
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    background-color: var(--input-field-bg);
  }

  .custom-table th,
  .custom-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
  }

  .custom-table th {
    font-weight: bold;
    color: var(--black-text);
  }

  .custom-table td {
    color: var(--lightgray-medium);
  }

  .custom-table tr:last-child td {
    border-bottom: none;
  }
  .stats-table {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const AdmissionStudentsListingTop = styled.div`
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

export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 2em 3em;

  @media screen and (max-width: 630px) {
    padding: 1em 1.5em;
  }
`;

export const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 2em;
  transition: all 2s ease-in-out;

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
  .submit-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .buttons {
      display: flex;
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
