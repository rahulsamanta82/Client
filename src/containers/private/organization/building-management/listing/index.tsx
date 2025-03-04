import { FC, Fragment, useState } from "react";
import { BuildingsListingMain, BuildingsListingSection, BuildingsListingTop } from "./style";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, RoomActionIconSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import useAlert from "hooks/useAlert";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useStore from "hooks/useStore";

interface AssetsListingProps { }

const BuildingsListing: FC<AssetsListingProps> = ({ }) => {
    const navigate = useNavigate();
    const { confirmationPopup } = useAlert();
    const { hasAccess } = useStore();
    const [queryParams, setQueryParams] = useState<any>({ search: '', page: 1 });
    const columns: string[] = [
        'Image',
        'Campus',
        'Building title',
        'Building Length',
        'Building Width',
        'Latitude',
        'Longitude',
        'Short Name',
        'Action'
    ];

    const goToCreateBuilding = () => {
        // [1, 3, 4, 5, 4].map((item: any) => {
        //     successToaster('Organizational Structure Added Successfully');
        // })
        navigate(siteRoutes.createBuilding);
    }

    const handleDelete = async (id: number) => {
        const result = await confirmationPopup();
        console.log(result, 'result');
        if (result.isConfirmed) {
            console.log('hurray')
        }
    }

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setQueryParams({ ...queryParams, page });
    }

    const goToUpdateBuilding = (id: number) => {
        navigate(`${siteRoutes.createBuilding}?id=${id}`);
    }
    const goToRoomsListing = () => {
        navigate(siteRoutes.roomsListing)
    }
    return (
        <BuildingsListingMain>
            <BuildingsListingTop>
                <div className="left">
                    <span className="page-heading">Building</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {
                        hasAccess(sitePermissions.createBuilding) && <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateBuilding}>
                                + Add Building
                            </button>
                        </div>
                    }

                </div>
            </BuildingsListingTop>
            <BuildingsListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadBuildingListPdf) && <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>}

                        {
                            hasAccess(sitePermissions.downloadBuildingListExcel) && <div className="export-btn">
                                <span>
                                    <ExcelSvg className="icon" />
                                </span>
                                <span className="text">Excel</span>
                            </div>
                        }


                    </div>
                    <div className="table-search-field">
                        <span className="search-icon">
                            <SearchFieldSvg className="icon" />
                        </span>
                        <input type="search" placeholder="Search" />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((item: number, index: number) => {
                                return <tr key={index}>
                                    <td>
                                        <div className="org-logo">

                                        </div>
                                    </td>
                                    <td>Rahim Yar Khan Campus</td>
                                    <td>
                                        <div className="mw-150">
                                            Abdul Qadeer Khan Block
                                        </div>
                                    </td>
                                    <td>2000 square feet</td>
                                    <td>2000 square feet</td>
                                    <td>10.633615</td>
                                    <td>45.633615</td>
                                    <td>
                                        <div className="mw-150">
                                            xyz
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            {
                                                hasAccess(sitePermissions.editBuilding) && <div className="action-icon" onClick={() => goToUpdateBuilding(index)}>
                                                    <EditTableSvg />
                                                </div>
                                            }
                                            <div className="action-icon" onClick={goToRoomsListing}>
                                                <div className="tooltip">
                                                    <RoomActionIconSvg />
                                                    <span className="tooltiptext">Rooms</span>
                                                </div>
                                            </div>

                                            {
                                                hasAccess(sitePermissions.deleteBuilding) &&
                                                <div className="action-icon" onClick={() => handleDelete(index)}>
                                                    <DeleteTableSvg />
                                                </div>
                                            }

                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    {/* <Pagination onPageChange={onPageChange} /> */}
                </Fragment>
            </BuildingsListingSection>
        </BuildingsListingMain>
    )
}

export default BuildingsListing;