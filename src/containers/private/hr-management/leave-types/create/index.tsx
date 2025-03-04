import { FC } from "react";
import {
  CreateLeaveTypesTop,
  CreateLeaveTypesFormSection,
  CreateLeaveTypesMain,
} from "./style";
import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";

import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AddOptionSvg, DeleteOptionSvg } from "assets/images/common/svgs";

const CreateLeaveTypes: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "HR Management / ", path: "" },
    {
      title: "Leave Types /",
      path: siteRoutes.leaveTypeListing,
    },
    {
      title: "Add Leave Types",
      path: siteRoutes.createLeaveTypes,
    },
  ];
  return (
    <CreateLeaveTypesMain>
      <CreateLeaveTypesTop>
        <div className="heading">
          <span className="page-heading">Add Leave Type </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLeaveTypesTop>

      <CreateLeaveTypesFormSection className="content-radius-shadow">
        <div className="common-fields">
          {/* Existing input fields */}
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Upper Cap</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label>Status</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Active</label>
                <input type="radio" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">Deactivate</label>
                <input type="radio" />
              </div>
            </div>
          </div>

          <div className="radio-field">
            <label>Document Required</label>
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
        <div className="common-fields">
          {/* Existing input fields */}
          <div className="input-field">
            <label>Sample Document Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Sample Document Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Sample File</label>
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
          <div className="icons-main">
            <AddOptionSvg />
            <DeleteOptionSvg />
          </div>
          <div></div>
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
      </CreateLeaveTypesFormSection>
    </CreateLeaveTypesMain>
  );
};

export default CreateLeaveTypes;
