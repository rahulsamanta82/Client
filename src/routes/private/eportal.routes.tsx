import EportalDashboard from "containers/private/e-portal/dashboard";
import EditEPortalProfile from "containers/private/e-portal//profile/edit-profile";
import HostelPortal from "containers/private/e-portal/hostel-portal";
import EPShortCoursesListing from "containers/private/e-portal/short-courses/listing";
import GenerateChallan from "containers/private/e-portal/generate-challan";
import MyVouchers from "containers/private/e-portal/my-vouchers/Index";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import EportalViewProfile from "containers/private/e-portal/profile/view-profile";
import ApplicationList from "containers/private/e-portal/admissions/listing";
import CreateEportalAdmissionsList from "containers/private/e-portal/admissions/create";
import CareerListing from "containers/private/e-portal/careers/career-listing";
import EditEPortalCareer from "containers/private/e-portal/careers/edit-career";
import AppliedJobsListing from "containers/private/e-portal/careers/applied-jobs";
import EportalViewCareerProfile from "containers/private/e-portal/careers/career-profile";

const EportalRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/e-portal-dashboard" Component={EportalDashboard} />
      <Route path="/short-courses-listing" Component={EPShortCoursesListing} />
      <Route path="/user-profile/edit-profile" Component={EditEPortalProfile} />
      <Route path="/my-vouchers" Component={MyVouchers} />
      <Route path="/challan-listing" Component={GenerateChallan} />
      <Route path="/eportal-hostel-portal" Component={HostelPortal} />
      <Route path="/user-profile/view-profile" Component={EportalViewProfile} />
      <Route
        path="/application-list/eportal-application-listing"
        Component={ApplicationList}
      />
      <Route
        path="/application-list/create-eportal-application-list"
        Component={CreateEportalAdmissionsList}
      />
      <Route
        path="/e-portal-career/eportal-career-listing"
        Component={CareerListing}
      />
      <Route
        path="/e-portal-career/create-eportal-career"
        Component={EditEPortalCareer}
      />
      <Route
        path="/e-portal-jobs/eportal-applied-jobs-listing"
        Component={AppliedJobsListing}
      />
      <Route
        path="/career-profile/career-profile-listing"
        Component={EportalViewCareerProfile}
      />
    </Routes>
  );
};

export default EportalRoutes;
