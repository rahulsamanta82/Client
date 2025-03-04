import { FC, Fragment, useState, useEffect } from "react";
import {
  DarkEyeSvg,
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
    CategoryCallListingMain,
    CategoryCallListingSection,
    CategoryCallListingTop,
} from "./style";

import useUtils from "hooks/useUtils";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CategoryCallListing: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const [search, setSearch] = useState("");

  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Call Category Title", "Action"];

  const navigate = useNavigate();
  const goToCreateCategorycalls = () => {
    navigate(siteRoutes.createOricCallCategories);
  };

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Calls /", path: siteRoutes.oricCallListing },
    { title: "Calls Categories", path: siteRoutes.oricCallCategoriesListing },
  ];
  return (
    <CategoryCallListingMain>
      <CategoryCallListingTop>
        <div className="left">
          <span className="page-heading">Calls Categories</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateCategorycalls}
            >
              + Add Call Category
            </button>
          </div>
        </div>
      </CategoryCallListingTop>
      <CategoryCallListingSection className="content-radius-shadow">
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
                    <div className="mw-150">Research Incentive Call</div>
                  </td>

                  <td>
                    <div className="mw-100">
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <DeleteTableSvg />
                        </div>
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
      </CategoryCallListingSection>
    </CategoryCallListingMain>
  );
};

export default CategoryCallListing;
