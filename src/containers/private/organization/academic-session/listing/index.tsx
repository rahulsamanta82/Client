import { FC, Fragment, useEffect, useState } from "react";
import {
    AcademicSessionOrganizationListingMain,
    AcademicSessionOrganizationListingSection,
    AcademicSessionOrganizationListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
    TableGreenPlusSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";


const AcademicSessionOrganizationListing: FC = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState("");
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    const columns: string[] = [
        "Code",
        "Title",
        "Year",
        "Semester Type",
        "Start Date",
        "End Date",
        "Status",
        "Action",
    ];
    const items: any = [
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
        {
            Code: '19',
            Title: 'Session Title',
            Year: "2023",
            SemesterType: "SUMMER",
            StartDate: "23-10-2022",
            EndDate: "23-10-2022",
            Status: 'Yes',
            Action: ""
        },
    ];
    useEffect(() => {
        setData(items);
    }, []);

    const goToCreateAcademicSession = () => {
        navigate(siteRoutes.createAcademicSessionOrganization);
    };



    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllAdmissionSessions(page + 1);
    };
    const getAllAdmissionSessions = (page: number = 1) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };

    };

    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    return (
        <AcademicSessionOrganizationListingMain>
            <AcademicSessionOrganizationListingTop>
                <div className="left">
                    <span className="page-heading">Academic Sessions Listing</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="create-org-btn">
                        <button
                            className="lg-rounded-btn"
                            onClick={goToCreateAcademicSession}
                        >
                            + Add Academic Session
                        </button>
                    </div>
                </div>
            </AcademicSessionOrganizationListingTop>

            <AcademicSessionOrganizationListingSection className="content-radius-shadow">
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
                            onChange={(e) => setSearch(e.target.value)}

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
                            {data.map((items: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{items.Code}</td>
                                        <td>{items.Title}</td>
                                        <td>{items.Year}</td>
                                        <td>{items.SemesterType}</td>
                                        <td>{items.StartDate}</td>
                                        <td>{items.EndDate}</td>
                                        <td>{items.Status}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div
                                                    className="action-icon"

                                                >
                                                    <TableGreenPlusSvg />
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
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </AcademicSessionOrganizationListingSection>
        </AcademicSessionOrganizationListingMain>
    );
};

export default AcademicSessionOrganizationListing;
