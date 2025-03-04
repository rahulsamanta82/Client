import styled from "styled-components";

export const CreateLinkedProgramEntryTestMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;
export const CreateLinkedProgramEntryTestTop = styled.div`
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


export const CreateLinkedProgramEntryTestSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 2em 3em;

    @media screen and (max-width: 630px){
        padding: 1em 1.5em;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 2em;
    transition: all 2s ease-in-out;


    .custom-multi-select {
    position: relative;
    border: 1px solid var(--field-border);
    padding: 8px;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background-color: var(--input-field-bg);
}

.selected-options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    min-height: 30px;
    align-items: center;
}

.selected-option {
    display: flex;
    align-items: center;
    background-color:var(--primary);
    color: var(--white-constant);
    padding: 5px 10px;
    border-radius: 5px;
}

.selected-option button {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
}

.options-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #ccc;
    background-color: var(--white-color);
    max-height: 150px;
    overflow-y: auto;
    z-index: 1;
}

.option {
    padding: 5px 10px;
    cursor: pointer;
}

.option:hover {
    background-color: var(--input-field-bg);
}


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
        margin-top: 25px;

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
   
      
        .table-radio-field{
        display: flex;
        gap: 20px;
    }
    .radio{
        display: flex;
        justify-content: center;
        gap: 5px;
    }
  
`;


