import styled from "styled-components";

export const DataNotFoundMain = styled.div<{ show: boolean }>`
  width: 100%;
  display: ${({ show }) => show ? 'flex' : 'none'};
  justify-content: center;
  padding-top: .5em;

  span {
    font-weight: 600;
    font-size: 16px;
    color: var(--black-text);
    font-style: italic;
  }
`;
