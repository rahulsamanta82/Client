import { createGlobalStyle } from "styled-components";

const TableStyles = createGlobalStyle`
    .table-search-field{
        width: 255px;
        height: 40px;
        border: 1px solid var(--field-border);
        border-radius: 6px;
        display: flex;
        gap: 0.5em;
        padding: 0 1em;
        color: var(--lightgray-light);

        &::placeholder{
            color: inherit;
        }
        background: var(--input-field-bg);

        @media screen and (max-width: 630px){
            width: 100%;
        }

        .search-icon{
            display: flex;
            align-items: center;

            .icon{
                width: 15px;
                height: 15px;
            }
        }

        input{
            width: 100%;
            height: 100%;
        }
    }

    .table-data-export-buttons{
        display: flex;
        gap: 1em;

        @media screen and (max-width: 630px){
            width: 100%;
        }

    .export-btn{
        background: var(--header-utility-icons-bg);
        width: 103px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        color: var(--black-text);
        cursor: pointer;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 400;

        @media screen and (max-width: 630px){
            font-size: 16px;
        }

        .icon{
            width: 16px;
            height: 16px;

            path{
                fill: var(--black-text);
            }
        }
    }
}

    .table-action-icons{
        display: flex;
        gap: 0.5em;

        @media screen and (max-width: 1260px){
          flex-wrap: wrap;
        }
        .action-icon{
            cursor: pointer;
        }
    }

    .md-action-btn{
        height: 30px;
        min-width: 80px;
        padding: 0 .5em;
        background: var(--primary);
        color: var(--white-constant);
        font-size: 15px;
        font-weight: 400;
        border-radius: 5px;
    }

        .data-table{
        width: 100%;
        overflow-x: auto;

          &::-webkit-scrollbar {
            width: 8px;
            height: 10px;
          }
          
          &::-webkit-scrollbar-thumb {
            background-color: var(--primary);
            border-radius: 200px;
          }

        table{
            width: 100%;
            border-collapse: collapse;

        }
    }

    table.bottom-bordered-cells{

        &.no-border{
            th, td{
                border: none !important;
            }
        }
            th{
                font-size: 16px;
                font-weight: 500;
                color: var(--black-text);
                text-align: left;
                padding: .5em;
                border-bottom: 1px solid var(--lightgray-extralight);
            }

            td{
                font-size: 15px;
                font-weight: 400;
                word-wrap: break-word;
                padding: 1em 0.5em;
                color: var(--lightgray-medium);
                border-bottom: 1px solid var(--lightgray-extralight);

      .expanded-content {
      display: flex;
      flex-direction: column;
      gap: 0.7em;

      &.bordered{
        .particular-info{
            border-bottom: 1px solid var(--lightgray-extralight);
            padding-bottom: .5em;

            &.last{
              border: none;
              padding-bottom: 0;
            }
        }
      }

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
        }
      }
    }
    .table-field{
      border: 1px solid var(--field-border);
    width: 100%;
    height: 32px;
    border-radius: 8px;
    padding: 5px;
    background: var(--input-field-bg);
}
    }

      .table-radio-field {
      min-width: 150px;
      padding: 0 0.5em;
      display: flex;
      gap: 1em;
      align-items: center;

      .radio {
        display: flex;
        gap: 0.5em;
        align-items: center;

        label {
          font-size: 15px;
          font-weight: 500;
        }

        input[type="radio"] {
          width: 16px;
          height: 16px;
          accent-color: var(--primary);
        }
      }
    }

    .table-checkbox-field{
      input[type="checkbox"]{
        width: 18px;
        height: 18px;
      }
    }
            }

            th, td{
                    .checkbox{
                    input[type="checkbox"]{
                        width: 18px;
                        height: 18px;
                        accent-color: var(--primary);
                    }
                }
            }

            th .checkbox{
                padding-top: .5em;
            }
    

    tr.expandable{
        &.opened{
            td{
                border-bottom: none;
            }
        }
    }

    .rounded-expand-button{
        width: 21px;
        height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--primary);
        cursor: pointer;
        user-select: none;

        span{
            color: var(--white-constant);
            font-size: 16px;
        }
    }
    .action-menu {
    width: 30px;
    position: relative;

    .menu-icon {
      .icon {
        rect {
          fill: var(--primary);
        }
      }
    }
  }

    .table-menu-dropdown {
    position: absolute;
    z-index: 9999;
    bottom: 35px;
    top: 30px;
    bottom: unset;
    right: 3px;
    width: 270px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1.5em;
    background: var(--white-color);
    box-shadow: 0px 4px 4px 0px #00000040;

    .particular-menu {
      width: 100%;
      display: flex;
      gap: 1em;
      align-items: center;
      border-bottom: 1px solid var(--gray-medium);

      .title {
        color: var(--black-text);
        font-size: 16px;
        font-weight: 700;
      }

      .action-icon {
        width: 35px;
        height: 35px;
      }
    }
  }

  .status-tile {
            padding: 0.2em 0.5em;
            background: var(--primary-extralight);
            border-radius: 5px;
            color: var(--primary);
            font-size: 12px;
            font-weight: 400;

        &.red{
            background-color: var(--crimson-shadow);
            color: var(--medium-crimson);
        }

        &.yellow{
            background-color: var(--lightyellow-shadow);
            color: var(--warning-yellow); 
        }

        &.green{
            background-color: var(--lightgreen-shadow);
            color: var(--lightgreen-medium);
        }
          }   
          
          .table-action-buttons{
        display: flex;
      gap: 0.7em;
      flex-wrap: wrap;
      }

      
      .table-action-button{
        button{
        height: 35px;
        padding: 0 1em;
        background: var(--primary);
        border-radius: 5px;
        color: var(--white-constant);
        font-size: 14px;
        font-weight: 400;

        &.red{
          background-color: var(--light-medium-crimson);
        }

        &.green{
          background-color: var(--lightgreen-medium);
        }

        &.black{
            color: var(--white-color);
            background: var(--black-text);
        }

        &.purple{
          background-color: var(--light-medium-purple);
        }
        &.yellow{
          background-color: var(--warning-yellow);
        }
        }
      }

      .table-input-field{
        min-width: 180px;
        height: 35px;
        border: 1px solid var(--lightgray-light);
        padding: 0 1em;
        border-radius: 4px;

        input{
          width: 100%;
          height: 100%;
        }
      }
`;

export default TableStyles;
