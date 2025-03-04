import { FC, useState } from "react";
import {
  CreateLegalCourtsTop,
  CreateLegalCourtsSection,
  CreateLegalCourtsMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLegalCourts: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Legal Courts /", path: siteRoutes.legalCasesList },
    { title: "Add Legal Court", path: siteRoutes.createLegalCourt },
  ];
  return (
    <CreateLegalCourtsMain>
      <CreateLegalCourtsTop>
        <div className="heading">
          <span className="page-heading">Add Legal Courts</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLegalCourtsTop>

      <CreateLegalCourtsSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Title </label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Description</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateLegalCourtsSection>
    </CreateLegalCourtsMain>
  );
};

export default CreateLegalCourts;
