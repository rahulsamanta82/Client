import { FC, Fragment, useEffect, useState } from "react";
import {
  AdmissionQoutaListingMain,
  AdmissionQoutaListingSection,
  AdmissionQoutaListingTop,
} from "./style";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  AddProgramTableSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAdmissions from "../../useHooks";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const QoutasListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { getQuotaHeaders, deleteQuotaHeader } = useAdmissions();
  const { handleTableSearch, handleSearchChange } = useUtils();
  const columns: string[] = [
    "Title",
    "Eligibility Template",
    "Seq. No.",
    "Seats",
    // "Reconsider From Quotas",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();
  const goToCreateQuotaList = () => {
    navigate(siteRoutes.createQuotasAdmissionList);
  };
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllQuotaHeaders(page + 1, search);
  };
  const getAllQuotaHeaders = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };

    getQuotaHeaders(setData, queryParams, setPagination);
  };

  useEffect(() => {
    getAllQuotaHeaders(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };

      deleteQuotaHeader(id, setData, queryParams, setPagination);
    }
  };

  const goToEditQuotaHeader = (id: number) => {
    navigate(`${siteRoutes.createQuotasAdmissionList}?id=${id}`);
  };

  const goToQuotaPrograms = (quota: any) => {
    navigate(siteRoutes.qoutasListProgramListing, { state: { quota } });
  };

  return (
    <AdmissionQoutaListingMain>
      <AdmissionQoutaListingTop>
        <div className="left">
          <span className="page-heading">Quotas List</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateQuotaList}>
              + Add New
            </button>
          </div>
        </div>
      </AdmissionQoutaListingTop>
      <AdmissionQoutaListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllQuotaHeaders)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllQuotaHeaders)}
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
                    <td>
                      <div className="mw-150">{item?.title}</div>
                    </td>
                    <td>
                      <div className="mw-150">{item?.template?.title}</div>
                    </td>
                    <td>{item?.seq_no}</td>
                    <td>{item?.seats}</td>
                    {/* <td>
                      <div className="table-radio-field">
                        <div className="radio">
                          <input
                            type="radio"
                            checked={item?.reconsider_from_quotas?.length}
                            readOnly
                          />
                          <label htmlFor={`is-reconsider-yes-${index}`}>
                            Yes
                          </label>
                        </div>
                        <div className="radio">
                          <input
                            type="radio"
                            name={`is-reconsider-${index}`}
                            id={`is-reconsider-yes-${index}`}
                            checked={!item?.reconsider_from_quotas?.length}
                            readOnly
                          />
                          <label htmlFor={`is-reconsider-yes-${index}`}>
                            No
                          </label>
                        </div>
                      </div>
                    </td> */}
                    <td>{item?.fee_status ? "Paid" : "Unpaid"}</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <AddProgramTableSvg
                            onClick={() => goToQuotaPrograms(item)}
                          />
                        </div>
                        <div
                          className="action-icon"
                          onClick={() => goToEditQuotaHeader(item?.id)}
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
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </AdmissionQoutaListingSection>
    </AdmissionQoutaListingMain>
  );
};

export default QoutasListing;
