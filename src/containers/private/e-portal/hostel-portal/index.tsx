import { FC } from "react";
import {
    ContentSection,
    HostelPortalMain,
    HostelPortalTop,
    TabButtons,
} from "./style";
import { useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";
import HostelApplyNow from "./components/apply-now";
import DownloadVoucher from "./components/download-voucher";
import VisitorsInformation from "./components/visitors-information";
import MedicalOthers from "./components/medical-others";

const HostelPortal: FC = () => {
    const [currentTab, setCurrentTab] = useState(1);
    const { hasAccess } = useStore();

    const columns: string[] = ["Session", "Start Date", "End Date", "Action"];

    const tabButtons: any[] = [
        {
            title: "Apply Now",
            permission: sitePermissions.eportalHostelApplyDashboard,
            step: 1,
        },
        {
            title: "Download Voucher",
            permission: sitePermissions.eportalHostelVoucherListing,
            step: 2,
        },
        {
            title: "Visitors Information",
            permission: sitePermissions.eportalHostelVisitorsInfo,
            step: 3,
        },
        {
            title: "Medical/Others",
            permission: sitePermissions.eportalHostelMedicalInfo,
            step: 4,
        },
        {
            title: "Enrollment",
            permission: sitePermissions.eportalHostelEnrollmentInfo,
            step: 5,
        },
    ];

    const handleTabChange = (tab: number) => {
        setCurrentTab(tab);
    };

    return (
        <HostelPortalMain>
            <HostelPortalTop>
                <div className="left">
                    <span className="page-heading">Hostel Rooms</span>
                    <Breadcrumb />
                </div>
            </HostelPortalTop>

            <TabButtons>
                {tabButtons.map((item: any, index: number) => {
                    return (
                        hasAccess(item.permission) && (
                            <div className="tab-button" key={index}>
                                <button
                                    className={`lg-rounded-btn ${currentTab == item.step && "active"
                                        }`}
                                    onClick={() => handleTabChange(item.step)}
                                >
                                    {item.title}
                                </button>
                            </div>
                        )
                    );
                })}
            </TabButtons>

            <ContentSection>
                {currentTab == 1 ? (
                    <HostelApplyNow />
                ) : currentTab == 2 ? (
                    <DownloadVoucher />
                ) : currentTab == 3 ? (
                    <VisitorsInformation />
                ) : currentTab == 4 ? (
                    <MedicalOthers />
                ) : (
                    ""
                )}
            </ContentSection>
        </HostelPortalMain>
    );
};

export default HostelPortal;
