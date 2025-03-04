import { FC, Fragment, useEffect } from "react";
import {
    CertificateLinkListingSection,
    CertificateLinkListingMain,
    CertificateLinkListingTop,
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
import useOrganization from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";

const CertificateLinksListing: FC = () => {
    const columns: string[] = [
        "Certificate Category",
        "Result Type",
        "Degree Certificate",
        "Skipped Degree Certificate",
        "Action",
    ];

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const { getCertificateLinks, deleteCertificateLink } = useOrganization();
    const { handleSearchChange, handleTableSearch } = useUtils();

    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const navigate = useNavigate();

    const goToCreateCertificateLink = () => {
        navigate(siteRoutes.certificateLinkCreate);
    };

    const { isLoading } = useSelector((state: any) => state.sharedReducer);

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllCertificateLinks(page + 1, search);
    };
    const getAllCertificateLinks = (page: number = 1, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getCertificateLinks(setData, queryParams, setPagination);
    };

    useEffect(() => {
        getAllCertificateLinks(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteCertificateLink(id, setData, queryParams, setPagination);
        }
    };

    const goToEditCertificateLink = (id: number) => {
        navigate(`${siteRoutes.certificateLinkCreate}?id=${id}`);
    };

    return (
        <CertificateLinkListingMain>
            <CertificateLinkListingTop>
                <div className="left">
                    <span className="page-heading">Certificate Links To Result Type</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="create-org-btn">
                        <button
                            className="lg-rounded-btn"
                            type="button"
                            onClick={goToCreateCertificateLink}
                        >
                            + Add New
                        </button>
                    </div>
                </div>
            </CertificateLinkListingTop>

            <CertificateLinkListingSection className="content-radius-shadow">
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
                            onChange={(e) =>
                                handleSearchChange(e, setSearch, getAllCertificateLinks)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllCertificateLinks)}
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
                                        <td>{item?.certificate_levels?.title}</td>

                                        <td>{item?.result_type?.title}</td>
                                        <td>
                                            <div>{item?.degree_certificate?.title ?? "-"}</div>
                                        </td>
                                        <td>
                                            <div className="mw-150">
                                                {item?.skipped_certificates
                                                    ?.map((i: any) => i?.title)
                                                    .join(", ")}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-action-icons">
                                                <div
                                                    className="action-icon"
                                                    onClick={() => goToEditCertificateLink(item?.id)}
                                                >
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
            </CertificateLinkListingSection>
        </CertificateLinkListingMain>
    );
};

export default CertificateLinksListing;
