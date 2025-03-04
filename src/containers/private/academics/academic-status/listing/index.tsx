import { FC, Fragment, useEffect, useState } from "react";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    GreenAddUserSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
    AcademicStatusListingMain,
    AcademicStatusListingSection,
    AcademicStatusListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import useAcademics from "../../useHooks";
import { AcademicStatusDTO } from "utils/helpers/models/academics/academic-status.dto";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const AcademicStatusListing: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Academic Status", path: siteRoutes.academicStatusListing },
    ];
    const columns: string[] = ["Label", "Code", "Action"];
    const navigate = useNavigate();
    const { getAcademicStatuses, deleteAcademicStatus } = useAcademics();
    const [data, setData] = useState<AcademicStatusDTO[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");

    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const goToCreateBank = () => {
        navigate(siteRoutes.createBank);
    };

    useEffect(() => {
        getAllAcademicStatuss(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteAcademicStatus(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllAcademicStatuss(page + 1, search);
    };
    const getAllAcademicStatuss = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getAcademicStatuses(setData, queryParams, setPagination);
    };

    const goToEdit = (id: number) => {
        navigate(`${siteRoutes.createAcademicStatus}?id=${id}`);
    }

    const goToCreate = () => {
        navigate(siteRoutes.createAcademicStatus);
    }

    return (
        <AcademicStatusListingMain>
            <AcademicStatusListingTop>
                <div className="left">
                    <span className="page-heading">Academic Status</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createAcademicStatus) && <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Academic Status
                        </button>
                    </div>}
                </div>
            </AcademicStatusListingTop>

            <AcademicStatusListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadAcademicStatusPDF) && <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>}

                        {hasAccess(sitePermissions.downloadAcademicStatusExcel) && <div className="export-btn">
                            <span>
                                <ExcelSvg className="icon" />
                            </span>
                            <span className="text">Excel</span>
                        </div>}
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
                                handleSearchChange(e, setSearch, getAllAcademicStatuss)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllAcademicStatuss)}
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
                                    <td>{status.code}</td>
                                    <td>
                                        <div className="table-action-icons">
                                            {hasAccess(sitePermissions.editAcademicStatus) && <div className="action-icon" onClick={() => goToEdit(status.id)}>
                                                <EditTableSvg />
                                            </div>}
                                            {hasAccess(sitePermissions.deleteAcademicStatus) && <div className="action-icon" onClick={() => handleDelete(status.id)}>
                                                <DeleteTableSvg />
                                            </div>}
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <DataNotFound show={!isLoading && !data.length} />
                    <Fragment>
                        <Pagination
                            onPageChange={onPageChange}
                            {...pagination}
                        />
                    </Fragment>
                </div>
            </AcademicStatusListingSection>
        </AcademicStatusListingMain>
    );
};

export default AcademicStatusListing;
