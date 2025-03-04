import { FC, Fragment, useEffect, useState } from "react";
import { CCSFilters, CCSFilterSection, CCSListingSection, CCSMain, CCSTopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useFinance from "../../useHooks";
import { useSelector } from "react-redux";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";

interface CheckFinancialChallanStatusListingrops { }

const CheckFinancialChallanStatusListing: FC<CheckFinancialChallanStatusListingrops> = ({ }) => {
    const { getChallanStatuses } = useFinance();
    const [data, setData] = useState<any[]>([]);
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const { handleSearchChange, handleTableSearch } = useUtils();
    const [filters, setFilters] = useState<{ challan_no: string }>({ challan_no: '' });
    const columns: string[] = [
        "Challan",
        "Status",
        "Remarks",
        "Additional remarks",
        "Created at",
        "Updated at"
    ]


    useEffect(() => {
        getAllChallanStatuses(pagination.page, search);
    }, []);

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllChallanStatuses(page + 1, search);
    };
    const getAllChallanStatuses = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
            ...filters,
        };
        getChallanStatuses(setData, queryParams, setPagination);
    };

    const onFilterChange = (event: any) => {
        const { value, name } = event.target;
        setFilters({ ...filters, [name]: value });
        console.log(value, name)
    }

    return (
        <CCSMain>
            <CCSTopSection>
                <div className="heading">
                    <span className="page-heading">Challan Status</span>
                    <Breadcrumb />
                </div>
            </CCSTopSection>
            <CCSFilterSection className="content-radius-shadow">
                <CCSFilters>
                    <div className="filter-fields">
                        <div className="input-field">
                            <label htmlFor="cnic">Challan Number</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="text" placeholder="Enter Challan Number" value={filters.challan_no} onChange={onFilterChange} name="challan_no" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submit-buttons">
                        <div className="buttons">
                            <button
                                className="lg-rounded-btn"
                                onClick={() => getAllChallanStatuses(pagination.page, search)}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </CCSFilters>
            </CCSFilterSection>

            <CCSListingSection className="content-radius-shadow">
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
                                handleSearchChange(e, setSearch, getAllChallanStatuses)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllChallanStatuses)}
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
                            {data.map((status: any, index: number) => {
                                return <tr key={index}>
                                    <td>{status.challan_no}</td>
                                    <td>{status.status}</td>
                                    <td>{status.remarks === '' ? '-' : status.remarks}</td>
                                    <td>{status.additional_remarks === '' ? '-' : status.additional_remarks}</td>
                                    <td>{status.createdAt ?? '-'}</td>
                                    <td>{status.updatedAt ?? '-'}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <Fragment>
                    <DataNotFound show={!isLoading && !data.length} />
                    <Pagination onPageChange={onPageChange} {...pagination} />
                </Fragment>
            </CCSListingSection>
        </CCSMain>
    )
}

export default CheckFinancialChallanStatusListing;