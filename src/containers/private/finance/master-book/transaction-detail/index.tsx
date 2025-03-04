import { FC, Fragment, useEffect, useState } from "react";
import { ShowTransactionDetailListingSection, ShowTransactionDetailMain, ShowTransactionDetailTop, TransactionDropdownDetail, TransactionDropdownHeader, TransactionDropdownSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { DeleteTableSvg, DownArrowLightgrayMediumSvg, ExcelSvg, PdfSvg, SearchFieldSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import AddParticularToChallan from "./components/add-particulars-to-challan";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import { useSelector } from "react-redux";
import { confirmationPopup, warningToaster } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { VoucherParticularDTO } from "utils/helpers/models/finance/voucher-particular.dto";
import { BankDiscountAdjustmentDTO } from "utils/helpers/models/finance/bank-transaction.dto";

interface MasterBookTransactionDetailProps { }

const MasterBookTransactionDetail: FC<MasterBookTransactionDetailProps> = ({ }) => {
    const navigate = useNavigate();
    const [showTransactionDropdown, setShowTransactionDropdown] = useState<boolean>(false);
    const [openAddParticularToChallan, setOpenAddParticularChallan] = useState<boolean>(false);
    const { getQueryParams, handleSearchChange, handleTableSearch } = useUtils();
    const [data, setData] = useState<any[]>([]);
    const [particulars, setParticulars] = useState<VoucherParticularDTO[]>([]);
    const { transaction_id, challan_no, app_no } = getQueryParams();
    const { getMasterBookLinkedParticulars, deleteMasterBookLinkedParticular, getVoucherParticulars, updateTransactionDiscountAdjustment } = useFinance();
    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    const [discountAdjustmentForm, setDiscountAdjustmentForm] = useState<BankDiscountAdjustmentDTO>({ ...new BankDiscountAdjustmentDTO(), transaction_id });
    const [search, setSearch] = useState<string>('');
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        totalRecords: 1,
    });
    const columns: string[] = [
        "Particular ID",
        "Particular",
        "Amount",
        "Action",
    ]

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

    useEffect(() => {
        getAllMasterBookLinkedParticulars(pagination.page, search);
        getVoucherParticulars(setParticulars);
    }, []);

    const toggleTransactionDropdown = () => {
        setShowTransactionDropdown(!showTransactionDropdown);
    }

    const onSubmitAccountAdjustment = () => {
        if (discountAdjustmentForm.particular_id) {
            updateTransactionDiscountAdjustment(discountAdjustmentForm);
        } else {
            warningToaster('Please select particular first');
        }
    }
    return (
        <ShowTransactionDetailMain>
            <ShowTransactionDetailTop>
                <div className="left">
                    <span className="page-heading">Transaction Details</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                    <div className="add-btn">
                        <button className="lg-rounded-btn" onClick={() => setOpenAddParticularChallan(true)}>+ Add Voucher Particulars</button>
                    </div>
                </div>
            </ShowTransactionDetailTop>

            <TransactionDropdownSection className="content-radius-shadow">
                <TransactionDropdownHeader showFilterDropdown={showTransactionDropdown}>
                    <span className="filter-heading">Application: {app_no}, Challan: {challan_no}</span>
                    <span className="dropdown-arrow cp" onClick={toggleTransactionDropdown}>
                        <DownArrowLightgrayMediumSvg className="icon" />
                    </span>
                </TransactionDropdownHeader>
                {showTransactionDropdown ?
                    <TransactionDropdownDetail>
                        <div className="top-section">
                            <div className="total-amount">
                                <div className="total-amount-box">
                                    <div className="title">Total Amount</div>
                                    <div className="amount">{data![0]?.total_amount}</div>
                                </div>
                            </div>
                            <div className="discount-field">
                                <div className="input-field">
                                    <label htmlFor="">Particular</label>
                                    <div className="field-wrap">
                                        <div className="field">
                                            <select onChange={(e) => setDiscountAdjustmentForm({ ...discountAdjustmentForm, particular_id: e.target.value })}>
                                                <option value="">Select Particular</option>
                                                {particulars.map((particular, index) => {
                                                    return <option value={particular.id} key={index}>{particular.title}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-button">
                                    <button onClick={onSubmitAccountAdjustment}>Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-section">
                            <div className="form-section">
                                <div className="common-fields">
                                    <div className="input-field">
                                        <label htmlFor="">Due date</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input type="date" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="">Remarks</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="submit-button">
                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                    </TransactionDropdownDetail>
                    : ''}
            </TransactionDropdownSection>

            <ShowTransactionDetailListingSection className="content-radius-shadow">
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
                                    <td>{item?.voucher_particular?.id}</td>
                                    <td>{item?.voucher_particular?.title}</td>
                                    <td>{item?.voucher_particular?.amount}</td>
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
                    {/* <Pagination page={1} onPageChange={e => console.log(e)} per_page={10} totalRecords={40} /> */}
                </Fragment>
            </ShowTransactionDetailListingSection>
            <Fragment>
                {openAddParticularToChallan ? <AddParticularToChallan setOpen={setOpenAddParticularChallan} /> : ''}
            </Fragment>
        </ShowTransactionDetailMain>
    )
}

export default MasterBookTransactionDetail;