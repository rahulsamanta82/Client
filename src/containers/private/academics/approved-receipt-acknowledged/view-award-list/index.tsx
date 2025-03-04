import { FC, Fragment, useEffect, useState } from "react";
import {
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    ViewAwardListListingMain,
    ViewAwardListListingSection,
    ViewAwardListListingTop,
    FilterSection,
} from "./style";
import { useNavigate } from "react-router-dom";
import useTestingServices from "containers/private/testing-services/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const ViewAwardList: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        {
            title: "Approved & Receipt Acknowledged / ",
            path: siteRoutes.approvedReceiptAcknowledgedListing,
        },
        {
            title: "View Award List",
            path: siteRoutes.appRecAckViewAwardList,
        },
    ];
    const columns: string[] = [
        "Registration #",
        "Student Name",
        "Sessional",
        "Mid Term",
        "End Term",
        "Total Marks",
        "Percentage",
        "Action",
    ];
    const navigate = useNavigate();
    const { getTestingCenterRooms, deleteTestingCenterRoom, getTestingCenterById, updateTestingCenter } = useTestingServices();
    const [data, setData] = useState<TestingCenterRoomDTO[]>([]);
    const [center, setCenter] = useState<TestingCenterDTO>(new TestingCenterDTO());
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const { handleSearchChange, handleTableSearch, getQueryParams } = useUtils();
    const params = getQueryParams();


    useEffect(() => {
        // getAllTestingCenterRooms(pagination.page, search);
        // getTestingCenterById(params?.id, center, setCenter);
    }, []);


    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteTestingCenterRoom(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllTestingCenterRooms(page + 1, search);
    };
    const getAllTestingCenterRooms = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
            test_center_id: params?.id
        };
        // getTestingCenterRooms(setData, queryParams, setPagination);
    };

    return (
        <ViewAwardListListingMain>
            <ViewAwardListListingTop>
                <div className="left">
                    <span className="page-heading">View Award List</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </ViewAwardListListingTop>

            <FilterSection className="content-radius-shadow">
                <div className="stats">
                    <div className="sats-item">
                        <div className="stats-title">Campus</div>
                        <div className="stats-value">
                            Rahim Yar Khan
                        </div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Department</div>
                        <div className="stats-value">Computer Science</div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Course Code</div>
                        <div className="stats-value">SR-402</div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Teacher</div>
                        <div className="stats-value">Rashid.satar</div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Status</div>
                        <div className="stats-value">Active</div>
                    </div>
                </div>
            </FilterSection>
            <ViewAwardListListingSection
                isTableOverflowing={false}
                className="content-radius-shadow"
            >
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>

                        <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>
                    </div>
                    <div className="table-search-field">
                        <span className="search-icon">
                            <SearchFieldSvg className="icon" />
                        </span>
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) =>
                                handleSearchChange(e, setSearch, getAllTestingCenterRooms)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllTestingCenterRooms)}
                        />
                    </div>
                </div>
                <div className="data-table">
                    <table className="bottom-bordered-cells">
                        <thead>
                            <tr>
                                {columns.map((column: string, index: number) => {
                                    return <th key={index}>{column}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 1, 1, 1, 1, 1, 1].map((room, index) => {
                                return (
                                    <tr>
                                        <td>F21bar767826</td>
                                        <td>Farooq Ahmad</td>
                                        <td>Fall 2022</td>
                                        <td>60</td>
                                        <td>50</td>
                                        <td>200</td>
                                        <td>80%</td>
                                        <td>A+</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    {/* <DataNotFound show={!isLoading && !data.length} /> */}
                    <Pagination
                        onPageChange={onPageChange}
                        {...pagination}
                    />
                </Fragment>
            </ViewAwardListListingSection>
        </ViewAwardListListingMain>
    );
};

export default ViewAwardList;
