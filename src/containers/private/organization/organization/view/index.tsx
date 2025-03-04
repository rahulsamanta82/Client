import { FC, useEffect, useState } from "react";
import {
    ViewOrgContent,
    ViewOrgMain,
    ViewOrgTop,
    VOCLeftSection,
    VOCRightSection,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    AccNumPrimarySquareSvg,
    BankPrimarySquareSvg,
    CallPrimarySquareSvg,
    CityPrimarySquareSvg,
    DistrictPrimarySquareSvg,
    LocationPrimarySquareSvg,
    MessagePrimarySquareSvg,
    SharePrimarySquareSvg,
    WorldPrimarySquareSvg,
} from "assets/images/organization/svgs";
import iubLogo from "assets/images/organization/others/iub-logo.png";
import useOrganization from "../../useHooks";
import useUtils from "hooks/useUtils";
import { WhiteDeleteIcon, WhiteEditIcon } from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";

interface ViewOrganizationInterface { }

const ViewOrganization: FC<ViewOrganizationInterface> = ({ }) => {
    const breadcrumbLinks = [
        { title: "Organization /", path: siteRoutes.organizationListing },
        { title: "Organization Detail", path: siteRoutes.viewOrganization },
    ]
    const { getOrganizationByIdViewPage, deleteOrganization } = useOrganization();
    const { getQueryParams } = useUtils();
    const navigate = useNavigate();
    const params = getQueryParams();
    const [data, setData] = useState<any>({});
    const orgDetailItems = [
        { title: data?.website ?? 'Website link', icon: WorldPrimarySquareSvg },
        { title: data?.phone ?? '0000-000-0000', icon: CallPrimarySquareSvg },
        { title: data?.email ?? 'University Email', icon: MessagePrimarySquareSvg },
        { title: "Bank Name Here", icon: BankPrimarySquareSvg },
        { title: "0000 0000 0000 0000", icon: AccNumPrimarySquareSvg },
        {
            title: data?.add_structure_type ? 'Allowed Organization to Add Structure Type' : "Not Allow Organization to Add Structure Type",
            icon: SharePrimarySquareSvg,
        },
        { title: data?.district?.title ?? "University District", icon: DistrictPrimarySquareSvg },
        { title: data?.city?.title ?? "University City", icon: CityPrimarySquareSvg },
        {
            title: data?.address1 ? `${data?.address1} ${data?.address2}` : 'University Address',
            icon: LocationPrimarySquareSvg,
        },
    ];

    useEffect(() => {
        getOrganizationByIdViewPage(params?.id, setData);
    }, []);

    const goToStructureTypes = () => {
        navigate(`${siteRoutes.structureTypeListing}?organizationId=${data?.id}`);
    };

    const goToUpdateOrg = () => {
        navigate(`${siteRoutes.createOrganization}?id=${params?.id}`);
    };

    const handleDelete = async () => {
        const result = await confirmationPopup();
        if (result.isConfirmed) {
            deleteOrganization(params?.id);
        }
    };

    return (
        <ViewOrgMain>
            <ViewOrgTop>
                <div className="left">
                    <span className="page-heading">{data?.name ?? 'University Name'}</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </ViewOrgTop>

            <ViewOrgContent>
                <VOCLeftSection className="content-radius-shadow">
                    <div className="org-detail-wrapper">
                        {orgDetailItems.map((item: any, index: number) => {
                            const Icon = item.icon;
                            return (
                                <div className="particular-org-detail" key={index}>
                                    <div className="icon-part">
                                        <Icon className="icon" />
                                    </div>
                                    <span className="text">{item.title}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="buttons-section">
                        <div className="action-buttons">
                            <div className="action-btn" onClick={goToUpdateOrg}>
                                <div className="icon-part">
                                    <WhiteEditIcon className="icon" />
                                </div>
                                <span className="text">Edit</span>
                            </div>
                            <div className="action-btn delete" onClick={handleDelete}>
                                <div className="icon-part">
                                    <WhiteDeleteIcon className="icon" />
                                </div>
                                <span className="text">Delete</span>
                            </div>
                        </div>

                        <div className="add-button">
                            <button onClick={goToStructureTypes}>Structure Types</button>
                        </div>
                    </div>
                </VOCLeftSection>
                <VOCRightSection className="content-radius-shadow">
                    <div className="logo-section">
                        <img src={data.logo} alt="" />
                    </div>

                    <div className="cms-section">
                        <div className="heading">
                            <span>Mission</span>
                        </div>
                        <div
                            className="cms-wrapper"
                            dangerouslySetInnerHTML={{ __html: data?.mission }}
                        ></div>
                    </div>

                    <div className="cms-section">
                        <div className="heading">
                            <span>Vision</span>
                        </div>
                        <div
                            className="cms-wrapper"
                            dangerouslySetInnerHTML={{ __html: data?.vision }}
                        ></div>
                    </div>
                </VOCRightSection>
            </ViewOrgContent>
        </ViewOrgMain>
    );
};

export default ViewOrganization;
