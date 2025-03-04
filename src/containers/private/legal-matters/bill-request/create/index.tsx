import { FC, useState } from "react";
import {
  CreateSurveyTypesTop,
  CreateSurveyTypesFormSection,
  CreateSurveyTypesMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateBillRequest: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Bill Request /", path: siteRoutes.billRequestList },
    { title: "Initiate Bill Request", path: siteRoutes.createBillRequest },
  ];
  return (
    <CreateSurveyTypesMain>
      <CreateSurveyTypesTop>
        <div className="heading">
          <span className="page-heading">Initiate Bill Request </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateSurveyTypesTop>

      <CreateSurveyTypesFormSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Case*</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Amount*</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Power of Attorney*</label>
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
            <label>Order Sheet*</label>
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
            <label>Letterpad Bill*</label>
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

export default CreateBillRequest;
