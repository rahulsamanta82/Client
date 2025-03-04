import { FC, useEffect } from "react";
import {
    HeaderMain,
    HeaderMenuBar,
    MenuBarLeft,
    MenuBarRight,
    MenuIcon,
    ModalMain,
    ProfileImage,
    ProfileSection,
    SearchField,
    UtilityIcons
} from "./style";
import {
    DarkThemeSvg,
    LightThemeSvg,
    MenuIconSvg,
    ModalAccountSvg,
    ModalDocumentSvg,
    ModalLockSvg,
    ModalLogoutSvg,
    NotificationSvg,
    SearchSvg,
    SettingsSvg
} from "assets/images/common/svgs";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useComponentVisible from "hooks/click-outside";

interface HeaderProps {
    openSidebar: boolean;
    setOpenSidebar: Function;
}

const Header: FC<HeaderProps> = ({ openSidebar, setOpenSidebar }) => {

    const { setDarkTheme, logout, getDomainDefaultUnAuthRoute } = useStore();
    const { isDarkTheme, token } = useSelector((state: any) => state.sharedReducer);
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.sharedReducer);

    const toggleSidebarOpen = () => {
        setOpenSidebar(!openSidebar);
    }

    const toggleDarkTheme = () => {
        setDarkTheme(!isDarkTheme);
    }

    useEffect(() => {
        if (!token) {
            const defaultUnAuthRoute: any = getDomainDefaultUnAuthRoute();
            navigate(defaultUnAuthRoute);
        }
    }, [token]);

    const toggleModal = () => {
        setShowDropdown(!showDropdown);
    };
    const {
        isComponentVisible: showDropdown,
        setIsComponentVisible: setShowDropdown,
        ref: dropdownRef,
    } = useComponentVisible();

    const getAvatarLabel = (): string => {
        const [firstName] = user?.name?.split(' ') || ['', ''];
        return `${firstName[0]}`;
    }


    return (
        <HeaderMain>
            <HeaderMenuBar>
                <MenuBarRight>
                    <MenuIcon onClick={toggleSidebarOpen}>
                        <MenuIconSvg className="icon" />
                    </MenuIcon>
                </MenuBarRight>
                <MenuBarLeft>
                    <SearchField>
                        <div className="search-icon">
                            <SearchSvg className="icon" />
                        </div>
                        <div className="field">
                            <input type="search" placeholder="Search for something" />
                        </div>
                    </SearchField>
                    <UtilityIcons>
                        <div className="utility-icon" onClick={toggleDarkTheme}>
                            {/* <LightThemeSvg className="icon" /> */}
                            {isDarkTheme ? <LightThemeSvg className="icon" /> : <DarkThemeSvg className="icon" />}
                        </div>
                        <div className="utility-icon">
                            <SettingsSvg className="icon" />
                        </div>
                        <div className="utility-icon">
                            <NotificationSvg className="icon" />
                        </div>
                    </UtilityIcons>
                    <ProfileSection>
                        <ProfileImage ref={dropdownRef}>
                            {user?.profile_image ? <div className="image cp" onClick={toggleModal}>
                                <img src={user?.profile_image} alt="" />
                            </div> : <div className="avatar cp" onClick={toggleModal}>{getAvatarLabel()}</div>}
                            {showDropdown && (
                                <ModalMain>
                                    <div className="top-img">
                                        <ProfileImage>
                                            {user?.profile_image ? <div className="image cp">
                                                <img src={user?.profile_image} alt="" />
                                            </div> : <div className="avatar cp">{getAvatarLabel()}</div>}
                                        </ProfileImage>
                                        <p className="user-name">{user?.name}</p>
                                    </div>
                                    <div className="modal-listing-section">
                                        <ul>
                                            <li>
                                                <div>
                                                    <ModalAccountSvg className="modal-icon" />
                                                </div>
                                                <span>My Account</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <ModalLockSvg className="modal-icon" />
                                                </div>
                                                <span>Change Password</span>
                                            </li>
                                            <li>
                                                <div>
                                                    <ModalDocumentSvg className="modal-icon" />
                                                </div>
                                                <span>Support Document</span>
                                            </li>
                                            <li onClick={logout}>
                                                <div>
                                                    <ModalLogoutSvg className="modal-icon" />
                                                </div>
                                                <span>Sign out</span>
                                            </li>
                                        </ul>
                                    </div>
                                </ModalMain>
                            )}
                        </ProfileImage>
                    </ProfileSection>
                </MenuBarLeft>
            </HeaderMenuBar>
        </HeaderMain>
    )
}


export default Header;