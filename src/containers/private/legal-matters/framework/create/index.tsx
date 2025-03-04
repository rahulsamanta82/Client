import { FC } from "react";
import {
  CreateFrameworkForm,
  CreateFrameworkMain,
  CreateFrameworkTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateFramework: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Framework Documents /",
      path: siteRoutes.legalFrameworkList,
    },
    {
      title: "Add Legal Framework Documents",
      path: siteRoutes.createLegalFramework,
    },
  ];

  return (
    <CreateFrameworkMain>
      <CreateFrameworkTop>
        <div className="heading">
          <span className="page-heading">Add Legal Framework Document</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateFrameworkTop>

      <CreateFrameworkForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Name/Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Type</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Type</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Superior Law</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Superior Law" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Validity From</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" name="" id="" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Validity To</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Text File</label>
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

        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateFrameworkForm>
    </CreateFrameworkMain>
  );
};

export default CreateFramework;
