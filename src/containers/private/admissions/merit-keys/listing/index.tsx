import { FC, Fragment, useEffect } from "react";
import {
    SuperRoleManagementListingSection,
    SuperRoleManagementListingMain,
    SuperRoleManagementListingTop,
} from "./style";
import { useState } from "react";
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
import Breadcrumb from "components/particles/breadcrumb";
import { useSelector } from "react-redux";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAdmissions from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const MeritKeysListing: FC = () => {
    const columns: string[] = ["Title", "Key Body", "Action"];
    const { getMeritKeys, deleteMeritKey } = useAdmissions();

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const { hasAccess } = useStore();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllMeritKeys(page + 1, search);
    };
    const getAllMeritKeys = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };

        getMeritKeys(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllMeritKeys(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };

            deleteMeritKey(id, setData, queryParams, setPagination);
        }
    };

    const navigate = useNavigate();

    const goToCreateMeritKeys = () => {
        navigate(siteRoutes.createMeritKeys);
    };

    const goToEditMeritKey = (id: number) => {
        navigate(`${siteRoutes.createMeritKeys}?id=${id}`);
    }

    return (
        <SuperRoleManagementListingMain>
            <SuperRoleManagementListingTop>
                <div className="left">
                    <span className="page-heading">Merit Keys</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    {hasAccess(sitePermissions.createMeitKeys) && <div className="create-org-btn">
                        <button
                            className="lg-rounded-btn"
                            type="button"
                            onClick={goToCreateMeritKeys}
                        >
                            + Create New Merit Keys
                        </button>
                    </div>}
                </div>
            </SuperRoleManagementListingTop>

            <SuperRoleManagementListingSection className="content-radius-shadow">
                <div className="flex">
                    <div className="table-data-export-buttons">
                        {hasAccess(sitePermissions.downloadMeritKeysPDF) && <div className="export-btn">
                            <span>
                                <PdfSvg className="icon" />
                            </span>
                            <span className="text">PDF</span>
                        </div>}

                        {hasAccess(sitePermissions.downloadMeritKeysExcel) && <div className="export-btn">
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllMeritKeys)}
                            onKeyUp={e => handleTableSearch(e, getAllMeritKeys)}
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
                            {data?.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.key_title}</td>

                                        <td>{item.key_body}</td>

                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon" onClick={() => goToEditMeritKey(item?.id)}>
                                                    <EditTableSvg />
                                                </div>

                                                <div
                                                    className="action-icon"
                                                    onClick={() => handleDelete(item?.id)}
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
            </SuperRoleManagementListingSection>
        </SuperRoleManagementListingMain>
    );
};

export default MeritKeysListing;
