import { FC, Fragment, useEffect } from "react";
import {
  EligibilityTemplatesListingSection,
  EligibilityTemplatesListingMain,
  EligibilityTemplatesListingTop,
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
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import Breadcrumb from "components/particles/breadcrumb";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useAdmissions from "containers/private/admissions/useHooks";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";

const EligibilityTemplatesListing: FC = () => {
  const columns: string[] = ["Title", "Group Numbers", "Action"];

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllProgramLinkTemplate(page + 1, search);
  };

  const navigate = useNavigate();

  const goToEligibilityTemplateCreate = (
    id: string,
    title: any,
    admission_session_id: string
  ) => {
    navigate(
      `${siteRoutes.eligibilityTemplatesCreate}?id=${id}&title=${title}&admission_session_id=${admission_session_id}`
    );
  };

  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const { handleTableSearch, handleSearchChange } = useUtils();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);

  const { getProgramLinkTemplate, deleteProgramLinkTemplate } = useAdmissions();

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
        admission_session_id: params.admission_session_id,
      };

      deleteProgramLinkTemplate(id, setData, queryParams, setPagination);
    }
  };

  const getAllProgramLinkTemplate = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
      admission_session_id: params.admission_session_id,
    };

    getProgramLinkTemplate(
      setData,
      { ...queryParams, program_id: params?.id },
      setPagination
    );
  };

  useEffect(() => {
    getAllProgramLinkTemplate(pagination.page, search);
  }, []);

  return (
    <EligibilityTemplatesListingMain>
      <EligibilityTemplatesListingTop>
        <div className="left">
          <span className="page-heading">Eligibility Templates </span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="action-buttons">
            <button
              onClick={() =>
                goToEligibilityTemplateCreate(
                  params.id,
                  params.title,
                  params.admission_session_id
                )
              }
              className="lg-rounded-btn"
            >
              + Add New
            </button>
          </div>
        </div>
      </EligibilityTemplatesListingTop>

      <EligibilityTemplatesListingSection className="content-radius-shadow">
        <div className="">
          <span className="table-heading">
            {decodeURIComponent(params?.title)}
          </span>
          <hr className="hr" />
        </div>
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
                handleSearchChange(e, setSearch, getAllProgramLinkTemplate)
              }
              onKeyUp={(e) => handleTableSearch(e, getAllProgramLinkTemplate)}
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
                    <td>{item.template?.title}</td>

                    <td>{item?.group_number}</td>

                    <td>
                      <div className="table-action-icons">
                        {/* <div className="action-icon">
                          <EditTableSvg />
                        </div> */}

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
      </EligibilityTemplatesListingSection>
    </EligibilityTemplatesListingMain>
  );
};

export default EligibilityTemplatesListing;
