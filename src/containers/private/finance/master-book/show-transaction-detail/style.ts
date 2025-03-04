import styled from "styled-components";


export const ShowTransactionDetailMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: .5em;
    }
`;
export const ShowTransactionDetailTop = styled.div`
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

export const ShowTransactionDetailListingSection = styled.div`
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
`;

export const TransactionDetailSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .dropdown-content{
        width: 100%;
        padding: 2em 0;

        .total-amount{
            width: 100%;
            display: flex;
            justify-content: center;

            .total-amount-box{
                width: 240px;
                height: 43px;
                border-radius: 10px;
                background: var(--primary-extralight);
                color: var(--black-text);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;

                .title{
                    font-weight: 400;
                    font-size: 16px;
                }

                .amount{
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--lightgray-medium);
                }
            }
        }
    }
`;

export const TransactionDropdown = styled.div<{showTransactionDropdown: boolean}>`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid var(--lightgray-extralight);
    padding-bottom: .5em;

    .filter-heading{
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 480px){
            font-size: 20px;
        }
    }

    .dropdown-arrow{
        .icon{
        width: 20px;
        height: 28px;
        rotate: ${({ showTransactionDropdown }) => showTransactionDropdown ? '0' : '180deg'};
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