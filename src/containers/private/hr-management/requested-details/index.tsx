import { FC, Fragment, useEffect, useState } from "react";
import {
  ApprovedSvg,
  DeleteTableSvg,
  EditTableSvg,
  ExcelSvg,
  InitiateSvg,
  PdfSvg,
  PrimaryBulletSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { OvertimeSlotsListingMain, OvertimeSlotsListingTop } from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useNavigate } from "react-router-dom";
import DataNotFound from "components/particles/table/data-not-found";
import useUtils from "hooks/useUtils";

const RequestedDetails: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const columns: string[] = ["Name", "Employees", "Action"];
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: siteRoutes.hrManagementLeaveDashboard },
    { title: "Leaves Ledger /", path: "" },
    { title: "Request Details", path: siteRoutes.requestDetails },
  ];
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate(siteRoutes.createOvertimeSlot);
  };
  // Simulate progress increase
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 10 : 100
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <OvertimeSlotsListingMain>
      <OvertimeSlotsListingTop>
        <div className="left">
          <span className="page-heading">Request Details</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </OvertimeSlotsListingTop>
      <div className="info-card-main">
        <div className="content-radius-shadow">
          <div className="info-heading">Requester Information</div>
          <div className="info-containers">
            <div className="info-main">
              <div className="info-title">Requester</div>
              <div className="info-value">Hassaan Mustafa (Programmer)</div>
            </div>
            <div className="info-main">
              <div className="info-title">Department</div>
              <div className="info-value">Directorate of IT</div>
            </div>
            <div className="info-main">
              <div className="info-title">Request Date&Time</div>
              <div className="info-value">09/09/2024 ( 1:32 )</div>
            </div>
            <div className="info-main">
              <div className="info-title">Initiated By</div>
              <div className="info-value">Hassaan Mustafa</div>
            </div>
          </div>
        </div>

        <div className="content-radius-shadow">
          <div className="info-heading">Leave Request Details</div>
          <div className="info-containers">
            <div className="info-main">
              <div className="info-title">From Date</div>
              <div className="info-value">2024-09-09</div>
            </div>
            <div className="info-main">
              <div className="info-title">Total Days</div>
              <div className="info-value">1</div>
            </div>
            <div className="info-main">
              <div className="info-title">Paid Status</div>
              <div className="info-value">Paid</div>
            </div>
            <div className="info-main">
              <div className="info-title">End Date</div>
              <div className="info-value">2024-09-09</div>
            </div>
            <div className="info-main">
              <div className="info-title">Leave Type</div>
              <div className="info-value">Casual Leave</div>
            </div>
            <div className="info-main">
              <div className="info-title">App Status</div>
              <div className="info-value">Approved</div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-radius-shadow">
        <div className="info-heading">Request History</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>

        <div className="timeline-main">
          <div className="main-container">
            <div>
              <ApprovedSvg />
              <div className="green-bar-main">
                <span className="green-bar"></span>
              </div>
            </div>
            <div>
              <span className="approved">Approved</span>
              <div className="info-container">
                <div className="info-main">
                  <div className="info-title">Action taken by</div>
                  <div className="info-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
                <div className="info-main">
                  <div className="info-title">Date & Time</div>
                  <div className="info-value">09/09/2024 ( 1:32 )</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Action</div>
                  <div className="status">Approved</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Remarks</div>
                  <div className="info-value">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div>
              <PrimaryBulletSvg className="bullet" />
              <div className="green-bar-main">
                <span className="primary-bar"></span>
              </div>
            </div>
            <div>
              <span className="recommend">Recommended</span>
              <div className="info-container">
                <div className="info-main">
                  <div className="info-title">Action taken by</div>
                  <div className="info-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
                <div className="info-main">
                  <div className="info-title">Date & Time</div>
                  <div className="info-value">09/09/2024 ( 1:32 )</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Action</div>
                  <div className="status">Approved</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Remarks</div>
                  <div className="info-value">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
                <div className="info-main">
                  <div className="auth-title">Next Authority</div>
                  <div className="auth-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div>
              <PrimaryBulletSvg className="bullet" />
              <div className="green-bar-main">
                <span className="primary-bar"></span>
              </div>
            </div>
            <div>
              <span className="recommend">Recommended</span>
              <div className="info-container">
                <div className="info-main">
                  <div className="info-title">Action taken by</div>
                  <div className="info-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
                <div className="info-main">
                  <div className="info-title">Date & Time</div>
                  <div className="info-value">09/09/2024 ( 1:32 )</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Action</div>
                  <div className="status">Approved</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Remarks</div>
                  <div className="info-value">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
                <div className="info-main">
                  <div className="auth-title">Next Authority</div>
                  <div className="auth-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-container">
            <div>
              <InitiateSvg />
              <div className="green-bar-main">
                <span className="red-bar"></span>
              </div>
            </div>
            <div>
              <span className="initiate">Initiated By</span>
              <div className="info-container">
                <div className="info-main">
                  <div className="info-title">Action taken by</div>
                  <div className="info-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
                <div className="info-main">
                  <div className="info-title">Date & Time</div>
                  <div className="info-value">09/09/2024 ( 1:32 )</div>
                </div>
                <div className="info-main">
                  <div className="info-title">Action</div>
                  <span className="status">Approved</span>
                </div>
                <div className="info-main">
                  <div className="info-title">Remarks</div>
                  <div className="info-value">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
                <div className="info-main">
                  <div className="auth-title">Next Authority</div>
                  <div className="auth-value">
                    Dr. Rizwan Majeed (Director IT )
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OvertimeSlotsListingMain>
  );
};

export default RequestedDetails;
