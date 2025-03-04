import { FC, Fragment, useState, useEffect } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  LegalOrganizationListingMain,
  LegalOrganizationListingSection,
  LegalOrganizationListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const LegalOrganizationListing: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");

  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Action"];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateLegalOrganization = () => {
    navigate(siteRoutes.createLegalOrganization);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Document Organizations",
      path: siteRoutes.legalOrganizationList,
    },
  ];
  return (
    <LegalOrganizationListingMain>
      <LegalOrganizationListingTop>
        <div className="left">
          <span className="page-heading">Legal Document Organizations </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateLegalOrganization}
            >
              + Add New
            </button>
          </div>
        </div>
      </LegalOrganizationListingTop>

      <LegalOrganizationListingSection className="content-radius-shadow">
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
              onChange={(e) => setSearch(e.target.value)}
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
              <Fragment>
                <tr>
                  <td>
                    <div className="mw-150">Finance Department Punjab</div>
                  </td>

                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon">
                        <EditTableSvg />
                      </div>

                      <div className="action-icon">
                        <DeleteTableSvg />
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </div>
      </LegalOrganizationListingSection>
    </LegalOrganizationListingMain>
  );
};

export default LegalOrganizationListing;
