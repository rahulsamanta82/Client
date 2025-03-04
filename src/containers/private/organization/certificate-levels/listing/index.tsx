import { FC, Fragment, useEffect, useState } from "react";
import {
  CertificateLevelListingMain,
  CertificateLevelListingSection,
  CertificateLevelListingTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import { DropdownMain } from "components/particles/forms/multiselect-dropdown/style";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useOrganization from "../../useHooks";

interface AdmissionDocumentsMasterListingProps {}

const CertificateLevelListing: FC<
  AdmissionDocumentsMasterListingProps
> = () => {
  const columns: string[] = [
    "Title",
    "Display Order",
    "Short Code",
    "Offered Program",
    "Qualification List",
    "Status",
    "Action",
  ];

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };
  const navigate = useNavigate();

  const goToCreateCertificateLevels = () => {
    navigate(siteRoutes.createCertificateLevels);
  };
  const { getCertificateLevelsSuper } = useOrganization();
  const [certificateLevel, setCertificateLevel] = useState<any[]>([]);

  useEffect(() => {
    getCertificateLevelsSuper(setCertificateLevel);
  }, []);
  console.log(certificateLevel);

  return (
    <CertificateLevelListingMain>
      <CertificateLevelListingTop>
        <div className="left">
          <span className="page-heading">Certificate Levels </span>
          <Breadcrumb />
        </div>
        <div className="right">
          <div className="add-new-button">
            <button
              className="lg-rounded-btn"
              onClick={goToCreateCertificateLevels}
            >
              + Add Certificate Level
            </button>
          </div>
        </div>
      </CertificateLevelListingTop>

      <CertificateLevelListingSection className="content-radius-shadow">
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
              {certificateLevel?.map((item: any) => {
                return (
                  <tr>
                    <td>{item?.title}</td>
                    <td>{item?.display_order}</td>
                    <td>{item?.short_code ? item?.short_code : "-"}</td>

                    <td className="mw-150">
                      {item?.offer_program === 1 ? (
                        <span className="status-tile green">Yes</span>
                      ) : (
                        <span className="status-tile red">No</span>
                      )}
                    </td>
                    <td>
                      {item?.qualification_list === 1 ? (
                        <span className="status-tile green">Yes</span>
                      ) : (
                        <span className="status-tile red">No</span>
                      )}
                    </td>
                    <td className="">
                      {item?.is_active === 1 ? (
                        <span className="status-tile green">Active</span>
                      ) : (
                        <span className="status-tile red">In-Active</span>
                      )}
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
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <DropdownMain />
        </div>
        <Fragment>
          <Pagination {...pagination} onPageChange={onPageChange} />
        </Fragment>
      </CertificateLevelListingSection>
    </CertificateLevelListingMain>
  );
};

export default CertificateLevelListing;
