import { FC, Fragment, useState } from "react";
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
  TestCenterListingMain,
  TestCenterListingSection,
  TestCenterListingTop,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

const ViewApplicants: FC = ({}) => {
  const navigate = useNavigate();

  const { hasAccess } = useStore();
  const [search, setSearch] = useState("");
  const {
    isComponentVisible: isDropdownOpen,
    setIsComponentVisible: setIsDropdownOpen,
    ref: dropdownMenuRef,
  } = useComponentVisible(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "ID",
    "Roll no",
    "Candidate Name",
    "CNIC",
    "Room",
    "Apply Date",
    "Seat No",
    "Slip Published",
    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Testing Services /", path: "" },

    {
      title: "Applicants Seating Plan List",
      path: siteRoutes.viewTestApplicants,
    },
  ];

  return (
    <>
      <TestCenterListingMain>
        <TestCenterListingTop>
          <div className="left">
            <span className="page-heading">Applicants Seating Plan List</span>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
        </TestCenterListingTop>

        <TestCenterListingSection className="content-radius-shadow">
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
                // onKeyUp={handleSearch}
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
                      <div className="mw-100">257704</div>
                    </td>
                    <td>
                      <div className="mw-150">280887</div>
                    </td>
                    <td>
                      <div className="mw-100">Ali Qasim</div>
                    </td>
                    <td>
                      <div className="mw-150">31301-9999999-9</div>
                    </td>
                    <td>
                      <div className="mw-100">
                        Lab 2.06 Faculty of Computing,
                      </div>
                    </td>
                    <td>
                      <div className="mw-150">2024-09-03</div>
                    </td>
                    <td>
                      <div className="mw-100">1</div>
                    </td>
                    <td>
                      <span className="status-tile green">Yes</span>
                    </td>

                    <td>
                      <div className="mw-100">
                        <div className="table-action-icons">
                          <div className="action-icon">
                            <EditTableSvg />
                          </div>

                          <div className="action-icon">
                            <DeleteTableSvg />
                          </div>
                        </div>
                        <div className="action-button">
                          <button className="special-btn">Show Password</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              </tbody>
            </table>
          </div>
          <Fragment>
            <Pagination
              onPageChange={(page: any) => console.log(page)}
              {...pagination}
            />
          </Fragment>
        </TestCenterListingSection>

        {/* section form */}
      </TestCenterListingMain>
    </>
  );
};

export default ViewApplicants;
