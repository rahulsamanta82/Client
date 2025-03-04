import { FC, Fragment, useEffect, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import { useNavigate } from "react-router-dom";
import {
  ManageMeritListListingMain,
  ManageMeritListListingSection,
  ManageMeritListListingTop,
} from "./style";
import useUtils from "hooks/useUtils";
import BulkLockList from "./components/bulk-lock-list";
import BulkUnlockStep from "./components/bulk-unlock-step";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAdmissions from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const ManageMeritList: FC = ({}) => {
  const [openManageCriteriaModal, setOpenManageCriteriaModal] = useState(false);
  const [openManageSeatsModal, setOpenManageSeatsModal] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [automationId, setAutomationId] = useState<number>(0);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const { handleSearchChange, handleTableSearch } = useUtils();
  const { getMeritListAutomations, deleteMeritAutomation, downloadBulkList } =
    useAdmissions();

  const columns: string[] = [
    "",
    "Title",
    "Offer Date",
    "Expiry Date",
    "Merit List No",
    "Minimum App. to lock",
  ];

  const toggleRowExpand = (index: number) => {
    const programs = [...data];
    programs[index].isExpanded = !programs[index].isExpanded;
    setData([...programs]);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllMeritListAutomations(page + 1, search);
  };

  const getAllMeritListAutomations = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };

    getMeritListAutomations(setData, queryParams, setPagination);
  };
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const downloadList = (id: number) => {
    downloadBulkList(id);
  };
  useEffect(() => {
    getAllMeritListAutomations(pagination.page, search);
  }, []);

  const handleOpenManageCriteriaModal = (automationId: number) => {
    setAutomationId(automationId);
    setOpenManageCriteriaModal(true);
  };

  const handleOpenManageSeatsModal = (automationId: number) => {
    setAutomationId(automationId);
    setOpenManageSeatsModal(true);
  };

  const goToAddManageMeritList = () => {
    navigate(siteRoutes.createAdmissionManageMeritList);
  };

  const goToEditManageMeritList = (id: number) => {
    navigate(`${siteRoutes.createAdmissionManageMeritList}?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = { per_page: 10, page: 1 };
      deleteMeritAutomation(id, setData, queryParams, setPagination);
    }
  };

  return (
    <ManageMeritListListingMain>
      <ManageMeritListListingTop>
        <div className="left">
          <span className="page-heading">Manage Merit List</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-btn">
            <button className="lg-rounded-btn" onClick={goToAddManageMeritList}>
              + Add New
            </button>
          </div>
        </div>
      </ManageMeritListListingTop>
      <ManageMeritListListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllMeritListAutomations)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllMeritListAutomations)}
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
                  <Fragment key={index}>
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
                        <div className="mw-150">{item.title}</div>
                      </td>
                      <td>{item.offer_date}</td>
                      <td>{item?.expiry_date}</td>
                      <td>{`${item?.ml < 10 ? 0 : ""}${item?.ml}`}</td>
                      <td>{`${item?.minimum_apps_to_lock < 10 ? 0 : ""}${
                        item?.minimum_apps_to_lock
                      }`}</td>
                    </tr>

                    {item.isExpanded && (
                      <tr>
                        <td></td>
                        <td colSpan={5}>
                          <div className="expanded-content">
                            <div className="particular-info">
                              <span className="title">Quotas</span>
                              <span className="info">57</span>
                            </div>
                            <div className="particular-info">
                              <span className="title">
                                Program Title Filter
                              </span>
                              <span className="info">
                                {item?.program_title_filter ?? "__"}
                              </span>
                            </div>
                            <div className="particular-info">
                              <span className="title">Link Slot ID</span>
                              <div className="info">
                                <span className="status">
                                  {item?.link_slots ?? "__"}
                                </span>
                              </div>
                            </div>
                            <div className="particular-info">
                              <span className="title">Action</span>
                              <div className="info">
                                <div className="table-action-icons">
                                  <div
                                    className="action-icon"
                                    onClick={() =>
                                      goToEditManageMeritList(item?.id)
                                    }
                                  >
                                    <EditTableSvg />
                                  </div>
                                  <div
                                    className="action-button"
                                    onClick={() => downloadList(item?.id)}
                                  >
                                    <button className="download-lock-list-btn">
                                      Download Locked List
                                    </button>
                                  </div>
                                  <div className="action-button">
                                    <button>Download Awaiting List </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="extend-date-btn">
                                      Extend Date
                                    </button>
                                  </div>

                                  <div
                                    className="action-button"
                                    onClick={() =>
                                      handleOpenManageCriteriaModal(item?.id)
                                    }
                                  >
                                    <button className="lock-list-btn">
                                      Bulk lock list
                                    </button>
                                  </div>
                                  <div
                                    className="action-button"
                                    onClick={() =>
                                      handleOpenManageSeatsModal(item.id)
                                    }
                                  >
                                    <button className="unlock-step-btn">
                                      Bulk unlock step
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="bulk-lock-excel-btn">
                                      Bulk lock using Excel
                                    </button>
                                  </div>

                                  <div className="action-button">
                                    <button className="download-summary-btn">
                                      Download Summary
                                    </button>
                                  </div>

                                  <div
                                    className="action-icon"
                                    onClick={() => handleDelete(item?.id)}
                                  >
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
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!data.length && !isLoading} />
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </ManageMeritListListingSection>
      {openManageCriteriaModal && (
        <BulkLockList
          setOpen={setOpenManageCriteriaModal}
          automationId={automationId}
        />
      )}
      {openManageSeatsModal && (
        <BulkUnlockStep
          setOpen={setOpenManageSeatsModal}
          automationId={automationId}
        />
      )}
    </ManageMeritListListingMain>
  );
};

export default ManageMeritList;
