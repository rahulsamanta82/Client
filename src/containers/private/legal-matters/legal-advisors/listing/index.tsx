import { FC, Fragment, useState, useEffect } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
  TableBlackRightArrowSvg,
  TableDownloadPrimarySvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  LegalCasesListingMain,
  LegalCasesListingSection,
  LegalCasesListingTop,
  FilterHeader,
  Filters,
  FilterSection,
} from "./style";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import useAdmissions from "../../../admissions/useHooks";
import useUtils from "hooks/useUtils";
import DataNotFound from "components/particles/table/data-not-found";
import { useSelector } from "react-redux";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";

interface AdmissionStudentListingProps {}

const LegalAdvisorListing: FC<AdmissionStudentListingProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [openFilterDropdown, setOpenFilterDropdown] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Name",
    "CNIC",
    "Type",
    "Category",
    "License No.",
    "Mobile",
    "Email",
    "Adrress",
    "Is Active",

    "Action",
  ];

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Advisors ",
      path: siteRoutes.legalAdvisorListing,
    },
  ];
  const navigate = useNavigate();
  const goToCreateLegalAdvisors = () => {
    navigate(siteRoutes.createLegalAdvisor);
  };
  return (
    <LegalCasesListingMain>
      <LegalCasesListingTop>
        <div className="left">
          <span className="page-heading">Legal Advisors</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
        <div className="right">
          <div className="download-list-button">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateLegalAdvisors}
            >
              + Add New
            </button>
          </div>
        </div>
      </LegalCasesListingTop>

      <LegalCasesListingSection className="content-radius-shadow">
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
            <input type="search" placeholder="Search" value={search} />
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
                  <td>1</td>
                  <td>2024-07-12</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>Lorem ipsum dolor sit amet consecte</td>
                  <td>ordinary</td>
                  <td>1</td>
                  <td>2024-07-12</td>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </td>
                  <td>
                    <span className="status-tile green">Yes</span>
                  </td>

                  <td>
                    <div className="table-action-icons">
                      <div className="action-icons">
                        <EditTableSvg />
                      </div>
                      <div className="action-icons">
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
      </LegalCasesListingSection>
    </LegalCasesListingMain>
  );
};

export default LegalAdvisorListing;
