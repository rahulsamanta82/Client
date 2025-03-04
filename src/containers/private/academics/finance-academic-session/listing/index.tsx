import { FC, Fragment, useEffect, useState } from "react";
import {
    FinanceAcademicSessionListingSection,
    FinanceAcademicSessionListingMain,
    FinanceAcademicSessionListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    BlackDownloadSvg,
    BlackSettingTableSvg,
    BlackTableViewSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
    SettingsSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useFinance from "containers/private/finance/useHooks";
// import { AcademicCourseInfoDTO } from "utils/helpers/models/finance/bank-info.dto";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

interface FinanceAcademicSessionListingProps { }

const FinanceAcademicSessionListing: FC<FinanceAcademicSessionListingProps> = ({ }) => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: 'Academics / ', path: siteRoutes.academicSessionListing },
        { title: 'Finance Academic Session', path: siteRoutes.financeAcademicSessionListing },
    ]
    const navigate = useNavigate();
    // const { getAcademicCourseInfos, deleteAcademicCourseInfo } = useFinance();
    const [data, setData] = useState<any[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "Title",
        "Academic Session",
        "Voucher",
        "Due Date",
        "Active",
        "Total Student",
        "Action",
    ];

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    useEffect(() => {
        getAllAcademicCourseInfos(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            // deleteAcademicCourseInfo(id, setData, queryParams, setPagination);
        }
    };

    const goToFinanceSessionStudents = () => {
        navigate(siteRoutes.financeSessionStudentsListing)
    }

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllAcademicCourseInfos(page + 1, search);
    };
    const getAllAcademicCourseInfos = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        // getAcademicCourseInfos(setData, queryParams, setPagination);
    };

    const goToSubmittedCourses = () => {
        navigate(siteRoutes.submittedCoursesListing);
    }

    const goToCreate = () => {
        navigate(siteRoutes.createFinanceAcademicSession)
    }

    return (
        <FinanceAcademicSessionListingMain>
            <FinanceAcademicSessionListingTop>
                <div className="left">
                    <span className="page-heading">Finance Academic Session</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-btn">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add New
                        </button>
                    </div>
                </div>
            </FinanceAcademicSessionListingTop>

            <FinanceAcademicSessionListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllAcademicCourseInfos)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllAcademicCourseInfos)}
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
                            {[1, 1, 1, 1, 1, 1, 1].map((bank, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            Fall 2024
                                        </td>
                                        <td>Spring 2024</td>
                                        <td>Semester Fee</td>
                                        <td>2024-09-11</td>
                                        <td>
                                            <div className="status"><span className="status-tile green">Yes</span></div>
                                        </td>
                                        <td>10267</td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon">
                                                    <EditTableSvg />
                                                </div>
                                                <div className="mw-150">
                                                    <div className="table-action-button" onClick={goToFinanceSessionStudents}>
                                                        <button className="green">Manage Students</button>
                                                    </div>
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
                        {...pagination}
                        onPageChange={onPageChange}
                    />
                </Fragment>
            </FinanceAcademicSessionListingSection>
        </FinanceAcademicSessionListingMain>
    );
};

export default FinanceAcademicSessionListing;
