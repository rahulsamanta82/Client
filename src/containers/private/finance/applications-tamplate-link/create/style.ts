import styled from "styled-components";

export const CreateFineSlotMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;
export const CreateFineSlotTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5em;

    @media screen and (max-width: 490px){
        flex-direction: column;
    }

    .left{
        display: flex;
        flex-direction: column;
        gap: .5em;

        @media screen and (max-width: 490px){
            width: 100%;
        }
    }

    .right{
        @media screen and (max-width: 490px){
            width: 100%;

            button{
                width: 100%;
            }
        }
    }
`;

export const CreateFineSlotForm = styled.form`
        display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em;

    @media screen and (max-width: 630px){
        padding: 1em;
    }


    .common-fields{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 450px){
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
          font-size: 13px;
          font-weight: 400;
          color: var(--white-constant);
          border-radius: 2px;
          min-width: 80px;
        }
      }
    }
  }
    }

    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .buttons{
            display: flex;
            gap: 1em;

            @media screen and (max-width: 500px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
`;