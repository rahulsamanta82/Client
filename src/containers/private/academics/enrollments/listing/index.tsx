import { FC, Fragment, useEffect, useState } from "react";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    AcademicEnrollmentsListingMain,
    AcademicEnrollmentsListingSection,
    AcademicEnrollmentsListingTop,
    FilterSection,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useTestingServices from "containers/private/testing-services/useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import { TestingCenterRoomDTO } from "utils/helpers/models/testing-service/testing-center-room.dto";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { TestingCenterDTO } from "utils/helpers/models/testing-service/testing-center.dto";

const AcademicEnrollmentsListing: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Academic Sessions / ', path: siteRoutes.academicSessionManagementListing },
        { title: 'Enrollments', path: siteRoutes.academicEnrollmentsListing },
    ]
    const columns: string[] = [
        "Registration No.",
        "Student Name",
        "Campus",
        "Program",
        "Repeater",
        "Status",
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
            // deleteTestingCenterRoom(id, setData, queryParams, setPagination);
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
        };
        // getTestingCenterRooms(setData, queryParams, setPagination);
    };

    return (
        <AcademicEnrollmentsListingMain>
            <AcademicEnrollmentsListingTop>
                <div className="left">
                    <span className="page-heading">Enrollments</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <button className="lg-rounded-btn black">
                        Upload File
                    </button>
                    <button className="lg-rounded-btn">
                        + Add Student
                    </button>
                    <button className="lg-rounded-btn red">
                        Delete All Enrolment
                    </button>
                </div>
            </AcademicEnrollmentsListingTop>

            <FilterSection className="content-radius-shadow">
                <div className="stats">
                    <div className="sats-item">
                        <div className="stats-title">Session</div>
                        <div className="stats-value">
                            FALL 2024
                        </div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Course code</div>
                        <div className="stats-value">SR-402</div>
                    </div>
                    <div className="sats-item">
                        <div className="stats-title">Course Title</div>
                        <div className="stats-value">Saraiki as Regional Language</div>
                    </div>
                    <div className="">
                        <div className="stats-title">Teacher</div>
                        <div className="stats-value">Gulam Muhammad</div>
                    </div>
                </div>
            </FilterSection>
            <AcademicEnrollmentsListingSection
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
                            {[1, 1, 1, 1, 1].map((room, index) => {
                                return (
                                    <tr>
                                        <td>S23RPAKS1M01001</td>
                                        <td>Ahsan Ali</td>
                                        <td>Bahawal Pur</td>
                                        <td>BS Pakistan Studies(M)</td>
                                        <td>
                                            <div className="status">
                                                <span className="status-tile red">No</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <label htmlFor={`is-specialization-no-${index}`}>
                                                        Active
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-no-${index}`}
                                                    />
                                                </div>
                                                <div className="radio">
                                                    <label htmlFor={`is-specialization-yes-${index}`}>
                                                        Non-Active
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name={`is-specialization-${index}`}
                                                        id={`is-specialization-yes-${index}`}
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <DeleteTableSvg />
                                                </div>
                                            </div>
                                        </td>
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
            </AcademicEnrollmentsListingSection>
        </AcademicEnrollmentsListingMain>
    );
};

export default AcademicEnrollmentsListing;
