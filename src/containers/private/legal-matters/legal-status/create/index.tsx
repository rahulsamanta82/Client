import { FC, useState } from "react";
import {
  CreateLegalStatusTop,
  CreateLegalStatusSection,
  CreateLegalStatusMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLegalStatus: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Legal Status /", path: siteRoutes.legalStatusList },
    { title: "Add Legal Status", path: siteRoutes.createLegalStatus },
  ];
  return (
    <CreateLegalStatusMain>
      <CreateLegalStatusTop>
        <div className="heading">
          <span className="page-heading">Add Legal Status</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLegalStatusTop>

      <CreateLegalStatusSection className="content-radius-shadow">
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
          <div className="input-field">
            <label>Main Category</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Main Category</option>
                </select>
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
      </CreateLegalStatusSection>
    </CreateLegalStatusMain>
  );
};

export default CreateLegalStatus;
