import { FC, Fragment, useEffect, useState } from "react";
import {
  DesignationListingMain,
  DesignationListingSection,
  DesignationListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
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
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useStore from "hooks/useStore";
import useUtils from "hooks/useUtils";
import { JobDesignationDTO } from "utils/helpers/models/careers/designation.dto";
import useCareers from "../../useHooks";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";

const DesignationListing: FC = () => {
  const navigate = useNavigate();
  const { getJobDesignations, deleteJobDesignation } = useCareers();
  const [data, setData] = useState<JobDesignationDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");
  const columns: string[] = ["Title", "BPS", "Action"];

  const { hasAccess } = useStore();
  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllJobDesignations(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteJobDesignation(id, setData, queryParams, setPagination);
    }
  };

  const goToCreateDesignation = () => {
    navigate(siteRoutes.createCareerDesignation);
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllJobDesignations(page + 1, search);
  };
  const getAllJobDesignations = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getJobDesignations(setData, queryParams, setPagination);
  };

  const goToEditJobDesignation = (id: number) => {
    navigate(`${siteRoutes.createCareerDesignation}?id=${id}`);
  }

  return (
    <DesignationListingMain>
      <DesignationListingTop>
        <div className="left">
          <span className="page-heading">Designations</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateDesignation}>
              + Add Designation
            </button>
          </div>
        </div>
      </DesignationListingTop>

      <DesignationListingSection className="content-radius-shadow">
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
                handleSearchChange(e, setSearch, getAllJobDesignations)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllJobDesignations)}
            />          </div>
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
              {data.map((designation, index) => {
                return <tr key={index}>
                  <td>{designation.title}</td>
                  <td>{designation.bps}</td>

                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon" onClick={() => goToEditJobDesignation(designation.id)}>
                        <EditTableSvg />
                      </div>

                      <div className="action-icon" onClick={() => handleDelete(designation.id)}>
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </DesignationListingSection>
    </DesignationListingMain>
  );
};

export default DesignationListing;
