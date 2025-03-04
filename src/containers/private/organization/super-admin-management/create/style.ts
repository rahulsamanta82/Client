import styled from "styled-components";



export const SuperAdminManagementCreateSection = styled.div`
  width: 100%;
  /* height: 100%; */
  overflow-y: auto;
  background: var(--white-color);
  padding: 2em 0;
  padding: 0px 20px;
  border-radius: 30px;
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

  

  
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    /* padding-top: 3em; */
    padding: 30px 50px;


    @media screen and (max-width: 1080px){
        width: 100%;
        padding: 3em 2em 0 2em;
    }
    @media screen and (max-width: 880px){
        padding: 1em;
    }

    .common-fields{
        width: 100%;
        display: flex; 
        gap: 1.5em;
        color: var(--lightgray-medium);
        font-size: 15px;
        font-weight: 400;

        @media screen and (max-width: 690px){
           flex-wrap: wrap;
        }
    }

    .action-buttons{
        width: 100%;
        display: flex;
        justify-content: end;
        padding-bottom: 2em;

        .buttons{
            display: flex;
            gap: 2.5em;

            @media screen and (max-width: 600px){
                width: 100%;
                flex-direction: column;

                button{
                    width: 100%;
                }
            }
        }
    }
  }
`;
export const SuperAdminManagementCreateMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    padding: 1em;

    @media screen and (max-width: 630px){
        padding: 0.5em;
    }
`;
export const SuperAdminManagementCreateTop = styled.div`
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



