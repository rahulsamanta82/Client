import { FC } from "react";
import { CopyrightText, FooterMain } from "./style";
import { CyfyLogoDark, CyfyLogoSvg } from "assets/images/common/svgs";
import useStore from "hooks/useStore";
import { useSelector } from "react-redux";

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
    const { isDarkTheme } = useSelector((state: any) => state.sharedReducer);
    return (
        <FooterMain>
            <CopyrightText>
                <span>© 2024 All Rights Reserved | Designed and Developed by</span>
                <div className="cyfy-logo">
                    {isDarkTheme ? <CyfyLogoDark className="icon" /> : <CyfyLogoSvg className="icon" />}
                </div>
            </CopyrightText>
        </FooterMain>
    )
}

export default Footer;