import { FC } from "react";
import {
    CreateReportManageForm,
  CreateReportManageMain,
  CreateReportManageTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateManageReport: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Manage Reports / ", path: siteRoutes.qecReportManagelist },
    { title: "Add Report", path: siteRoutes.createQecReportManage },
  ];

  return (
    <CreateReportManageMain>
      <CreateReportManageTop>
        <div className="heading">
          <span className="page-heading">Add Report</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateReportManageTop>

      <CreateReportManageForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Type Title Here" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Attachment</label>
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
            <label htmlFor="">Categories</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Categories</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Order By</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Order</option>
                </select>
              </div>
            </div>
          </div>

          <div className="radio-field">
            <label>Is Active</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
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
      </CreateReportManageForm>
    </CreateReportManageMain>
  );
};

export default CreateManageReport;
