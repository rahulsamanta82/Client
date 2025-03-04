import { FC, Fragment, useState } from "react";
import { RoomsListingMain, RoomsListingSection, RoomsListingTop } from "./style";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, RoomActionIconSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import useAlert from "hooks/useAlert";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { sitePermissions } from "utils/helpers/enums/permissions.enum"; import useStore from "hooks/useStore";


interface AssetsListingProps { }

const RoomsListing: FC<AssetsListingProps> = ({ }) => {
    const navigate = useNavigate();
    const { confirmationPopup } = useAlert();
    const { hasAccess } = useStore();
    const [queryParams, setQueryParams] = useState<any>({ search: '', page: 1 });
    const columns: string[] = [
        'Image',
        'Title',
        'Number',
        'Type',
        'Length',
        'Width',
        'Floors',
        'Action'
    ];

    const goToCreateRooms = () => {
        navigate(siteRoutes.createRooms);
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

    return (
        <RoomsListingMain>
            <RoomsListingTop>
                <div className="left">
                    <span className="page-heading">Rooms</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {
                        hasAccess(sitePermissions.createBuilding) && <div className="create-org-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateRooms} >
                                + Add Rooms
                            </button>
                        </div>
                    }

                </div>
            </RoomsListingTop>
            <RoomsListingSection className="content-radius-shadow">
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
                                    <td>Meeting Rooms</td>
                                    <td>bch-201</td>
                                    <td>Meeting Hall</td>
                                    <td>2000 square feet</td>
                                    <td>2000 square feet</td>
                                    <td>3</td>
                                    <td>
                                        <div className="table-action-icons">
                                            {
                                                hasAccess(sitePermissions.editBuilding) && <div className="action-icon" onClick={() => goToUpdateBuilding(index)}>
                                                    <EditTableSvg />
                                                </div>
                                            }

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
            </RoomsListingSection>
        </RoomsListingMain>
    )
}

export default RoomsListing;