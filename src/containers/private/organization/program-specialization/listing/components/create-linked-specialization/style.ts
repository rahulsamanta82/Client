import styled from "styled-components";

export const CreateLinkedSpecializationMain = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--modal-backshadow);
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;
  align-items: flex-end;
`;



export const ContentWrapper = styled.div<{ expand: any }>`
  width: 100%;
  height: ${({ expand }) => expand && '500px'};
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;

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
          color: var(--white-constant);
          min-width: 80px;
        }
      }
    }
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em 1em 2em;
    border-bottom: 1px solid var(--gray-light);

    @media screen and (max-width: 520px){
        padding: 0 1em 1em 1em;
    }

    .heading {
      span {
        font-size: 32px;
        color: var(--black-text);
        font-weight: 500;

        @media screen and (max-width: 520px){
            font-size: 28px;
        }
      }
    }

    .close-icon {
      .icon {
        width: 20px;
        height: 19px;

        @media screen and (max-width: 520px){
            width: 18px;
            height: 17px;
        }
        path {
          fill: var(--black-text);
        }
      }
    }
  }

  form{
    width: 550px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding-top: 3em;

    @media screen and (max-width: 600px){
        width: 100%;
        padding: 3em 1.5em 0 1.5em;
    }

    .common-fields{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;
    }

    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: center;
        padding-bottom: 2em;

        .buttons{
            display: flex;
            gap: 2.5em;

            @media screen and (max-width: 600px){
                width: 100%;
                flex-direction: column;
                gap: 1.5em;

                button{
                    width: 100%;
                }
            }
        }
    }
  }
`;
