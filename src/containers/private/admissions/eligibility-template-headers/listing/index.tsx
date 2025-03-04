import { FC, Fragment, useEffect, useState } from "react";
import { AdmissionETHListingMain, AdmissionETHListingTop } from "./style";
import {
    BlackTableViewSvg,
    DeleteTableSvg,
    EditTableSvg,
    ExcelSvg,
    PdfSvg,
    SearchFieldSvg,
} from "assets/images/common/svgs";
import { AdmissionStudentsListingSection } from "containers/private/admissions/students-listing/style";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAdmissions from "containers/private/admissions/useHooks";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

interface AdmissionETHListingProps { }

const AdmissionETHListing: FC<AdmissionETHListingProps> = () => {
    const {
        deleteTemplateHeader,
        getTemplateHeaders,
        updateTemplateHeader,
    } = useAdmissions();
    const [search, setSearch] = useState("");
    const { handleSearchChange, handleTableSearch } = useUtils();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const { hasAccess } = useStore();

    const [data, setData] = useState<any[]>([]);

    const columns: string[] = ["ID", "Title", "Is Quota", "Action"];

    const handleDelete = async (id: number) => {
        const result = await confirmationPopup();
        if (result.isConfirmed) {
            deleteTemplateHeader(id, setData, pagination, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllTemplateHeaders(page + 1, search);
    };

    useEffect(() => {
        getAllTemplateHeaders(pagination.page, search);
    }, []);

    const goToTemplateHeaderDetail = (item: any) => {
        const { id, title } = item;
        navigate(
            `${siteRoutes.admissioneligibilityTemplateBodiesListing
            }?headerId=${id}&title=${encodeURIComponent(title)}`
        );
    };

    const getAllTemplateHeaders = (page: number, search: string) => {
        const queryParams = {
            ...pagination,
            page,
            search,
        };
        getTemplateHeaders(setData, queryParams, setPagination);
    };

    const handleUpdateHeader = (header: any, index: number) => {
        const { id, title, is_quota } = header;
        data[index] = header;
        setData([...data]);
        updateTemplateHeader(id, { title, is_quota });
    };

    const goToUpdateHeader = (id: number) => {
        navigate(
            `${siteRoutes.createAdmissioneligibilityTemplateHeaders}?id=${id}`
        );
    };
    const navigate = useNavigate();
    return (
        <AdmissionETHListingMain>
            <AdmissionETHListingTop>
                <div className="left">
                    <span className="page-heading">Eligibility Templates Header</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="download-buttons">
                        <div className="particular-button">
                            <button className="lg-rounded-btn">Download All Template</button>
                        </div>
                        {hasAccess(
                            sitePermissions.createAdmissioneligibilityTemplateHeaders
                        ) && (
                                <div className="particular-button">
                                    <button
                                        className="lg-rounded-btn"
                                        onClick={() =>
                                            navigate(
                                                siteRoutes.createAdmissioneligibilityTemplateHeaders
                                            )
                                        }
                                    >
                                        + Add New
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </AdmissionETHListingTop>

            <AdmissionStudentsListingSection className="content-radius-shadow">
                <div className="list-header">
                    <div className="table-data-export-buttons">
                        {hasAccess(
                            sitePermissions.downloadAdmissionEligibilityTemplateHeaderPDF
                        ) && (
                                <div className="export-btn">
                                    <span>
                                        <PdfSvg className="icon" />
                                    </span>
                                    <span className="text">PDF</span>
                                </div>
                            )}

                        {hasAccess(
                            sitePermissions.downloadAdmissionEligibilityTemplateHeaderExcel
                        ) && (
                                <div className="export-btn">
                                    <span>
                                        <ExcelSvg className="icon" />
                                    </span>
                                    <span className="text">Excel</span>
                                </div>
                            )}
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
                                handleSearchChange(e, setSearch, getAllTemplateHeaders)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllTemplateHeaders)}
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
                            {data.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.id}</td>
                                        <td>{item?.title}</td>
                                        <td>
                                            <div className="table-radio-field">
                                                <div className="radio">
                                                    <label htmlFor={`is_quota-no-${index}`}>No</label>
                                                    <input
                                                        type="radio"
                                                        name={`is_quota-${index}`}
                                                        id={`is_quota-no-${index}`}
                                                        checked={!item?.is_quota}
                                                        onChange={() =>
                                                            handleUpdateHeader(
                                                                { ...item, is_quota: 0 },
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="radio">
                                                    <label htmlFor={`is_quota-yes-${index}`}>Yes</label>
                                                    <input
                                                        type="radio"
                                                        name={`is_quota-${index}`}
                                                        id={`is_quota-yes-${index}`}
                                                        checked={item?.is_quota}
                                                        onChange={() =>
                                                            handleUpdateHeader(
                                                                { ...item, is_quota: 1 },
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                {hasAccess(
                                                    sitePermissions.admissioneligibilityTemplateHeadersShow
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => goToTemplateHeaderDetail(item)}
                                                        >
                                                            <BlackTableViewSvg />
                                                        </div>
                                                    )}

                                                {hasAccess(
                                                    sitePermissions.admissioneligibilityTemplateHeadersEdit
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => goToUpdateHeader(item.id)}
                                                        >
                                                            <EditTableSvg />
                                                        </div>
                                                    )}

                                                {hasAccess(
                                                    sitePermissions.admissioneligibilityTemplateHeadersDelete
                                                ) && (
                                                        <div
                                                            className="action-icon"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <DeleteTableSvg />
                                                        </div>
                                                    )}
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
            </AdmissionStudentsListingSection>
        </AdmissionETHListingMain>
    );
};

export default AdmissionETHListing;
