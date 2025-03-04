import styled from "styled-components";

export const HeaderMain = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    background-color: var(--white-color);
    position: relative;
`;

export const MenuIcon = styled.div`
    width: 35px;
    height: 20px;
    cursor: pointer;

    .icon{
        width: 100%;
        height: 100%;
    }
`;

export const HeaderMenuBar = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 5px 4px 14px 0px #0000001A;
    padding: 0 2.5em 0 2em;

    @media screen and (max-width: 630px){
        padding: 0 1em;
    }
`;

export const MenuBarRight = styled.div`
    display: flex;
    gap: 4em;
    align-items: center;
`;

export const MenuBarLeft = styled.div`
    display: flex;
    gap:3rem;
    align-items: center;
`;

export const SearchField = styled.div`
    width: 223px;
    height: 48px;
    display: flex;
    gap: 0.2em;
    align-items: center;
    background: var(--header-utility-icons-bg);
    border-radius: 200px;

    @media screen and (max-width: 710px){
        display: none;
    }

    .search-icon{
        width: 100%;
        /* height: 100%; */
        padding-left: 1em;
        padding-top: 0.3em;

        .icon{
        width: 20px;
        height: 19px;
        }
    }

    .field{
        width: 100%;
        padding-right: 1em;
        /* height: 100%; */
        color: var(--metalic-gray);
        font-size: 15px;
        font-weight: 500;

        input{
            &::placeholder{
                color: inherit;
            }
        }
    }
`;

export const UtilityIcons = styled.div`
    display: flex;
    gap: 1em;

    .utility-icon{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--header-utility-icons-bg);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 630px){
            width: 40px;
            height: 40px;

            .icon{
                width: 20px;
                height: 20px;
            }
        }
        .icon{
            width: 22px;
            height: 22px;
        }
    }
`;

export const ProfileSection = styled.div`

`;

export const ProfileImage = styled.div`
    width: 58px;
    height: 58px;

    .image{
        img{
        width: 58px;
        height: 58px;
        border-radius: 50%;
        object-fit: cover;
        }
    }

    .avatar{
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: var(--header-utility-icons-bg);
        color: var(--black-text);
        font-size: 24px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
export const ModalMain = styled.div`
    border: 1px solid var(--field-border);
    border-radius: 8px;
    width: 308px;
    height: 300px;
    background-color: var(--white-color);
    position: absolute;
    z-index: 100;
    right: 1rem;
    top: 5rem;
    padding: 2rem;


    .top-img{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        justify-content: center;

    }
    .user-name{
    font-weight: 500;
    color: var(--black-text);
    }
    .modal-listing-section{
        ul{
            list-style: none;
            margin-top: 1.5rem;
            li{
                display: flex;
                gap: 10px;
                justify-content: start;
                margin-top: 10px;
                cursor: pointer;
            }
        }
        span{
            color: var(--modal-grey);
        }
    }
    .modal-icon{
    path{
        fill:var(--lightgray-medium);
    }
}
    
`