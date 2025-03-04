import styled from "styled-components";


export const SidebarMain = styled.div`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white-color);
`;

export const Menus = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 3em 0 2em 0.5em;
    box-shadow: 0px 4px 15px 0px #0000001A;

    .particular-menu{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
`;

export const MenuItem = styled.div<{ active: boolean, isDropdownOpen: boolean }>`
    display: flex;
    gap: 1em;
    align-items: center;
    cursor: pointer;

    .menu-icon, .dropdown-icon{
        width: 20px;
        .icon{
            path{
                fill: ${({ active }) => active ? 'var(--primary)' : 'var(--lightgray-medium)'};
            }
        }
    }

    .dropdown-icon{
        width: 7px;
        rotate: ${({ isDropdownOpen }) => isDropdownOpen ? '90deg' : '0deg'};
    }

    .menu-text{
        font-size: 16px;
        font-weight: 500;
        color: ${({ active }) => active ? 'var(--primary)' : 'var(--lightgray-medium)'};
    }
`;

export const DropdownMenu = styled.div<{ show: boolean }>`
    display: ${({ show }) => show ? 'flex' : 'none'};
    flex-direction: column;
    gap: 1em;
    padding-left: 3.7em;
`;

export const DropdownMenuItem = styled.div<{ active: boolean }>`
        cursor: pointer;
        .menu-text{
        font-size: 16px;
        font-weight: 500;
        color: ${({ active }) => active ? 'var(--primary)' : 'var(--lightgray-medium)'};
    }
`;

export const SiteLogo = styled.div`
    padding: 1.2em 1em 0 1em;
    display: flex;

    .custom-logo{
        display: flex;
        gap: .5em;
        align-items: center;

        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }

        .uni-name{
            font-size: 28px;
            font-weight: 800;
            color: var(--black-text);
        }
    }
`;