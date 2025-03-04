import { FC, Fragment, useEffect, useState } from "react";
import {
  MenusListingMain,
  MenusListingSection,
  MenusListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  ProgramActionSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { confirmationPopup } from "utils/helpers/common/alert-service";
import { useSelector } from "react-redux";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";

const SystemMenusListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const [search, setSearch] = useState("");
  const { getDateFromDateTime } = useUtils();
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const columns: string[] = [
    "Title",
    "Module",

    "Class",
    "Method",
    "Assign To",
    "Status",
    "Action",
  ];

  const goToCreateMenus = () => {
    navigate(siteRoutes.createSystemMenus);
  };
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };

  return (
    <MenusListingMain>
      <MenusListingTop>
        <div className="left">
          <span className="page-heading">Menus</span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="create-org-btn">
            <button className="lg-rounded-btn" onClick={goToCreateMenus}>
              + Add New
            </button>
          </div>
        </div>
      </MenusListingTop>

      <MenusListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" />
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
              <tr>
                <td>Search Bill by CNIC</td>
                <td>Examination</td>
                <td>Search Bill</td>
                <td>search_bill</td>
                <td>Exam bill admin</td>
                <td>
                  {" "}
                  <div className="table-radio-field">
                    <div className="radio">
                      <label>Active</label>
                      <input type="radio" />
                    </div>
                    <div className="radio">
                      <label>De-Active</label>
                      <input type="radio" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-action-icons">
                    <div className="action-icon">
                      <EditTableSvg />
                    </div>
                    <div className="action-icon">
                      <ProgramActionSvg />
                    </div>

                    <div className="action-icon">
                      <DeleteTableSvg />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Fragment>
          <Pagination onPageChange={onPageChange} {...pagination} />
        </Fragment>
      </MenusListingSection>
    </MenusListingMain>
  );
};

export default SystemMenusListing;
