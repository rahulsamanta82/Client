import { FC, ReactElement } from "react";
import { SAContentSection, SALeftSection, SARightSection, SAuthLayoutMain } from "./style";
import libraryImage from 'assets/images/common/others/library-image.png';

interface StudentAuthLayout {
    children: ReactElement;
}

const StudentAuthLayout: FC<StudentAuthLayout> = ({ children }) => {
    return (
        <SAuthLayoutMain>
            <SAContentSection>
                <SALeftSection>
                    <img src={libraryImage} alt="" />
                </SALeftSection>
                <SARightSection>
                    {children}
                </SARightSection>
            </SAContentSection>
        </SAuthLayoutMain>
    )
}

export default StudentAuthLayout;