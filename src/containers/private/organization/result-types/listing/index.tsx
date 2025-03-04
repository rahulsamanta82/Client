import { FC, Fragment, useEffect } from "react";
import {
    ResultTypeListingSection,
    ResultTypeListingMain,
    ResultTypeListingTop,
} from "./style";
import { useState } from "react";
import {
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
    LinkIconSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Breadcrumb from "components/particles/breadcrumb";
import useOrganization from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";

const ResultTypeListing: FC = () => {
    const columns: string[] = ["ID", "Title", "Display Order", "Action"];

    const { getResultTypesAdmin, deleteResultTypeAdmin } = useOrganization();

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const { handleSearchChange, handleTableSearch } = useUtils();

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllResultTypes(page + 1, search);
    };
    const getAllResultTypes = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getResultTypesAdmin(setData, queryParams, setPagination);
    };
    const navigate = useNavigate();

    const goToCreateResultType = () => {
        navigate(siteRoutes.resultTypeCreate);
    };

    useEffect(() => {
        getAllResultTypes(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteResultTypeAdmin(id, setData, queryParams, setPagination);
        }
    };

    const goToEditResultType = (id: number) => {
        navigate(`${siteRoutes.resultTypeCreate}?id=${id}`);
    };

    const goToCertificateLink = () => {
        navigate(siteRoutes.certificateLinkListing);
    }

    return (
        <ResultTypeListingMain>
            <ResultTypeListingTop>
                <div className="left">
                    <span className="page-heading">Result Types</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="action-buttons">
                        <button className="lg-rounded-btn" type="button" onClick={goToCertificateLink}>
                            <LinkIconSvg className="me-5" />
                            Certificate Link
                        </button>
                        <button
                            className="lg-rounded-btn"
                            type="button"
                            onClick={goToCreateResultType}
                        >
                            + Add New
                        </button>
                    </div>
                </div>
            </ResultTypeListingTop>

            <ResultTypeListingSection className="content-radius-shadow">
                <div className="flex">
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
                            onChange={(e) => handleSearchChange(e, setSearch, getAllResultTypes)}
                            onKeyUp={e => handleTableSearch(e, getAllResultTypes)}
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
                            {data?.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>

                                        <td>
                                            <div>{item.title}</div>
                                        </td>
                                        <td>
                                            <div>{item.display_order}</div>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div className="action-icon" onClick={() => goToEditResultType(item.id)}>
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
            </ResultTypeListingSection>
        </ResultTypeListingMain>
    );
};

export default ResultTypeListing;
