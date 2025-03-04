import { FC, Fragment, useEffect, useState } from "react";
import { FinanceApplicationListingSection, FinanceApplicationListingMain, FinanceApplicationListingTop } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, EditTableSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { FinanceApplicationDTO } from "utils/helpers/models/finance/application.dto";
import useFinance from "../../useHooks";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";

interface FinanceApplicationsListingProps { }

const FinanceApplicationsListing: FC<FinanceApplicationsListingProps> = ({ }) => {
    const navigate = useNavigate();
    const columns: string[] = [
        "Title",
        "App Code",
        "API token",
        "Allowed Online Books",
        "Action"
    ]

    const { hasAccess } = useStore();

    const goToCreateFinanceApplication = () => {
        navigate(siteRoutes.createFinanceApplications);
    }

    const { getFinanceApplications, deleteFinanceApplication } = useFinance();
    const [data, setData] = useState<FinanceApplicationDTO[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");

    const { handleSearchChange, handleTableSearch } = useUtils();

    useEffect(() => {
        getAllFinanceApplications(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteFinanceApplication(id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllFinanceApplications(page + 1, search);
    };
    const getAllFinanceApplications = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getFinanceApplications(setData, queryParams, setPagination);
    };

    const goToEditFinanceApplication = (id: number) => {
        navigate(`${siteRoutes.createFinanceApplications}?id=${id}`);
    }
    return (
        <FinanceApplicationListingMain>
            <FinanceApplicationListingTop>
                <div className="left">
                    <span className="page-heading">Applications</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createFinanceApplications) && (
                        <div className="create-fine-slot-btn">
                            <button className="lg-rounded-btn" onClick={goToCreateFinanceApplication}>
                                + Add Application
                            </button>
                        </div>
                    )}
                </div>
            </FinanceApplicationListingTop>

            <FinanceApplicationListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllFinanceApplications)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllFinanceApplications)}
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
                            {data.map((application, index) => {
                                return <tr key={index}>
                                    <td>{application.title}</td>
                                    <td>{application.code}</td>
                                    <td>{application.token}</td>
                                    <td>
                                        <div className="mw-200">
                                            {application.banks.map(b => b.bank).join(', ')}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon" onClick={() => goToEditFinanceApplication(application.id)}>
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(application.id)}>
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
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </FinanceApplicationListingSection>
        </FinanceApplicationListingMain>
    )
}

export default FinanceApplicationsListing;