import styled from "styled-components";

export const VisitorsInfoMain = styled.div`
  width: 100%;
`;

export const VisitorsInfoListing = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
  border-radius: 20px;

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--lightgray-extralight);

    @media screen and (max-width: 550px){
      flex-direction: column;
      gap: 1.5em;
      justify-content: unset;

      .add-new-button{
        width: 100%;

        button{
          width: 100%;
        }
      }
    }

    .heading {
      span {
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);
      }
    }
  }

  .data-table {

    table {
      td {
        .image {
          img {
            width: 35px;
            height: 35px;
            border-radius: 3px;
          }
        }
      }
    }
  }
`;
