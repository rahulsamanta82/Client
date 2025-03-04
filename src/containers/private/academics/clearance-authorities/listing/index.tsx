import { FC, Fragment, useState } from "react";
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
    ClearanceAuthoritiesListingMain,
    ClearanceAuthoritiesListingSection,
    ClearanceAuthoritiesListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const ClearanceAuthoritiesListing: FC = () => {
    const [search, setSearch] = useState<string>("");
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = ["Label", "Code", "Action"];

    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Clearance Authorities", path: siteRoutes.clearanceAuthoritiesListing },
    ];
    const navigate = useNavigate();

    const goToCreate = () => {
        navigate(siteRoutes.createClearanceAuthority);
    };

    const [data, setData] = useState<any[]>([]);

    return (
        <ClearanceAuthoritiesListingMain>
            <ClearanceAuthoritiesListingTop>
                <div className="left">
                    <span className="page-heading">Clearance Authorities</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
                <div className="right">
                    <div className="add-new-button">
                        <button className="lg-rounded-btn" onClick={goToCreate}>
                            + Add Authorities
                        </button>
                    </div>
                </div>
            </ClearanceAuthoritiesListingTop>

            <ClearanceAuthoritiesListingSection className="content-radius-shadow">
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
                            {[1, 1, 1, 1].map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div className="mw-150">
                                        Directorate of Academics
                                        </div>
                                    </td>
                                    <td>
                                        <div className="mw-150">
                                            Description will be here
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon">
                                                <EditTableSvg />
                                            </div>
                                            <div className="action-icon">
                                                <DeleteTableSvg />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <Fragment>
                        <Pagination
                            onPageChange={(page: any) => console.log(page)}
                            {...pagination}
                        />
                    </Fragment>
                </div>
            </ClearanceAuthoritiesListingSection>
        </ClearanceAuthoritiesListingMain>
    );
};

export default ClearanceAuthoritiesListing;
