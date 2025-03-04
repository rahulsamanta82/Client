import styled from "styled-components";

export const PermissionManagementListingMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const PermissionManagementListingTop = styled.div`
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


export const PermissionManagementListingSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 630px){
        padding: 1em 1.5em;
    }
    .last-portion{
        display: flex;
        justify-content: space-between;
        @media (max-width:425px) {
            flex-wrap: wrap;
            flex-direction: column;
            
        }
    }
    .drop-down{
        border: 1px solid var(--field-border);
        padding-inline: 10px;
        padding-block: 5px;
        border-radius: 4px;
        margin-inline: 6px;
    }
    .drop-down-div{
    display: flex;
    align-items: center;
    color: var(--black-text);
    @media (max-width:425px) {
        justify-content: end;
    }
    }
    .paginate-div{
        @media (max-width:425px) {
            margin-top: 15px;
        }
    }
`;

export const PermissionManagementListings = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2em;
    transition: all 2s ease-in-out;


    table.bottom-bordered-cells td {
    padding: 3px;
    }

    .flex{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1em;
    }

    table{
      tbody tr{
        td{
          height: 100%;
          .permissions{
            display: flex;
            flex-direction: column;
            gap: 1em;

            span{
              padding-bottom: .5em;
            }
          }

          .permissions-actions{
            display: flex;
            flex-direction :column;
            gap: .5em;
          }

          .module-name{
            height: auto;
            display: flex;
            align-items: flex-start;
            text-transform: capitalize;
          }
        }
      }
    }
`;

