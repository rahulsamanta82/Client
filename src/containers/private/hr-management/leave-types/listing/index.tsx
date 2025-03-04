import { FC, Fragment, useEffect, useState } from "react";
import {
  LeaveTypeListingMain,
  LeaveTypeListingSection,
  LeaveTypeListingTop,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  ProgramActionSvg,
  PdfSvg,
  SearchFieldSvg,
  DownloadTableActionSvg,
} from "assets/images/common/svgs";

import Pagination from "components/particles/table/pagination";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const LeaveTypeListing: FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Title",
    "Active",
    "Display Order",
    "Upper Cap",
    "Action",
  ];

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: "" },
    {
      title: "Leave Types",
      path: siteRoutes.leaveTypeListing,
    },
  ];
  const navigate = useNavigate();
  const goToCreateLeaveTypes = () => {
    navigate(siteRoutes.createLeaveTypes);
  };
  return (
    <LeaveTypeListingMain>
      <LeaveTypeListingTop>
        <div className="left">
          <span className="page-heading">Leave Types</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="create-org-btn" onClick={goToCreateLeaveTypes}>
            <button className="lg-rounded-btn">+ Add Leave Type</button>
          </div>
        </div>
      </LeaveTypeListingTop>

      <LeaveTypeListingSection className="content-radius-shadow">
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
              {[1, 1, 1, 1].map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>Casual Leave</td>
                    <td>Yes</td>
                    <td></td>
                    <td>12,223</td>
                    <td>
                      <div className="table-action-icons">
                        <div className="action-icon">
                          <EditTableSvg />
                        </div>
                        <div className="action-icon">
                          <DownloadTableActionSvg />
                        </div>

                        <div className="action-icon">
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
      </LeaveTypeListingSection>
    </LeaveTypeListingMain>
  );
};

export default LeaveTypeListing;
