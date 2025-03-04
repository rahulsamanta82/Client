import Sidebar from "components/layout/sidebar";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { ContentSection, FooterSection, HeaderSection, MainLayoutWrapper, RouterOutlet, SidebarSection, Wrapper } from './style';
import Header from "components/layout/header";
import Footer from "components/layout/footer/inde";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import LineLoader from "components/particles/loaders/line-loader";

interface MainLayoutProps {
    children: ReactNode
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth > 1279);
    const ref = useRef<any>(null);
    const { isCurrentWidthMinimum } = useUtils();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            if (isCurrentWidthMinimum()) {
                setOpenSidebar(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <MainLayoutWrapper>
            <Wrapper>
                <SidebarSection opened={openSidebar} ref={ref}>
                    <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                </SidebarSection>
                <ContentSection isSidebarOpened={openSidebar}>
                    <HeaderSection>
                        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    </HeaderSection>
                    {isLoading && <LineLoader />}
                    <RouterOutlet className="p-custom-scrollbar-8">
                        {children}
                    </RouterOutlet>
                    <FooterSection>
                        <Footer />
                    </FooterSection>
                </ContentSection>
            </Wrapper>
        </MainLayoutWrapper>
    )
}

export default MainLayout;