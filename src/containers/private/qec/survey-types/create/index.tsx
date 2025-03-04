import { FC, useState } from "react";
import {
  CreateSurveyTypesTop,
  CreateSurveyTypesFormSection,
  CreateSurveyTypesMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateSurveyTypes: FC = () => {
  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Survey Types /", path: siteRoutes.surveyTypeListing },
    { title: "Add Survey Types", path: siteRoutes.createSurveyType },
  ];
  return (
    <CreateSurveyTypesMain>
      <CreateSurveyTypesTop>
        <div className="heading">
          <span className="page-heading">Add Survey Type </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateSurveyTypesTop>

      <CreateSurveyTypesFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Upload</label>
            <div className="upload-container">
              <div className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                  Choose a file
                </label>
                <input type="file" id="file-upload" className="file-input" />
              </div>

              <div className="file-details-section" id="file-details">
                <p className="file-placeholder">No file chosen</p>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Performa</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Meeting Title" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label>Survey Team</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Survey Team</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Filled By</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Person</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Relation</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Relation</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Active</option>
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
      </CreateSurveyTypesFormSection>
    </CreateSurveyTypesMain>
  );
};

export default CreateSurveyTypes;
