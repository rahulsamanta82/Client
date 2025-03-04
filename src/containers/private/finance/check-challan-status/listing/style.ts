import styled from "styled-components";


export const CCSMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;

export const CCSTopSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

export const CCSFilterSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 630px){
        padding: 1em 1.5em;
    }
`;

export const CCSFilters = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2em;
    transition: all 2s ease-in-out;

    .filter-fields{
        width: 100%;
        /* display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); */
        display: flex;
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        .input-field{
            width: 50%;
        }

        @media screen and (max-width: 880px){
            /* grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); */

            .input-field{
                width: 100%;
            }
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

export const CCSListingSection = styled.div`
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
  }
`;