import styled from "styled-components";

export const PaginationMain = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;

ul {
  display: flex !important;
  list-style: none !important;
  padding: 0 !important;
  flex-wrap: wrap !important;
  gap: 1em;
}

ul li a{
  cursor: pointer !important;
}

ul li.selected a {
  background-color: var(--primary) !important;
  color: var(--white-constant) !important;
  padding: 8px 16px !important;
  border-radius: 5px !important;
}

li.next a, li.previous a {
  background-color: none !important;
  border: none !important;
  font-weight: 400 !important;
  padding: 0 .5rem!important;
}

ul li a {
  text-decoration: none !important;
  color: var(--lightgray-medium) !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  padding: 8px 16px !important;
}
`;