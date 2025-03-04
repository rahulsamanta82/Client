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

export const TransactionDropdownSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 1060px){
        padding: 1em 1.5em;
    }
    @media screen and (max-width: 550px){
        padding: 1em;
    }
`;

export const TransactionDropdownHeader = styled.div<{ showFilterDropdown: boolean }>`
    width: 100%;
    display: flex;
    justify-content: space-between;

    .filter-heading{
        font-size: 24px;
        font-weight: 700;
        color: var(--black-text);

        @media screen and (max-width: 550px){
            font-size: 18px;
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

export const TransactionDropdownDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;

    .submit-button{
        
        @media screen and (max-width: 550px){
                    width: 100%;
                }
                button{
                    width: 130px;
                    height: 50px;
                    border: 1px solid var(--primary);
                    border-radius: 8px; 
                    color: var(--primary);

                    @media screen and (max-width: 550px){
                        width: 100%;
                    }

                    &:hover{
                        background: var(--primary);
                        color: var(--white-constant)
                    }
                }
        }

    .top-section{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        align-items: center;
        padding-top: 1.5em;

        .total-amount{
            @media screen and (max-width: 550px){
                    width: 100%;
                }
            .total-amount-box{
                width: 310px;
                height: 64px;
                border-radius: 10px;
                background: var(--field-border);
                color: var(--black-text);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;

                @media screen and (max-width: 550px){
                    width: 100%;
                }

                .title{
                    font-size: 16px;
                    font-weight: 400;
                }

                .amount{
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--lightgray-medium);
                }
        }
        }

        .discount-field{
            display: flex;
            gap: 1em;
            align-items: flex-end;
            
            @media screen and (max-width: 550px){
                width: 100%;
                flex-direction: column;
            }
            .input-field{
                width: 312px;

                @media screen and (max-width: 550px){
                    width: 100%;
                }
            }
        }
    }

    .bottom-section{
        width: 100%;
        border-top: 2px solid var(--field-border);
        padding: 0 1.5em;

        @media screen and (max-width: 1060px){
            padding: 0;
        }

        .form-section{
            width: 800px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 1em;
            padding-top: 2em;

            @media screen and (max-width: 1060px){
                width: 100%;
                padding: 2em 1em 0 1em;
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
    }

    .submit-button{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-top: .5em;
    }
        }
    }
`;