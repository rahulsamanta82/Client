import { FC, Fragment, useEffect, useState } from "react";
import {
  AcademicSessionListingSection,
  AcademicSessionListingTop,
  AcademicSessionListingMain,
} from "./style";
import {
  DownloadApplicationSvg,
  DownloadChallanSvg,
  DownloadDocumentSvg,
  PrintGreenSvg,
  TabPrimaryActionMenu,
  UploadChallanSvg,
} from "assets/images/common/svgs";
import Breadcrumb from "components/particles/breadcrumb";
import { JobApplicationDTO } from "utils/helpers/models/e-portal/job-application.dto";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useEportal from "../../useHooks";
import DataNotFound from "components/particles/table/data-not-found";

interface AcademicSessionListingProps { }

const AppliedJobsListing: FC<AcademicSessionListingProps> = ({ }) => {
  const navigate = useNavigate();
  const { getJobApplications, deleteJobApplication } = useEportal();
  const [data, setData] = useState<JobApplicationDTO[]>([]);
  const { isLoading } = useSelector((state: any) => state.sharedReducer);
  const columns: string[] = [
    "Batch",
    "Job Post",
    "Department",
    "Job Type  ",
    "Campus",
    "Date Applied",
    "Closing Date",
    "Challan Status",
    "Action",
  ];

  const toggleRowExpand = (index: number) => {
    (data as any)[index].isDropdownOpen = !(data as any)[index].isDropdownOpen;
    setData([...data]);
  };

  useEffect(() => {
    getJobApplications(setData);
  }, []);

  return (
    <AcademicSessionListingMain>
      <AcademicSessionListingTop>
        <div className="left">
          <span className="page-heading">Applied Jobs</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </AcademicSessionListingTop>
      <AcademicSessionListingSection
        className="content-radius-shadow"
        isTableOverflowing={false}
      >
        <div>
          <span className="table-heading">General Information </span>
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
              {data.map((application, index) => {
                return (
                  <Fragment key={index}>
                    <tr
                      className={`expandable ${(application as any).isExpanded && "opened"
                        }`}
                    >
                      <td>IPB-368</td>
                      <td>
                        <div className="mw-150">Assistant Director IT</div>
                      </td>
                      <td>Registrar’s Office</td>
                      <td>Contract</td>
                      <td>Bahawalpur (Main Campus)</td>
                      <td>10-02-2019</td>
                      <td>10-02-2019</td>
                      <td>Paid</td>
                      <td>
                        <div className="table-action-icons">
                          <div className="action-menu">
                            <div
                              className="menu-icon"
                              onClick={() => toggleRowExpand(index)}
                            >
                              <TabPrimaryActionMenu className="icon" />
                            </div>
                            {(application as any).isDropdownOpen && (
                              <div className="table-menu-dropdown">
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <PrintGreenSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Print Application
                                  </span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <DownloadApplicationSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Download Application
                                  </span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <DownloadDocumentSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Download Document
                                  </span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <DownloadChallanSvg className="icon" />
                                  </div>
                                  <span className="title">
                                    Download Challan
                                  </span>
                                </div>
                                <div className="particular-menu cp">
                                  <div className="action-icon">
                                    <UploadChallanSvg className="icon" />
                                  </div>
                                  <span className="title">Upload Challan</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <Fragment>
          <DataNotFound show={!data.length && !isLoading} />
        </Fragment>
      </AcademicSessionListingSection>
    </AcademicSessionListingMain>
  );
};

export default AppliedJobsListing;
