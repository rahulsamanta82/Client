import { FC, Fragment, useState } from "react";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  OvertimeSlotsListingMain,
  OvertimeSlotsListingSection,
  OvertimeSlotsListingTop
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";

const OvertimeSlotsListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Employees", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Overtime Slots", path: siteRoutes.overtimeSlotsListing },
  ];
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate(siteRoutes.createOvertimeSlot);
  };

  return (
    <OvertimeSlotsListingMain>
      <OvertimeSlotsListingTop>
        <div className="left">
          <span className="page-heading">Overtime Slots</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button className="lg-rounded-btn" onClick={goToCreate}>
              + Add New Slot
            </button>
          </div>
        </div>
      </OvertimeSlotsListingTop>

      <OvertimeSlotsListingSection className="content-radius-shadow">
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
              {[].map((item: any, index: number) => (
                <Fragment key={index}>
                  <tr>
                    <td>
                      300100001fafsdgwrc
                    </td>
                    <td>
                      <div className="mw-100">
                        Mr. Nazir Ahmed
                      </div>
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
              ))}
            </tbody>
          </table>
        </div>

        <Fragment>
          <DataNotFound show />
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
        </Fragment>
      </OvertimeSlotsListingSection>
    </OvertimeSlotsListingMain>
  );
};

export default OvertimeSlotsListing;
