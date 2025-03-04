import styled from "styled-components";

export const CertificateLinkCreateSection = styled.div<{
  expand: boolean | undefined;
}>`
  width: 100%;
  overflow-y: auto;
  background: var(--white-color);
  padding: 0px 1.4rem;
  @media screen and (max-width: 1588px) {
    padding-bottom: 15em;
  }
  @media screen and (max-width: 500px) {
    padding: 0 .5em 15em .5em;
  }
  border-radius: 30px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em 1em 2em;
    border-bottom: 1px solid var(--gray-light);

    @media screen and (max-width: 520px) {
      padding: 0 1em 1em 1em;
    }

    .heading {
      span {
        font-size: 32px;
        color: var(--black-text);
        font-weight: 500;

        @media screen and (max-width: 520px) {
          font-size: 28px;
        }
      }
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 30px 50px;

    @media screen and (max-width: 1080px) {
      width: 100%;
      padding: 3em 2em 0 2em;
    }
    @media screen and (max-width: 880px) {
      padding: 1em;
    }

    .common-fields {
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

      .multiselect-field {
        .input-field {
          .selected-items {
            user-select: none;
            width: 100%;
            height: 100%;
            display: flex;
            gap: 0.5em;
            align-items: center;
            cursor: pointer;

            .item {
              padding: 0.2em 0.5em;
              background: var(--primary);
              font-size: 12px;
              font-weight: 400;
              border-radius: 2px;
              color: var(--white-constant);
              min-width: 80px;
            }
          }
        }
      }
    }

    .action-buttons {
      width: 100%;
      display: flex;
      justify-content: end;
      padding-bottom: 2em;

      @media screen and (max-width: 835px) {
        display: ${({ expand }) => (expand ? "none" : "flex")};
      }

      .buttons {
        display: flex;
        gap: 1.5em;

        @media screen and (max-width: 600px) {
          width: 100%;
          flex-direction: column;

          button {
            width: 100%;
          }
        }
      }
    }
  }
`;
export const CertificateLinkCreateMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const CertificateLinkCreateTop = styled.div`
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
