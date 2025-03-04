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
  RemunerationSettingsListingMain,
  RemunerationSettingsListingSection,
  RemunerationSettingsListingTop,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";
import EditBalance from "./components/settings-modal";
import SettingModal from "./components/settings-modal";

const RemunerationSettingsListing: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Action"];

  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    {
      title: "Remuneration Settings",
      path: siteRoutes.remunerationSettingsListing,
    },
  ];
  const navigate = useNavigate();

  const [openSetting, setOpenSetting] = useState<boolean>(false);

  const goToSettings = () => {
    setOpenSetting(true);
  };

  return (
    <RemunerationSettingsListingMain>
      <RemunerationSettingsListingTop>
        <div className="left">
          <span className="page-heading">Remuneration Settings</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </RemunerationSettingsListingTop>

      <RemunerationSettingsListingSection className="content-radius-shadow">
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
              {[1, 1, 1].map((item: any, index: number) => (
                <Fragment key={index}>
                  <tr>
                    <td>
                      <div className="mw-150">
                        Advisor Health Projects / Consultant Health Projects
                      </div>
                    </td>
                    <td>
                      <div className="table-action-buttons">
                        <div
                          className="table-action-button"
                          onClick={goToSettings}
                        >
                          <button className="green">Settings</button>
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
          {/* <DataNotFound show /> */}
          <Pagination
            onPageChange={(page: any) => console.log(page)}
            {...pagination}
          />
          {openSetting && <SettingModal setOpen={setOpenSetting} />}
        </Fragment>
      </RemunerationSettingsListingSection>
    </RemunerationSettingsListingMain>
  );
};

export default RemunerationSettingsListing;
