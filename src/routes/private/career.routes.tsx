import CreateAdvertisement from "containers/private/careers/advertisement/create";
import AdvertisementListing from "containers/private/careers/advertisement/listing";
import CareerApplicantListing from "containers/private/careers/applicants";
import CreateDesignation from "containers/private/careers/designation/create";
import DesignationListing from "containers/private/careers/designation/listing";
import CreatePostTemplate from "containers/private/careers/post-templates/create";
import PostTemplateListing from "containers/private/careers/post-templates/listing";
import CreatePost from "containers/private/careers/post/create";
import PostListing from "containers/private/careers/post/listing";
import ApplicantListing from "containers/private/hostel/applicant-management/listing";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const CareerRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path="designation-management/career-designation-listing"
        Component={DesignationListing}
      />
      <Route
        path="designation-management/create-career-designation"
        Component={CreateDesignation}
      />
      <Route
        path="/advertisement-management/career-advertisement-listing"
        Component={AdvertisementListing}
      />
      <Route
        path="/advertisement-management/create-career-advertisement"
        Component={CreateAdvertisement}
      />
      <Route
        path="/post-template-management/post-template-listing"
        Component={PostTemplateListing}
      />
      <Route
        path="post-template-management/create-post-template"
        Component={CreatePostTemplate}
      />
      <Route
        path="/post-management/career-post-listing"
        Component={PostListing}
      />
      <Route
        path="/post-management/create-career-post"
        Component={CreatePost}
      />
      <Route
        path="/applicant-management/career-applicant-listing"
        Component={CareerApplicantListing}
      />
    </Routes>
  );
};

export default CareerRoutes;
