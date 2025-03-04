import { FC, Fragment, useEffect, useState } from "react";
import {
  AdmissionCampaignListingMain,
  AdmissionCampaignListingSection,
  AdmissionCampaignListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  ProgramActionSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";

import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useAdmissions from "../../useHooks";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";

const AdmissionCampaignsListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Code",
    "Title",
    "Type",
    "Campus",
    "Fee Due Date",
    "Class Start Date",
    "Program Level",
    "Status",
    "Action",
  ];
  const { hasAccess } = useStore();

  const { getAdmissionCampaigns, deleteAdmissionCampaign } = useAdmissions();
  const { handleSearchChange, handleTableSearch } = useUtils();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const { getDateFromDateTime } = useUtils();

  const goToCreateAdmissionCampaign = () => {
    navigate(siteRoutes.createAdmissionCampaign);
  };

  useEffect(() => {
    getAllAdmissionCampaigns(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteAdmissionCampaign(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllAdmissionCampaigns(page + 1, search);
  };
  const getAllAdmissionCampaigns = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getAdmissionCampaigns(setData, queryParams, setPagination);
  };

  const goToAdmissionProgram = (program: any) => {
    const { id: admission_session_id, certificate_level_id: level_id} = program;
    navigate(`${siteRoutes.programListing}?admission_session_id=${admission_session_id}&level_id=${level_id}`);
  };
  return (
    <AdmissionCampaignListingMain>
      <AdmissionCampaignListingTop>
        <div className="left">
          <span className="page-heading">Admission Campaigns</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createAdmissionCampaign) && (
            <div className="create-org-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToCreateAdmissionCampaign}
              >
                + Add New
              </button>
            </div>
          )}
        </div>
      </AdmissionCampaignListingTop>

      <AdmissionCampaignListingSection className="content-radius-shadow">
        <div className="list-header">
          <div className="table-data-export-buttons">
            {hasAccess(sitePermissions.downloadAdmissionCampaignPDF) && (
              <div className="export-btn">
                <span>
                  <PdfSvg className="icon" />
                </span>
                <span className="text">PDF</span>
              </div>
            )}

            {hasAccess(sitePermissions.downloadAdmissionCampaignExcel) && (
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
                handleSearchChange(e, setSearch, getAllAdmissionCampaigns)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllAdmissionCampaigns)}
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
                    <td>{item?.code}</td>
                    <td>{item?.title}</td>
                    <td>{item?.session?.title}</td>
                    <td>{item?.category?.title}</td>
                    <td>{getDateFromDateTime(item?.min_fee_due_date)}</td>
                    <td>{getDateFromDateTime(item?.max_class_start_date)}</td>
                    <td>{item?.certificate?.title}</td>
                    <td>
                      {item?.has_active_status ? (
                        <span className="status-tile">Active</span>
                      ) : (
                        <span className="status-tile red">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="table-action-icons">
                        {hasAccess(
                          sitePermissions.admissionCampaignLinkProgram
                        ) && (
                          <div className="action-icon">
                            <ProgramActionSvg
                              onClick={() => goToAdmissionProgram(item)}
                            />
                          </div>
                        )}

                        {hasAccess(sitePermissions.deleteAdmissionCampaign) && (
                          <div
                            className="action-icon"
                            onClick={() => handleDelete(item?.id)}
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
      </AdmissionCampaignListingSection>
    </AdmissionCampaignListingMain>
  );
};

export default AdmissionCampaignsListing;
