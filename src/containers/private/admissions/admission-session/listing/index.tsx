import { FC, Fragment, useEffect, useState } from "react";
import {
    AdmissionSessionListingMain,
    AdmissionSessionListingSection,
    AdmissionSessionListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAdmissions from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";

const AdmissionSessionListing: FC = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState("");
    const {getDateFromDateTime } = useUtils();
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    const { getAdmissionSessions, deleteAdmissionSession } = useAdmissions();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const columns: string[] = [
        "Code",
        "Title",
        "Year",
        "Start Date",
        "End Date",
        "Type",
        "Action",
    ];

    const goToCreateAdmissionSession = () => {
        navigate(siteRoutes.createAdmissionSession);
    };

    const goToEditAdmissionSession = (id: number) => {
        navigate(`${siteRoutes.createAdmissionSession}?id=${id}`);
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
        getAdmissionSessions(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllAdmissionSessions();
    }, []);

    const handleSearch = (event: any) => {
        if (event.key === "Enter") {
            getAllAdmissionSessions();
        }
    };

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteAdmissionSession(id, setData, queryParams, setPagination);
        }
    };
    return (
        <AdmissionSessionListingMain>
            <AdmissionSessionListingTop>
                <div className="left">
                    <span className="page-heading">Admission Sessions</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="create-org-btn">
                        <button
                            className="lg-rounded-btn"
                            onClick={goToCreateAdmissionSession}
                        >
                            + Add New
                        </button>
                    </div>
                </div>
            </AdmissionSessionListingTop>

            <AdmissionSessionListingSection className="content-radius-shadow">
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
                            onKeyUp={handleSearch}
                        />
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
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.code}</td>
                                        <td>{item.title}</td>
                                        <td>{item.year}</td>
                                        <td>{getDateFromDateTime(item.start_date)}</td>
                                        <td>{getDateFromDateTime(item.end_date)}</td>
                                        <td>{item.type}</td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div
                                                    className="action-icon"
                                                    onClick={() => goToEditAdmissionSession(item.id)}
                                                >
                                                    <EditTableSvg />
                                                </div>

                                                <div
                                                    className="action-icon"
                                                    onClick={() => handleDelete(item.id)}
                                                >
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
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </AdmissionSessionListingSection>
        </AdmissionSessionListingMain>
    );
};

export default AdmissionSessionListing;
