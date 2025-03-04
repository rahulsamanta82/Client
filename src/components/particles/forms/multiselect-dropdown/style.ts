import styled from "styled-components";

export const DropdownMain = styled.div`
  width: 100%;
  position: relative;
  margin-top: -2em;

  ul {
    position: absolute;
    max-height: 220px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
    background-color: var(--win-bg-color);
    width: 100%;
    padding: 10px;
    top: 2.5em;
    left: 0px;
    z-index: 50;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 400;
    overflow-y: auto;

    .no-options-found{
      font-size: 14px;
      font-weight: 500;
      color: var(--primary);
      display: flex;
      justify-content: center;
    }
  }

  li {
    padding: .5em 1em;
    border-radius: 5px;
    color: var(--lightgray-medium);
    list-style: none;
    display: flex;
    gap: 1em;
    align-items: center;

    input[type="checkbox"] {
      accent-color: var(--primary);
    }

    .item-text{
        padding-bottom: .3em;
    }
  }
  li:hover {
    background: var(--primary);
    cursor: pointer;
    color: var(--white-constant);
  }

  .text {
    overflow-x: hidden;
  }

  * {
    user-select: none;
  }
`;
