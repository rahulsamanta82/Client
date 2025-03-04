import { FC, Fragment, useState, useEffect } from "react";
import {
  AddTablSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadTableActionSvg,
  DownloadTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  SurveyTypeListingMain,
  SurveyTypeListingSection,
  SurveyTypeListingTop,
} from "./style";

import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const SurveyTypeListing: FC = () => {
  const [search, setSearch] = useState("");

  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Serial No",
    "Name",
    "Conducted",
    "Filled By",
    "RelationShip",
    "Performa",
    "Status",
    "Action",
  ];

  const toggleFilterDropdown = () => {
    setOpenFilterDropdown(!openFilterDropdown);
  };
  const navigate = useNavigate();
  const goToCreateSurveyType = () => {
    navigate(siteRoutes.createSurveyType);
  };

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Survey Types", path: siteRoutes.surveyTypeListing },
  ];
  return (
    <SurveyTypeListingMain>
      <SurveyTypeListingTop>
        <div className="left">
          <span className="page-heading">Survey Listing</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button className="lg-rounded-btn" onClick={goToCreateSurveyType}>
              + Add New Type
            </button>
          </div>
        </div>
      </SurveyTypeListingTop>

      <SurveyTypeListingSection className="content-radius-shadow">
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
                    <div className="mw-150">1</div>
                  </td>
                  <td>
                    <div className="mw-100">Fall somethinfg</div>
                  </td>
                  <td>
                    <div className="mw-100">Department of Islamic</div>
                  </td>
                  <td>
                    <div className="mw-150">Dawah and Islamic Culture</div>
                  </td>
                  <td>
                    <div className="mw-150">ISL-234321</div>
                  </td>
                  <td>3</td>

                  <td>
                    <span className="status-tile green">Active</span>
                  </td>
                  <td>
                    <div className="table-action-icons">
                      <div className="action-icon">
                        <AddTablSvg />
                      </div>
                      <div className="action-icon">
                        <DownloadTableSvg />
                      </div>

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
      </SurveyTypeListingSection>
    </SurveyTypeListingMain>
  );
};

export default SurveyTypeListing;
