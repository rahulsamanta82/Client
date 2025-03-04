import styled from "styled-components";

export const ModuleManagementMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  padding: 1em;

  @media screen and (max-width: 630px) {
    padding: 0.5em;
  }
`;

export const ModuleManagementTop = styled.div`
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



export const ModuleManagementSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5em;
    padding: 2em;
    background-color: var(--white-color);

    @media screen and (max-width: 630px){
        padding: 1em;
    }
   

    
    .flex{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .main-buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        width: 86px;
        height: 40px;
        font-size: 18px;
        font-weight: 400;
        background-color: var(--3d-gray);
    }
    .button-flex{
        display: flex;
        gap: 6px;
    }

    .list-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: 630px){
            flex-direction: column;
            gap: 1em;
        }
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
    .switch {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary); 
}

input:checked + .slider:before {
  transform: translateX(26px);
}

input:focus + .slider {
  box-shadow: 0 0 1px #e91e63;
}
`;

