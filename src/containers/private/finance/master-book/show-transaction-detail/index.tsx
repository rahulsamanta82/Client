import { FC, Fragment, useEffect, useState } from "react";
import { ShowTransactionDetailListingSection, ShowTransactionDetailMain, ShowTransactionDetailTop, TransactionDetailSection, TransactionDropdown } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, DownArrowLightgrayMediumSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useUtils from "hooks/useUtils";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import useFinance from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";

interface VoucherTypesListingProps { }

const ShowTransactionDetail: FC<VoucherTypesListingProps> = ({ }) => {
    const [showTransactionDropdown, setShowTransactionDropdown] = useState<boolean>(false);
    const { getQueryParams, handleSearchChange, handleTableSearch } = useUtils();
    const [data, setData] = useState<any[]>([]);
    const { transaction_id, challan_no, app_no } = getQueryParams();
    const { getMasterBookLinkedParticulars, deleteMasterBookLinkedParticular } = useFinance();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const [search, setSearch] = useState<string>("");
    const columns: string[] = [
        "Title",
        "Account Code",
        "Action",
    ]

    useEffect(() => {
        getAllMasterBookLinkedParticulars(pagination.page, search);
    }, []);

    const handleDelete = async (id: number) => {
        const response = await confirmationPopup();
        if (response.isConfirmed) {
            const queryParams = {
                page: 1,
                per_page: pagination.per_page,
            };
            deleteMasterBookLinkedParticular(id, transaction_id, setData, queryParams, setPagination);
        }
    };

    const onPageChange = (pageInfo: { selected: number }) => {
        const { selected: page } = pageInfo;
        setPagination({ ...pagination, page: page + 1 });
        getAllMasterBookLinkedParticulars(page + 1, search);
    };
    const getAllMasterBookLinkedParticulars = (page: number, search: string) => {
        const queryParams = {
            per_page: pagination.per_page,
            page,
            search,
        };
        getMasterBookLinkedParticulars(transaction_id, setData, queryParams, setPagination);
    };

    const toggleTransactionDropdown = () => {
        setShowTransactionDropdown(!showTransactionDropdown);
    }
    return (
        <ShowTransactionDetailMain>
            <ShowTransactionDetailTop>
                <div className="left">
                    <span className="page-heading">Show Transaction Details</span>
                    <Breadcrumb />
                </div>
            </ShowTransactionDetailTop>

            <ShowTransactionDetailListingSection className="content-radius-shadow">
                <TransactionDetailSection>
                    <TransactionDropdown showTransactionDropdown={showTransactionDropdown}>
                        <span className="filter-heading">Application: {app_no}, Challan: {challan_no}</span>
                        <span className="dropdown-arrow cp" onClick={toggleTransactionDropdown}>
                            <DownArrowLightgrayMediumSvg className="icon" />
                        </span>
                    </TransactionDropdown>
                    {showTransactionDropdown ? <div className="dropdown-content">
                        <div className="total-amount">
                            <div className="total-amount-box">
                                <div className="title">Total Amount</div>
                                <div className="amount">{data![0]?.amount ?? 0}</div>
                            </div>
                        </div>
                    </div> : ''}
                </TransactionDetailSection>
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
                                handleSearchChange(e, setSearch, getAllMasterBookLinkedParticulars)
                            }
                            onKeyUp={(e) => handleTableSearch(e, getAllMasterBookLinkedParticulars)}
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
                            {data![0]?.transaction_details?.map((item: any, index: number) => {
                                return <tr key={index}>
                                    <td>{item?.voucher_particular?.title}</td>
                                    <td>{item?.voucher_particular?.fee_code}</td>
                                    <td>
                                        <div className="table-action-icons">
                                            <div className="action-icon">
                                                <button className="md-action-btn">Audit Trail</button>
                                            </div>
                                            <div className="action-icon" onClick={() => handleDelete(item?.id)}>
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
                    {/* <Pagination onPageChange={onPageChange} {...pagination} /> */}
                </Fragment>
            </ShowTransactionDetailListingSection>
        </ShowTransactionDetailMain>
    )
}

export default ShowTransactionDetail;