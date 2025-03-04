import { FC, Fragment, useState, useEffect } from "react";
import {
  AddTablSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  FrameworkDocumentTypeListingMain,
  FrameworkDocumentTypeListingSection,
  FrameworkDocumentTypeListingTop,
} from "./style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const FrameworkDocumentTypeListing: FC = () => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Organization", "Action"];

  const navigate = useNavigate();
  const goToCreateFramworkDocumentType = () => {
    navigate(siteRoutes.createFrameworkDocumentType);
  };

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Framework Documents Types",
      path: siteRoutes.frameworkDocumentTypeList,
    },
  ];
  return (
    <FrameworkDocumentTypeListingMain>
      <FrameworkDocumentTypeListingTop>
        <div className="left">
          <span className="page-heading">Legal Framework Documents Types </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateFramworkDocumentType}
            >
              + Add New
            </button>
          </div>
        </div>
      </FrameworkDocumentTypeListingTop>

      <FrameworkDocumentTypeListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Federal Law</div>
                  </td>
                  <td>National Assembly Pakistan</td>

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
      </FrameworkDocumentTypeListingSection>
    </FrameworkDocumentTypeListingMain>
  );
};

export default FrameworkDocumentTypeListing;
