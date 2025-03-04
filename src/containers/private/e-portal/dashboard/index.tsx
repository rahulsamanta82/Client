import { FC } from "react";
import {
  EportalDashboardMain,
  EportalDashboardTop,
  EportalFeatures,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import {
  AdmissionSvg,
  CareerSvg,
  ChallanSvg,
  HostelSvg,
  MobileProfileSvg,
  ShortCoursesSvg,
  TestingServiceSvg,
  VoucherSvg,
} from "assets/images/e-portal/svgs";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface EportalDashboardProps {}

const EportalDashboard: FC<EportalDashboardProps> = ({}) => {
  const features = [
    {
      title: "User Profile",
      icon: MobileProfileSvg,
      link: siteRoutes.viewEportalProfile,
    },
    {
      title: "Generate Challan",
      icon: ChallanSvg,
      link: siteRoutes.ePortalChallanListing,
    },
    {
      title: "Generate Vouchers",
      icon: VoucherSvg,
      link: siteRoutes.ePortalMyVouchers,
    },
    {
      title: "Careers",
      icon: CareerSvg,
      link: siteRoutes.eportalCareersListing,
    },
    {
      title: "Admission",
      icon: AdmissionSvg,
      link: siteRoutes.eportalAdmissionsListing,
    },
    {
      title: "Testing Service",
      icon: TestingServiceSvg,
      link: "/private/e-portal/user-profile",
    },
    {
      title: "Hostel",
      icon: HostelSvg,
      link: siteRoutes.eportalHostelPortal,
    },
    {
      title: "Short Courses",
      icon: ShortCoursesSvg,
      link: siteRoutes.ePortalShortCoursesListing,
    },
  ];
  const navigate = useNavigate();
  return (
    <EportalDashboardMain>
      <EportalDashboardTop>
        <div className="left">
          <span className="page-heading">Eportal Home</span>
          <Breadcrumb />
        </div>
      </EportalDashboardTop>
      <EportalFeatures>
        {features.map((item: any, index: number) => {
          const Icon = item.icon;
          return (
            <div
              className="particular-feature"
              key={index}
              onClick={() => navigate(item.link)}
            >
              <div className="inner-content">
                <div className="feature-icon">
                  <Icon className="icon" />
                </div>
                <div className="feature-text">
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </EportalFeatures>
    </EportalDashboardMain>
  );
};

export default EportalDashboard;
