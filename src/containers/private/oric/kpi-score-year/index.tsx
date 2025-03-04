import { FC, Fragment, useState } from "react";
import {
  CallTableSvg,
  DeleteTableSvg,
  DownArrowLightgrayMediumSvg,
  DownloadPrimaryTableSvg,
  EditGreenTableSvg,
  EditTableSvg,
  ExcelSvg,
  MessageTableSvg,
  PdfSvg,
  SearchFieldSvg,
  TabPrimaryActionMenu,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
  KPIScoreYearMain,
  KPIScoreYearSection,
  KPIScoreYearTop,
} from "./style";
import useComponentVisible from "hooks/click-outside";
import useStore from "hooks/useStore";
import { sitePermissions } from "utils/helpers/enums/permissions.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { Navigate, useNavigate } from "react-router-dom";

const KPIScore: FC = ({}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([{ isExpanded: false }]);

  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = [
    "Sr No.",
    "Key Performance Indicator",
    "Score Assigned",
    "Score Gained",
  ];

  const WorkEnviroment: string[] = ["Sr No.", "Question", "Score"];
  const  Research: string[] = ["Sr No.", "Question", "Score"];
  const Capacity: string[] = ["Sr No.", "Question", "Score"];

  const Commercialization: string[] = ["Sr No.", "Question", "Score"];
 
  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    {
      title: "Key Performance Indicator Year /",
      path: siteRoutes.keyPerformanceIndicatorYearListing,
    },
    { title: "KPI Score For Year 2022", path: siteRoutes.oricKPIScore },
  ];

  return (
    <KPIScoreYearMain>
      <KPIScoreYearTop>
        <div className="left">
          <span className="page-heading">KPI Score For Year 2022</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </KPIScoreYearTop>
      <KPIScoreYearSection className="content-radius-shadow">
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
                    <div className="mw-150">
                      Work Environment and Human Resource
                    </div>
                  </td>
                  <td>
                    <div className="mw-150">10</div>
                  </td>
                  <td>
                    <div className="mw-150">9</div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>
      </KPIScoreYearSection>
      {/* section-2 */}
      <KPIScoreYearSection className="content-radius-shadow">
        <span className="tableHeading">
          1. Work Enviroment and Human Resource (Max Marks : 10)
        </span>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {WorkEnviroment.map((column: string, index: number) => {
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
                    <div className="mw-150">
                      Availability of Human Resource as per Requirement
                    </div>
                  </td>
                  <td>
                    <div className="input-field">
                      <div className="field-wrap">
                        <div className="field">
                          <input type="number"/>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>
      </KPIScoreYearSection>
         {/* section-3 */}
      <KPIScoreYearSection className="content-radius-shadow">
        <span className="tableHeading">
          2. Research Support (Max Marks : 40)
        </span>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {Research.map((column: string, index: number) => {
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
                    <div className="mw-150">
                      Total Number of Research Proposals approved for funding
                      (HEC and Non-HEC)
                    </div>
                  </td>
                  <td>
                    <div className="input-field">
                      <div className="field-wrap">
                        <div className="field">
                          <input type="number"/>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>
      </KPIScoreYearSection>
  {/* section-4 */}
      <KPIScoreYearSection className="content-radius-shadow">
        <span className="tableHeading">
          3. Capacity Building (Max Marks : 15)
        </span>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {Capacity.map((column: string, index: number) => {
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
                    <div className="mw-150">
                      Five-Year Strategic plan approved from ORIC Steering committe and duly submitted to HEC
                    </div>
                  </td>
                  <td>
                    <div className="input-field">
                      <div className="field-wrap">
                        <div className="field">
                          <input type="number"/>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>
      </KPIScoreYearSection>
  {/* section-5 */}
      <KPIScoreYearSection className="content-radius-shadow">
        <span className="tableHeading">
          4. Commercialization of Research (Max Marks : 35)
        </span>
        <div className="data-table">
          <table className="bottom-bordered-cells">
            <thead>
              <tr>
                {Commercialization.map((column: string, index: number) => {
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
                    <div className="mw-150">
                   Research/IP/Commercialization Policy Status
                    </div>
                  </td>
                  <td>
                    <div className="input-field">
                      <div className="field-wrap">
                        <div className="field">
                          <input type="number"/>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            </tbody>
          </table>
        </div>
      </KPIScoreYearSection>
    </KPIScoreYearMain>
  );
};

export default KPIScore;
