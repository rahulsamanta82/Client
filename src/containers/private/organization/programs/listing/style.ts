import styled from "styled-components";

export const ProgramsListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ProgramsListingSection = styled.div`
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

          .table-action-icons{
            @media screen and (max-width: 900px){
              flex-wrap: wrap;
            }
          }
          .action-button {
            button {
              padding: 0.4em 0.5em;
              color: var(--white-constant);
              background: var(--lightgreen-medium);
              border-radius: 5px;
              font-size: 14px;
              font-weight: 600;

              &.criteria-btn {
                color: var(--white-color);
                background: var(--black-text);
              }
              &.entry-test-btn{
                color: var(--white-constant);
                background: var(--primary);
              }
              &.seats-btn {
                background: var(--light-orange);
              }
              &.special-btn {
                background: var(--medium-orange);
              }
            }
          }
        }
      }
    }
  }
`;

export const ProgramsListingTop = styled.div`
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
    .create-btn button{
      &.link-btn{
        display: flex;
        gap: .5em;
        align-items: center;
      }
    }
    @media screen and (max-width: 490px) {
      width: 100%;

      button {
        width: 100%;
      }
    }
  }
`;
