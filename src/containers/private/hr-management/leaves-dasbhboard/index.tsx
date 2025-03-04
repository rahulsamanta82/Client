import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC } from "react";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import {
  HRMLeavesDashboardMain,
  HRMLeavesDashboardTopSection,
  QuickInfoCardsContainer,
} from "./style";

interface HRMLeavesDashboardProps {}

const HRMLeavesDashboard: FC<HRMLeavesDashboardProps> = ({}) => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: "" },
    {
      title: "Leave Dashboard",
      path: siteRoutes.hrManagementLeaveDashboard,
    },
  ];

  const quickLinks = [
    {
      title: "Leaves inserted by Establishment",
      value: "3,139",
      bgColor: "#F0F8FF ",
    },
    {
      title: "Total Employees - Leaves inserted",
      value: "5,150",
      bgColor: "#F5F5DC",
    },
    {
      title: "Total Employees - Balanced Released",
      value: "3,139",
      bgColor: "#FAFAD2",
    },
    { title: "Leaves Through System", value: "3,139", bgColor: "#F5FFFA" },
    {
      title: "Leaves Through Leave Coordinators",
      value: "3,139",
      bgColor: "#E0FFFF  ",
    },
    {
      title: "Total Leaves - Self initiated",
      value: "3,139",
      bgColor: "#F0FFF0",
    },
    {
      title: "Approved Leave for Notification",
      value: "3,139",
      bgColor: "#FFFACD ",
    },
    { title: "Notified Leaves", value: "3,139", bgColor: "#FFE4E1" },
  ];
  return (
    <HRMLeavesDashboardMain>
      <HRMLeavesDashboardTopSection>
        <span className="page-heading">Leave Dashboard</span>
        <Breadcrumb links={breadcrumbLinks} />
      </HRMLeavesDashboardTopSection>

      <QuickInfoCardsContainer>
        {quickLinks.map((link, index) => {
          return (
            <div className="particular-card" key={index}>
              <div className="title">{link.title}</div>
              <div className="value">{link.value}</div>
            </div>
          );
        })}
      </QuickInfoCardsContainer>
    </HRMLeavesDashboardMain>
  );
};

export default HRMLeavesDashboard;
