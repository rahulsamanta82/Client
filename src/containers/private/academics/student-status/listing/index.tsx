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
    StudentStatusListingMain,
    StudentStatusListingSection,
    StudentStatusListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useAcademics from "../../useHooks";
import { StudentStatusDTO } from "utils/helpers/models/academics/student-status.dto";
import { useSelector } from "react-redux";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const StudentStatusListing: FC = () => {
    const columns: string[] = ["Title", "For Department", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Student Status", path: siteRoutes.studentStatusListing },
    ];

    const navigate = useNavigate();
    const { getStudentStatuses, deleteStudentStatus } = useAcademics();
    const [data, setData] = useState<StudentStatusDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    useEffect(() => {
        getAllStudentStatuss(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteStudentStatus(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllStudentStatuss(page + 1, search);
    };
    const getAllStudentStatuss = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getStudentStatuses(setData, queryParams, setPagination);
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createStudentStatus}?id=${id}`);
    }
    const goToCreate = () => {
        navigate(siteRoutes.createStudentStatus);
    };

    return (
        <StudentStatusListingMain>
            <StudentStatusListingTop>
                <div className="left">
                    <span className="page-heading">Student Status</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createStudentStatus) && <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Student Status
                        </button>
                    </div>}
                </div>
            </StudentStatusListingTop>

            <StudentStatusListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllStudentStatuss)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllStudentStatuss)}
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
                            {data.map((status, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div className="mw-150">
                                            {status.title}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status">
                                            {status.for_department == 1 ? <span className="status-tile green">
                                                Yes
                                            </span> : <span className="status-tile red">
                                                No
                                            </span>}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEdit(status.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(status.id)}>
                                                <DeleteTableSvg />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination
                        onPageChange={onPageChange}
                        {...pagination}
                    />
                </Fragment>
            </StudentStatusListingSection>
        </StudentStatusListingMain>
    );
};

export default StudentStatusListing;
