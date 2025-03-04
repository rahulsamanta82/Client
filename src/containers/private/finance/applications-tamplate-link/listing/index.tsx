import { FC, Fragment, useEffect, useState } from "react";
import {
  ApplicationTemplateListingSection,
  ApplicationTemplateListingMain,
  ApplicationTemplateListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import useUtils from "hooks/useUtils";
import { ApplicationTemplateLinkDTO } from "utils/helpers/models/finance/application-template-link.dto";
import useFinance from "../../useHooks";

interface ApplicationTemplateLinkListingProps {}

const ApplicationTemplateLinkListing: FC<
  ApplicationTemplateLinkListingProps
> = ({}) => {
  const navigate = useNavigate();
  const columns: string[] = ["Application", "Programs", "Template", "Action"];

  const { hasAccess } = useStore();

  const goToCreateTemplateLink = () => {
    navigate(siteRoutes.createApplicationTemplateLink);
  };

  const { getApplicationTemplateLinks, deleteApplicationTemplateLink } =
    useFinance();
  const [data, setData] = useState<ApplicationTemplateLinkDTO[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState<string>("");

  const { handleSearchChange, handleTableSearch } = useUtils();

  useEffect(() => {
    getAllApplicationsTemplateLinks(pagination.page, search);
  }, []);

  const handleDelete = async (id: number) => {
    const response = await confirmationPopup();
    if (response.isConfirmed) {
      const queryParams = {
        page: 1,
        per_page: pagination.per_page,
      };
      deleteApplicationTemplateLink(id, setData, queryParams, setPagination);
    }
  };

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
    getAllApplicationsTemplateLinks(page + 1, search);
  };
  const getAllApplicationsTemplateLinks = (page: number, search: string) => {
    const queryParams = {
      per_page: pagination.per_page,
      page,
      search,
    };
    getApplicationTemplateLinks(setData, queryParams, setPagination);
  };

  return (
    <ApplicationTemplateListingMain>
      <ApplicationTemplateListingTop>
        <div className="left">
          <span className="page-heading">Applications Template Link</span>
          <Breadcrumb />
        </div>
        <div className="right">
          {hasAccess(sitePermissions.createApplicationTemplateLink) && (
            <div className="create-fine-slot-btn">
              <button
                className="lg-rounded-btn"
                onClick={goToCreateTemplateLink}
              >
                + Link Template
              </button>
            </div>
          )}
        </div>
      </ApplicationTemplateListingTop>

      <ApplicationTemplateListingSection className="content-radius-shadow">
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
                handleSearchChange(
                  e,
                  setSearch,
                  getAllApplicationsTemplateLinks
                )
              }
              onKeyUp={(e) =>
                handleTableSearch(e, getAllApplicationsTemplateLinks)
              }
            />
          </div>
        </div>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {columns?.map((column: string, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((templateLink, index) => {
                return (
                  <tr key={index}>
                    <td>{templateLink.application?.title ?? "-"}</td>
                    <td>{templateLink?.program_title}</td>
                    <td>{templateLink?.template_header?.title ?? "-"}</td>
                    <td>
                      <div className="table-action-icons">
                        <div
                          className="action-icon"
                          onClick={() => handleDelete(templateLink.id)}
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
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </ApplicationTemplateListingSection>
    </ApplicationTemplateListingMain>
  );
};

export default ApplicationTemplateLinkListing;
