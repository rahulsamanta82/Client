import styled from "styled-components";

export const AdmissionETBListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const AdmissionETBListingSection = styled.div`
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
    .data-wrap {
      display: flex;
      gap: 0.5em;
      align-items: center;
    }

    .mw-150 {
      min-width: 150px;
    }
  }
`;

export const AdmissionETBListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 640px) {
      width: 100%;
    }

    .page-heading {
      /* max-width: 450px; */
    }
  }

  .right {
    @media screen and (max-width: 670px) {
      width: 100%;
    }
    .download-buttons {
      display: flex;
      gap: 0.5em;
      flex-wrap: wrap;

      @media screen and (max-width: 670px) {
        width: 100%;
        flex-direction: column;
      }

      .particular-button {
        @media screen and (max-width: 670px) {
          width: 100%;
        }

        button {
          &.iconed {
            display: flex;
            gap: 0.5em;
            justify-content: center;
            align-items: center;

            .icon {
              padding-top: 0.2em;

              svg {
                path {
                  stroke: var(--white-color);
                }
              }
            }
          }
          @media screen and (max-width: 670px) {
            width: 100%;
          }
        }
      }
    }
  }
`;
