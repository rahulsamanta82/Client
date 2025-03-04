import styled from "styled-components";


export const MBLMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const MBLTopSection = styled.div`
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

export const MBLFilterSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 630px){
        padding: 1em 1.5em;
    }
`;

export const MBLFilters = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2em;
    transition: all 2s ease-in-out;

    .filter-fields{
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
    }
        .submit-buttons{
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

export const MBLFilterHeader = styled.div<{ showFilterDropdown: boolean }>`
    width: 100%;
    display: flex;
    justify-content: space-between;

    .filter-heading{
        font-size: 24px;
        font-weight: 700;
        border-bottom: 2px solid var(--lightgray-extralight);
        color: var(--black-text);

        @media screen and (max-width: 480px){
            font-size: 20px;
        }
    }

    .dropdown-arrow{
        .icon{
        width: 20px;
        height: 28px;
        rotate: ${({ showFilterDropdown }) => showFilterDropdown ? '0' : '180deg'};
        transition: all .1s ease-in-out;

        path{
            fill: var(--lightgray-medium);
        }


        @media screen and (max-width: 480px){
            width: 18px;
            height: 24px;
        }
        }
    }
`;

export const MBLListingSection = styled.div`
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

            .action-icon{
              &.view rect{
                fill: var(--primary);
              }
            }
          }
        }
      }
    }
  }
`;