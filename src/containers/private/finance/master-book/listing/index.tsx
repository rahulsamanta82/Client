import { FC, Fragment, useEffect, useState } from "react";
import { MBLFilters, MBLFilterSection, MBLFilterHeader, MBLListingSection, MBLMain, MBLTopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { AddGrayTableSvg, BlackSettingTableSvg, BlackTableViewSvg, DeleteTableSvg, DownArrowLightgrayMediumSvg, ExcelSvg, GreenIncognitoTableSvg, MetallicGrayUploadTableSvg, PdfSvg, SearchFieldSvg, YellowDownloadTableSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useStore from "hooks/useStore";
import { Navigate, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import UploadBankScroll from "./components/upload-bank-scroll";
import useUtils from "hooks/useUtils";
import useFinance from "../../useHooks";
import { useSelector } from "react-redux";

interface MasterBookListingProps { }

const MasterBookListing: FC<MasterBookListingProps> = ({ }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const { hasAccess } = useStore();
  const [uploadBankScrollDialog, setOpenUploadBankScrollDialog] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { masterBookListing } = useFinance();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "",
    "CNIC",
    "Application",
    "Session",
    "Installment #",
    "App #",
    "Challan #"
  ]

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  }

  const toggleRowExpand = (index: number) => {
    data[index].isExpanded = !data[index].isExpanded;
    setData([...data]);
  }

  const goToShowTransactionDetail = (transaction: any) => {
    const { id: transactionId, app_no, account_transactions: { challan_no } } = transaction;

    navigate(`${siteRoutes.showMasterBookTransactionDetail}?transaction_id=${transactionId}&app_no=${app_no}&challan_no=${challan_no}`);
  }
  const goToTransactionDetails = (transaction: any) => {
    const { id: transactionId, app_no, account_transactions: { challan_no } } = transaction;

    navigate(`${siteRoutes.masterBookTransactionDetail}?transaction_id=${transactionId}&app_no=${app_no}&challan_no=${challan_no}`);
  }

  const openUploadBankScrollDialog = () => {
    setOpenUploadBankScrollDialog(true);
  }

  const [search, setSearch] = useState<string>("");

  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllMasterBooks(pagination.page, search);
  }, []);

  // const handleDelete = async (id: number) => {
  //   const response = await confirmationPopup();
  //   if (response.isConfirmed) {
  //     const queryParams = {
  //       page: 1,
  //       per_page: pagination.per_page,
  //     };
  //     deleteFinanceApplication(id, setData, queryParams, setPagination);
  //   }
  // };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllMasterBooks(page + 1, search);
  };
  const getAllMasterBooks = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    masterBookListing(setData, queryParams, setPagination);
  };

  return (
    <MBLMain>
      <MBLTopSection>
        <div className="left">
          <span className="page-heading">Master Book List</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.masterBookListing) && (
            <div className="create-fine-slot-btn">
              <button className="lg-rounded-btn" onClick={openUploadBankScrollDialog}>
                + Upload Bulk Verification Data
              </button>
            </div>
          )}
        </div>
      </MBLTopSection>
      <MBLFilterSection className="content-radius-shadow">
        <MBLFilterHeader showFilterDropdown={showFilterDropdown}>
          <span className="filter-heading">Filter</span>
          <span className="dropdown-arrow cp" onClick={toggleFilterDropdown}>
            <DownArrowLightgrayMediumSvg className="icon" />
          </span>
        </MBLFilterHeader>
        {showFilterDropdown && (
          <MBLFilters>
            <div className="filter-fields">
              <div className="input-field">
                <label htmlFor="">Voucher Issue Date (From)</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Voucher Issue Date (To)</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">CNIC</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">App</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Challan #</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Year</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Semester</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All Semesters</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Application</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All Applications</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Status</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All Status</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Challan File</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All data</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Remarks</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">All Remarks</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Is Installment?</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Option</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Verification Bank?</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Option</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Verification Method?</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option value="">Select Option</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Verified Date (From)?</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Verified Date (To)?</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Total Amount</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Particular Head</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Voucher Type Code</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Particular Remarks</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label htmlFor="">Show Remove</label>
                <div className="field-wrap">
                  <div className="field">
                    <select>
                      <option>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="submit-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray">
                  Reset
                </button>
                <button
                  className="lg-rounded-btn"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </MBLFilters>
        )}
      </MBLFilterSection>

      <MBLListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllMasterBooks)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllMasterBooks)}
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
              {data.map((item, index) => {
                return <Fragment key={index}>
                  <tr className={`expandable ${item.isExpanded && "opened"}`}>
                    <td>
                      <div
                        className="rounded-expand-button"
                        onClick={() => toggleRowExpand(index)}
                      >
                        <span>{item.isExpanded ? "-" : "+"}</span>
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">{item?.user?.cnic}</div>
                    </td>
                    <td>{item?.application?.title}</td>
                    <td>
                      Fall 24
                    </td>
                    <td>----</td>
                    <td>{item?.app_no}</td>
                    <td>{item?.account_transactions?.challan_no}</td>
                  </tr>

                  {item.isExpanded && (
                    <tr>
                      <td></td>
                      <td colSpan={6}>
                        <div className="expanded-content">
                          <div className="particular-info">
                            <span className="title">Paid On</span>
                            <span className="info"></span>
                          </div>
                          <div className="particular-info">
                            <span className="title">
                              Remarks
                            </span>
                            <span className="info">{item?.remarks === '' ? '-' : item?.remarks}</span>
                          </div>
                          <div className="particular-info">
                            <span className="title">
                              Particulars
                            </span>
                            <span className="info">{item?.account_transaction_detail?.voucher_particular?.title}</span>
                          </div>

                          <div className="particular-info">
                            <span className="title">Action</span>
                            <div className="info">
                              <div className="table-action-icons">
                                {hasAccess(sitePermissions.showMasterBookTransactionDetail) ? <div className="action-icon view" onClick={() => goToShowTransactionDetail(item)}>
                                  <BlackTableViewSvg />
                                </div> : ''}
                                <div className="action-icon">
                                  <AddGrayTableSvg />
                                </div>
                                <div className="action-icon" onClick={() => goToTransactionDetails(item)}>
                                  <BlackSettingTableSvg />
                                </div>
                                <div className="action-icon">
                                  <YellowDownloadTableSvg />
                                </div>
                                <div className="action-icon">
                                  <MetallicGrayUploadTableSvg />
                                </div>
                                <div className="action-icon">
                                  <GreenIncognitoTableSvg />
                                </div>
                                <div className="action-icon">
                                  <DeleteTableSvg />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </MBLListingSection>
      <Fragment>
        {uploadBankScrollDialog && <UploadBankScroll setOpen={setOpenUploadBankScrollDialog} />}
      </Fragment>
    </MBLMain>
  )
}

export default MasterBookListing;