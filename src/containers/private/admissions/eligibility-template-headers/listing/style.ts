import styled from "styled-components";

export const AdmissionETHListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const AdmissionETHListingSection = styled.div`
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

        .table-radio-field {
      min-width: 150px;
      padding: 0 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;

      .radio {
        display: flex;
        gap: 0.5em;
        align-items: center;

        label {
          font-size: 15px;
          font-weight: 500;
        }

        input[type="radio"] {
          width: 16px;
          height: 16px;
        }
      }
    }

    .mw-150 {
      min-width: 150px;
    }
    .mw-100 {
      min-width: 100px;
    }
  }
`;

export const AdmissionETHListingTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;

  @media screen and (max-width: 930px) {
    flex-direction: column;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    @media screen and (max-width: 930px) {
      width: 100%;
    }
  }

  .right {
    @media screen and (max-width: 930px) {
      width: 100%;
    }
    .download-buttons {
      display: flex;
      gap: 0.5em;

      @media screen and (max-width: 930px) {
        width: 100%;
      }

      @media screen and (max-width: 520px){
        flex-direction: column;
      }

      .particular-button {
        @media screen and (max-width: 930px) {
          width: 50%;

          button {
            width: 100%;
          }
        }
        @media screen and (max-width: 520px) {
          width: 100%;

          button {
            width: 100%;
          }
        }
      }
    }
  }
`;